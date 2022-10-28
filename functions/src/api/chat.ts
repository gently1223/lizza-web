import * as express from 'express';
import 'express-async-errors';
import { authenticate } from './middleware';
import axios from 'axios';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

type ChatMetaCacheItem = {
  available: boolean,
  pageId: string,
  pageAccessToken: string,
  instagramUsername: string,
}

export default function(): express.Router {
  const app = express.Router();

  app.get('/status', authenticate, async (req, res) => {
    if (!req.facebookAccessToken) {
      res.jsonp({ status: 'unavailable' });
      return;
    }

    // Load all available pages from the user.
    const pagesResponse = await axios.get(
      'https://graph.facebook.com/v14.0/me/accounts',
      {
        params: {
          'fields': 'id,access_token,instagram_business_account{id,username}',
          'access_token': req.facebookAccessToken
        }
      }
    );

    // Map all existing pages of the user into a typed struct.
    const allPageInfos: Array<{ id: string, accessToken: string, username: string }> = [];
    pagesResponse.data.data.forEach((item: any) => {
      if (item.instagram_business_account) {
        allPageInfos.push({
          id: item.id,
          accessToken: item.access_token,
          username: item.instagram_business_account.username
        });
      }
    });

    // Load the current instagram user.
    const userDoc = await admin
      .firestore()
      .collection('instaUsers')
      .doc(req.user_id)
      .get();

    const instagramUsername = userDoc.get('username');

    // Find the page that matches the instagram username.
    const matchingPage = allPageInfos.find(item => item.username === instagramUsername);

    // Save meta information about the chat.
    await admin.firestore()
      .collection('chatCache')
      .doc(req.user_id)
      .set({
        available: matchingPage != undefined,
        instagramUsername: matchingPage ? matchingPage.username : undefined,
        pageId: matchingPage ? matchingPage.id : null,
        pageAccessToken: matchingPage ? matchingPage.accessToken : null
      });

    // Return either if the chat is available or not.
    res.jsonp({ 'status': matchingPage ? 'available' : 'unavailable' });
  });

  type ChatConversationItem = {
    id: string,
    name: string,
    lastMessage: {
      message: string,
      self: boolean,
      time: string,
    },
  }

  app.get('/conversations', authenticate, async (req, res) => {
    const buildResponse = (conversations: Array<ChatConversationItem> = []) => {
      return { conversations };
    };

    let sort: 'asc' | 'desc' = 'asc';
    if (req.query.sort
      && typeof req.query.sort === 'string'
      && ['asc', 'desc'].indexOf(req.query.sort as string) > -1) {
      sort = req.query.sort as 'asc' | 'desc';
    }

    const chatMetaCache = await admin.firestore()
      .collection('chatCache')
      .doc(req.user_id)
      .get();

    // Return an empty conversations array if the chat has not been initialized.
    if (!chatMetaCache.exists) {
      res.jsonp(buildResponse());
      return;
    }

    const chatMetaData = chatMetaCache.data() as ChatMetaCacheItem;

    // Exit if it's not available.
    if (!chatMetaData.available) {
      res.jsonp(buildResponse());
      return;
    }

    const conversationsResponse = await axios.get(
      `https://graph.facebook.com/v14.0/${chatMetaData.pageId}/conversations`,
      {
        params: {
          'fields': 'name,messages.limit(1){message,created_time,from},id',
          'platform': 'instagram',
          'access_token': chatMetaData.pageAccessToken
        }
      }
    );

    const conversations: Array<ChatConversationItem> = [];
    for (const conversation of conversationsResponse.data.data) {
      const lastMessage = conversation.messages.data[0];
      conversations.push({
        id: conversation.id,
        name: conversation.name,
        lastMessage: {
          message: lastMessage.message,
          self: lastMessage.from.username === chatMetaData.instagramUsername,
          time: lastMessage.created_time
        }
      });
    }

    conversations.sort(function(a, b) {
      const aTime = Date.parse(a.lastMessage.time);
      const bTime = Date.parse(b.lastMessage.time);

      if (sort === 'asc') {
        return aTime - bTime;
      } else {
        return bTime - aTime;
      }
    });

    res.jsonp(buildResponse(conversations));
  });

  type ChatConversationMessageItem = {
    message: string,
    self: boolean,
    time: string,
  }
  app.get('/conversation/:id', authenticate, async (req, res) => {
    const buildResponse = (name: string, messages: Array<ChatConversationMessageItem> = []) => {
      return { name, messages };
    };

    const chatMetaCache = await admin.firestore()
      .collection('chatCache')
      .doc(req.user_id)
      .get();

    // Return an empty conversations array if the chat has not been initialized.
    if (!chatMetaCache.exists) {
      res.status(404).jsonp({});
      return;
    }

    const chatMetaData = chatMetaCache.data() as ChatMetaCacheItem;

    // Exit if it's not available.
    if (!chatMetaData.available) {
      res.status(404).jsonp({});
      return;
    }

    const conversationResponse = await axios.get(
      'https://graph.facebook.com/v14.0/' + req.params.id,
      {
        params: {
          'fields': 'name,messages.limit(40){message,created_time,from},id',
          'platform': 'instagram',
          'access_token': chatMetaData.pageAccessToken
        }
      }
    );

    const mappedConversations: ChatConversationMessageItem[] = [];
    for (const message of conversationResponse.data.messages.data) {
      mappedConversations.push({
        message: message.message,
        self: message.from.username === chatMetaData.instagramUsername,
        time: message.created_time
      });
    }

    res.jsonp(buildResponse(conversationResponse.data.name, mappedConversations));
  });


  app.post('/conversation/:id/messages', authenticate, async (req, res) => {
    if (!req.body.message) {
      res.status(400).jsonp({ status: 'error', message: 'no message provided' });
      return;
    }

    if (typeof req.body.message !== 'string' || req.body.message.length === 0) {
      res.status(400).jsonp({ status: 'error', message: 'message is invalid' });
      return;
    }

    const chatMetaCache = await admin.firestore()
      .collection('chatCache')
      .doc(req.user_id)
      .get();

    // Return an empty conversations array if the chat has not been initialized.
    if (!chatMetaCache.exists) {
      res.status(404).jsonp({});
      return;
    }

    const chatMetaData = chatMetaCache.data() as ChatMetaCacheItem;

    // Exit if it's not available.
    if (!chatMetaData.available) {
      res.status(404).jsonp({});
      return;
    }

    // Load the conversation to resolve the participants.
    const conversationResponse = await axios.get(
      'https://graph.facebook.com/v14.0/' + req.params.id,
      {
        params: {
          'fields': 'participants',
          'platform': 'instagram',
          'access_token': chatMetaData.pageAccessToken
        }
      }
    );

    // Resolve the identifier of the participant we want to send the message to.
    let participantId: string | null = null;
    for (const participant of conversationResponse.data.participants.data) {
      if (participant.username !== chatMetaData.instagramUsername) {
        participantId = participant.id;
        break;
      }
    }

    // Send the message through the API.
    const messageResponse = await axios.post(
      'https://graph.facebook.com/v14.0/me/messages',
      {
        'recipient': {
          'id': participantId
        },
        'message': {
          'text': req.body.message
        },
        'tag': 'HUMAN_AGENT'
      },
      {
        params: {
          'access_token': chatMetaData.pageAccessToken
        }
      }
    );

    res.jsonp({ status: 'success', id: messageResponse.data.message_id });
  });

  // Mount a custom error handler for all chat routes.
  app.use(((err, req, res, next) => {
    functions.logger.error('error in chat occurred', err);
    res.status(500).jsonp({ status: 'error', message: 'Internal Server Error' });
  }) as express.ErrorRequestHandler);

  return app;
}
