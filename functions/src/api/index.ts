import express, { Express } from 'express';
import * as functions from 'firebase-functions';
import cookieParser from 'cookie-parser';
import * as admin from 'firebase-admin';
import axios from 'axios';
import cors from 'cors';
import { authenticate } from './middleware';
import stripe from 'stripe';
import chatRouter from './chat';

// TO DELETE $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

import * as oauth2 from 'simple-oauth2';
import * as crypto from 'crypto';
import Stripe from 'stripe';

// TO DELETE $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

interface Payment {
  payment_link: string;
  payment_intent: string;
  payment_status: string;
  customer_details: { email: string; phone: string };
  amount_total: number;
  shipping: {
    name: string;
    address: {
      city: string;
      country: string;
      postal_code: string;
      state: string;
      line1: string;
      line2: string;
    };
  };
}

export default (testMode: boolean): Express => {
  const api = express();

  if (testMode) {
    api.use((req, res, next) => {
      req.test = true;
      next();
    });
  }

  api.use(cookieParser());
  api.use(cors({ origin: true }));

  if (!admin.apps.length) {
    admin.initializeApp();
  }
  // const FACEBOOK_API = 'https://graph.facebook.com/v13.0';

  // TO DELETE $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  // TO DELETE $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  const OAUTH_REDIRECT_URI = 'https://lizza.app/auth';
  const OAUTH_REDIRECT_URI_TEST ='https://lizza-s-pocs--preview-one-7qv2pudz.web.app/auth';
  const OAUTH_REDIRECT_URI_TONY ='https://lizza-s-pocs--preview-tony-7l6eknwd.web.app/auth';
  const OAUTH_REDIRECT_URI_JESUS='https://lizza-s-pocs--preview-jesus-l1yizlzh.web.app/auth';
  const OAUTH_REDIRECT_URI_SARA ='https://lizza-s-pocs--preview-sara-f8p5f7nt.web.app/auth';
  const OAUTH_REDIRECT_URI_MIKE ='https://lizza-s-pocs--preview-mike-d44cl5lp.web.app/auth';
  const OAUTH_REDIRECT_URI_THULSI ='https://lizza-s-pocs--preview-thulsi-4az0hug1.web.app/auth';
  const OAUTH_SCOPES = 'user_profile,user_media';
  const INSTA_API = 'https://graph.instagram.com';

  /**
   * Creates a configured simple-oauth2 client for Instagram.
   *
   * @return {oauth2.ModuleOptions} config for oauth
   */
  function instagramOAuth2Client(): oauth2.ModuleOptions {
    // Instagram OAuth 2 setup
    const credentials: oauth2.ModuleOptions = {
      client: {
        id: functions.config().instagram.client_id,
        secret: functions.config().instagram.client_secret,
      },
      auth: {
        tokenHost: 'https://api.instagram.com',
        tokenPath: '/oauth/access_token',
      },
    };
    return credentials;
  }

  /**
   * Redirects the User to the Instagram authentication consent screen.
   * Also the 'state' cookie is set for later state verification.
   */
  api.get('*/redirect', async (req, res) => {
    const oauth = new oauth2.AuthorizationCode(instagramOAuth2Client());
    // cookieParser()(req, res, () => {
    // Create state o gets the old one
    functions.logger.log('Cookies:', req.cookies);

    const state = req.cookies?.state || crypto.randomBytes(20).toString('hex');
    functions.logger.log('Setting verification state:', state);
    // Set the state
    res.cookie('__session', state.toString(), {
      maxAge: 3600000,
      secure: true,
      httpOnly: true,
    });
    // Generate redirect URL with auth
    const redirectUri = oauth.authorizeURL({
      redirect_uri: req.test ? OAUTH_REDIRECT_URI_TEST : OAUTH_REDIRECT_URI,
      scope: OAUTH_SCOPES,
      state: state,
    });
    functions.logger.log('Redirecting to:', redirectUri);
    res.redirect(redirectUri);
    // });
  });
  api.get('*/redirecttony', async (req, res) => {
    const oauth = new oauth2.AuthorizationCode(instagramOAuth2Client());
    // cookieParser()(req, res, () => {
    // Create state o gets the old one
    functions.logger.log('Cookies:', req.cookies);

    const state = req.cookies?.state || crypto.randomBytes(20).toString('hex');
    functions.logger.log('Setting verification state:', state);
    // Set the state
    res.cookie('__session', state.toString(), {
      maxAge: 3600000,
      secure: true,
      httpOnly: true,
    });
    // Generate redirect URL with auth
    const redirectUri = oauth.authorizeURL({
      redirect_uri: req.test ? OAUTH_REDIRECT_URI_TONY : OAUTH_REDIRECT_URI,
      scope: OAUTH_SCOPES,
      state: state,
    });
    functions.logger.log('Redirecting to:', redirectUri);
    res.redirect(redirectUri);
    // });
  });
  api.get('*/redirectjesus', async (req, res) => {
    const oauth = new oauth2.AuthorizationCode(instagramOAuth2Client());
    // cookieParser()(req, res, () => {
    // Create state o gets the old one
    functions.logger.log('Cookies:', req.cookies);

    const state = req.cookies?.state || crypto.randomBytes(20).toString('hex');
    functions.logger.log('Setting verification state:', state);
    // Set the state
    res.cookie('__session', state.toString(), {
      maxAge: 3600000,
      secure: true,
      httpOnly: true,
    });
    // Generate redirect URL with auth
    const redirectUri = oauth.authorizeURL({
      redirect_uri: req.test ? OAUTH_REDIRECT_URI_JESUS : OAUTH_REDIRECT_URI,
      scope: OAUTH_SCOPES,
      state: state,
    });
    functions.logger.log('Redirecting to:', redirectUri);
    res.redirect(redirectUri);
    // });
  });
  api.get('*/redirectsara', async (req, res) => {
    const oauth = new oauth2.AuthorizationCode(instagramOAuth2Client());
    // cookieParser()(req, res, () => {
    // Create state o gets the old one
    functions.logger.log('Cookies:', req.cookies);

    const state = req.cookies?.state || crypto.randomBytes(20).toString('hex');
    functions.logger.log('Setting verification state:', state);
    // Set the state
    res.cookie('__session', state.toString(), {
      maxAge: 3600000,
      secure: true,
      httpOnly: true,
    });
    // Generate redirect URL with auth
    const redirectUri = oauth.authorizeURL({
      redirect_uri: req.test ? OAUTH_REDIRECT_URI_SARA : OAUTH_REDIRECT_URI,
      scope: OAUTH_SCOPES,
      state: state,
    });
    functions.logger.log('Redirecting to:', redirectUri);
    res.redirect(redirectUri);
    // });
  });
  api.get('*/redirectmike', async (req, res) => {
    const oauth = new oauth2.AuthorizationCode(instagramOAuth2Client());
    // cookieParser()(req, res, () => {
    // Create state o gets the old one
    functions.logger.log('Cookies:', req.cookies);

    const state = req.cookies?.state || crypto.randomBytes(20).toString('hex');
    functions.logger.log('Setting verification state:', state);
    // Set the state
    res.cookie('__session', state.toString(), {
      maxAge: 3600000,
      secure: true,
      httpOnly: true,
    });
    // Generate redirect URL with auth
    const redirectUri = oauth.authorizeURL({
      redirect_uri: req.test ? OAUTH_REDIRECT_URI_MIKE : OAUTH_REDIRECT_URI,
      scope: OAUTH_SCOPES,
      state: state,
    });
    functions.logger.log('Redirecting to:', redirectUri);
    res.redirect(redirectUri);
    // });
  });
  api.get('*/redirectthulsi', async (req, res) => {
    const oauth = new oauth2.AuthorizationCode(instagramOAuth2Client());
    // cookieParser()(req, res, () => {
    // Create state o gets the old one
    functions.logger.log('Cookies:', req.cookies);

    const state = req.cookies?.state || crypto.randomBytes(20).toString('hex');
    functions.logger.log('Setting verification state:', state);
    // Set the state
    res.cookie('__session', state.toString(), {
      maxAge: 3600000,
      secure: true,
      httpOnly: true,
    });
    // Generate redirect URL with auth
    const redirectUri = oauth.authorizeURL({
      redirect_uri: req.test ? OAUTH_REDIRECT_URI_THULSI : OAUTH_REDIRECT_URI,
      scope: OAUTH_SCOPES,
      state: state,
    });
    functions.logger.log('Redirecting to:', redirectUri);
    res.redirect(redirectUri);
    // });
  });

  /**
   * Exchanges a given Instagram auth code passed in the 'code' URL query parameter for a Firebase auth token.
   * The request also needs to specify a 'state' query parameter which will be checked against the 'state' cookie.
   */
  api.get('*/token', async (req, res) => {
    const oauth = new oauth2.AuthorizationCode({
      ...instagramOAuth2Client(),
      options: { authorizationMethod: 'body' },
    });
    try {
      functions.logger.log('Received cookies:', req.cookies);
      functions.logger.log('Received headers:', req.headers);
      functions.logger.log(
        'Received verification state:',
        req.cookies.__session
      );
      functions.logger.log('Received state:', req.query.state);
      if (!req.cookies.__session) {
        throw new Error(
          'State cookie not set or expired. Maybe you took too long to authorize. Please try again.'
        );
      } else if (req.cookies.__session !== req.query.state) {
        throw new Error('State validation failed');
      }
      functions.logger.log('Received auth code:', req.query.code);
      const results = await oauth.getToken({
        code: req.query.code?.toString() || '',
        redirect_uri: req.test ? OAUTH_REDIRECT_URI_TEST : OAUTH_REDIRECT_URI,
      });

      functions.logger.log('Auth code exchange result received:', results);

      const short_token = results.token.access_token;
      // const instagramUserID = results.token.user_id;
      //We need to get an long access token (refresh token) so it can be used for 60 days
      const long_token_response = await axios.get<{
        access_token: string;
        token_type: string;
        expires_in: number;
      }>(
        INSTA_API +
          '/access_token?grant_type=ig_exchange_token&client_secret=' +
          functions.config().instagram.client_secret +
          '&access_token=' +
          short_token
      );

      const long_token = long_token_response.data.access_token;
      functions.logger.log('Auth long token:', long_token);

      //Get the user id and name
      const user_response = await axios.get<{
        id: string;
        username: string;
      }>(INSTA_API + '/me?fields=id,username&access_token=' + long_token);
      functions.logger.log('User', user_response);

      // Create a Firebase account and get the Custom Auth Token.
      const firebaseToken = await createFirebaseAccount(
        user_response.data.id,
        long_token,
        user_response.data.username
      );
      // Serve an HTML page that signs the user in and updates the user profile.
      res.jsonp({ token: firebaseToken });
    } catch (error) {
      functions.logger.log('un error to loco', error);
      res.jsonp({
        error: error instanceof Error ? error.toString() : 'Different error',
      });
    }
  });
  api.get('*/tokentony', async (req, res) => {
    const oauth = new oauth2.AuthorizationCode({
      ...instagramOAuth2Client(),
      options: { authorizationMethod: 'body' },
    });
    functions.logger.log('Recieved Body: ',req.body);
    try {
      functions.logger.log('Received cookies:', req.cookies);
      functions.logger.log('Received headers:', req.headers);
      functions.logger.log(
        'Received verification state:',
        req.cookies.__session
      );
      functions.logger.log('Received state:', req.query.state);
      if (!req.cookies.__session) {
        throw new Error(
          'State cookie not set or expired. Maybe you took too long to authorize. Please try again.'
        );
      } else if (req.cookies.__session !== req.query.state) {
        throw new Error('State validation failed');
      }
      functions.logger.log('Received auth code:', req.query.code);
      const results = await oauth.getToken({
        code: req.query.code?.toString() || '',
        redirect_uri: req.test ? OAUTH_REDIRECT_URI_TONY : OAUTH_REDIRECT_URI,
      });

      functions.logger.log('Auth code exchange result received:', results);

      const short_token = results.token.access_token;
      // const instagramUserID = results.token.user_id;
      //We need to get an long access token (refresh token) so it can be used for 60 days
      const long_token_response = await axios.get<{
        access_token: string;
        token_type: string;
        expires_in: number;
      }>(
        INSTA_API +
          '/access_token?grant_type=ig_exchange_token&client_secret=' +
          functions.config().instagram.client_secret +
          '&access_token=' +
          short_token
      );

      const long_token = long_token_response.data.access_token;
      functions.logger.log('Auth long token:', long_token);

      //Get the user id and name
      const user_response = await axios.get<{
        id: string;
        username: string;
      }>(INSTA_API + '/me?fields=id,username&access_token=' + long_token);
      functions.logger.log('User', user_response);

      // Create a Firebase account and get the Custom Auth Token.
      const firebaseToken = await createFirebaseAccount(
        user_response.data.id,
        long_token,
        user_response.data.username
      );
      // Serve an HTML page that signs the user in and updates the user profile.
      res.jsonp({ token: firebaseToken });
    } catch (error) {
      functions.logger.log('un error to loco', error);
      res.jsonp({
        error: error instanceof Error ? error.toString() : 'Different error',
      });
    }
  });
  api.get('*/tokenjesus', async (req, res) => {
    const oauth = new oauth2.AuthorizationCode({
      ...instagramOAuth2Client(),
      options: { authorizationMethod: 'body' },
    });
    try {
      functions.logger.log('Received cookies:', req.cookies);
      functions.logger.log('Received headers:', req.headers);
      functions.logger.log(
        'Received verification state:',
        req.cookies.__session
      );
      functions.logger.log('Received state:', req.query.state);
      if (!req.cookies.__session) {
        throw new Error(
          'State cookie not set or expired. Maybe you took too long to authorize. Please try again.'
        );
      } else if (req.cookies.__session !== req.query.state) {
        throw new Error('State validation failed');
      }
      functions.logger.log('Received auth code:', req.query.code);
      const results = await oauth.getToken({
        code: req.query.code?.toString() || '',
        redirect_uri: req.test ? OAUTH_REDIRECT_URI_JESUS : OAUTH_REDIRECT_URI,
      });

      functions.logger.log('Auth code exchange result received:', results);

      const short_token = results.token.access_token;
      // const instagramUserID = results.token.user_id;
      //We need to get an long access token (refresh token) so it can be used for 60 days
      const long_token_response = await axios.get<{
        access_token: string;
        token_type: string;
        expires_in: number;
      }>(
        INSTA_API +
          '/access_token?grant_type=ig_exchange_token&client_secret=' +
          functions.config().instagram.client_secret +
          '&access_token=' +
          short_token
      );

      const long_token = long_token_response.data.access_token;
      functions.logger.log('Auth long token:', long_token);

      //Get the user id and name
      const user_response = await axios.get<{
        id: string;
        username: string;
      }>(INSTA_API + '/me?fields=id,username&access_token=' + long_token);
      functions.logger.log('User', user_response);

      // Create a Firebase account and get the Custom Auth Token.
      const firebaseToken = await createFirebaseAccount(
        user_response.data.id,
        long_token,
        user_response.data.username
      );
      // Serve an HTML page that signs the user in and updates the user profile.
      res.jsonp({ token: firebaseToken });
    } catch (error) {
      functions.logger.log('un error to loco', error);
      res.jsonp({
        error: error instanceof Error ? error.toString() : 'Different error',
      });
    }
  });
  api.get('*/tokensara', async (req, res) => {
    const oauth = new oauth2.AuthorizationCode({
      ...instagramOAuth2Client(),
      options: { authorizationMethod: 'body' },
    });
    try {
      functions.logger.log('Received cookies:', req.cookies);
      functions.logger.log('Received headers:', req.headers);
      functions.logger.log(
        'Received verification state:',
        req.cookies.__session
      );
      functions.logger.log('Received state:', req.query.state);
      if (!req.cookies.__session) {
        throw new Error(
          'State cookie not set or expired. Maybe you took too long to authorize. Please try again.'
        );
      } else if (req.cookies.__session !== req.query.state) {
        throw new Error('State validation failed');
      }
      functions.logger.log('Received auth code:', req.query.code);
      const results = await oauth.getToken({
        code: req.query.code?.toString() || '',
        redirect_uri: req.test ? OAUTH_REDIRECT_URI_SARA : OAUTH_REDIRECT_URI,
      });

      functions.logger.log('Auth code exchange result received:', results);

      const short_token = results.token.access_token;
      // const instagramUserID = results.token.user_id;
      //We need to get an long access token (refresh token) so it can be used for 60 days
      const long_token_response = await axios.get<{
        access_token: string;
        token_type: string;
        expires_in: number;
      }>(
        INSTA_API +
          '/access_token?grant_type=ig_exchange_token&client_secret=' +
          functions.config().instagram.client_secret +
          '&access_token=' +
          short_token
      );

      const long_token = long_token_response.data.access_token;
      functions.logger.log('Auth long token:', long_token);

      //Get the user id and name
      const user_response = await axios.get<{
        id: string;
        username: string;
      }>(INSTA_API + '/me?fields=id,username&access_token=' + long_token);
      functions.logger.log('User', user_response);

      // Create a Firebase account and get the Custom Auth Token.
      const firebaseToken = await createFirebaseAccount(
        user_response.data.id,
        long_token,
        user_response.data.username
      );
      // Serve an HTML page that signs the user in and updates the user profile.
      res.jsonp({ token: firebaseToken });
    } catch (error) {
      functions.logger.log('un error to loco', error);
      res.jsonp({
        error: error instanceof Error ? error.toString() : 'Different error',
      });
    }
  });
  api.get('*/tokenmike', async (req, res) => {
    const oauth = new oauth2.AuthorizationCode({
      ...instagramOAuth2Client(),
      options: { authorizationMethod: 'body' },
    });
    try {
      functions.logger.log('Received cookies:', req.cookies);
      functions.logger.log('Received headers:', req.headers);
      functions.logger.log(
        'Received verification state:',
        req.cookies.__session
      );
      functions.logger.log('Received state:', req.query.state);
      if (!req.cookies.__session) {
        throw new Error(
          'State cookie not set or expired. Maybe you took too long to authorize. Please try again.'
        );
      } else if (req.cookies.__session !== req.query.state) {
        throw new Error('State validation failed');
      }
      functions.logger.log('Received auth code:', req.query.code);
      const results = await oauth.getToken({
        code: req.query.code?.toString() || '',
        redirect_uri: req.test ? OAUTH_REDIRECT_URI_MIKE : OAUTH_REDIRECT_URI,
      });

      functions.logger.log('Auth code exchange result received:', results);

      const short_token = results.token.access_token;
      // const instagramUserID = results.token.user_id;
      //We need to get an long access token (refresh token) so it can be used for 60 days
      const long_token_response = await axios.get<{
        access_token: string;
        token_type: string;
        expires_in: number;
      }>(
        INSTA_API +
          '/access_token?grant_type=ig_exchange_token&client_secret=' +
          functions.config().instagram.client_secret +
          '&access_token=' +
          short_token
      );

      const long_token = long_token_response.data.access_token;
      functions.logger.log('Auth long token:', long_token);

      //Get the user id and name
      const user_response = await axios.get<{
        id: string;
        username: string;
      }>(INSTA_API + '/me?fields=id,username&access_token=' + long_token);
      functions.logger.log('User', user_response);

      // Create a Firebase account and get the Custom Auth Token.
      const firebaseToken = await createFirebaseAccount(
        user_response.data.id,
        long_token,
        user_response.data.username
      );
      // Serve an HTML page that signs the user in and updates the user profile.
      res.jsonp({ token: firebaseToken });
    } catch (error) {
      functions.logger.log('un error to loco', error);
      res.jsonp({
        error: error instanceof Error ? error.toString() : 'Different error',
      });
    }
  });
  api.get('*/tokenthulsi', async (req, res) => {
    const oauth = new oauth2.AuthorizationCode({
      ...instagramOAuth2Client(),
      options: { authorizationMethod: 'body' },
    });
    try {
      functions.logger.log('Received cookies:', req.cookies);
      functions.logger.log('Received headers:', req.headers);
      functions.logger.log(
        'Received verification state:',
        req.cookies.__session
      );
      functions.logger.log('Received state:', req.query.state);
      if (!req.cookies.__session) {
        throw new Error(
          'State cookie not set or expired. Maybe you took too long to authorize. Please try again.'
        );
      } else if (req.cookies.__session !== req.query.state) {
        throw new Error('State validation failed');
      }
      functions.logger.log('Received auth code:', req.query.code);
      const results = await oauth.getToken({
        code: req.query.code?.toString() || '',
        redirect_uri: req.test ? OAUTH_REDIRECT_URI_THULSI : OAUTH_REDIRECT_URI,
      });

      functions.logger.log('Auth code exchange result received:', results);

      const short_token = results.token.access_token;
      // const instagramUserID = results.token.user_id;
      //We need to get an long access token (refresh token) so it can be used for 60 days
      const long_token_response = await axios.get<{
        access_token: string;
        token_type: string;
        expires_in: number;
      }>(
        INSTA_API +
          '/access_token?grant_type=ig_exchange_token&client_secret=' +
          functions.config().instagram.client_secret +
          '&access_token=' +
          short_token
      );

      const long_token = long_token_response.data.access_token;
      functions.logger.log('Auth long token:', long_token);

      //Get the user id and name
      const user_response = await axios.get<{
        id: string;
        username: string;
      }>(INSTA_API + '/me?fields=id,username&access_token=' + long_token);
      functions.logger.log('User', user_response);

      // Create a Firebase account and get the Custom Auth Token.
      const firebaseToken = await createFirebaseAccount(
        user_response.data.id,
        long_token,
        user_response.data.username
      );
      // Serve an HTML page that signs the user in and updates the user profile.
      res.jsonp({ token: firebaseToken });
    } catch (error) {
      functions.logger.log('un error to loco', error);
      res.jsonp({
        error: error instanceof Error ? error.toString() : 'Different error',
      });
    }
  });

  api.get('*/connectInstagram', async (req, res) => {
    const oauth = new oauth2.AuthorizationCode({
      ...instagramOAuth2Client(),
      options: { authorizationMethod: 'body' },
    });
    authenticate(req, res, async () => {
      try {
        functions.logger.log('Received cookies connectInstagram:', req.cookies);
        functions.logger.log('Received headers connectInstagram:', req.headers);
        functions.logger.log(
          'Received verification state connectInstagram:',
          req.cookies.__session
        );
        functions.logger.log(
          'Received state connectInstagram:',
          req.query.state
        );
        if (!req.cookies.__session) {
          throw new Error(
            'State cookie not set or expired. Maybe you took too long to authorize. Please try again.'
          );
        } else if (req.cookies.__session !== req.query.state) {
          throw new Error('State validation failed');
        }
        // eslint-disable-next-line max-len
        const redirect_url = 'https://' + req.query.redirect_url + '/auth';
        const val = {
          code: req.query.code?.toString() || '',
          redirect_uri: redirect_url,
        };
        functions.logger.log('Received auth code 681:', req.query.code, val);
        const results = await oauth.getToken({
          code: req.query.code?.toString() || '',
          redirect_uri: redirect_url,
        });

        functions.logger.log(
          'Auth code exchange result received connectInstagram:',
          results
        );

        const short_token = results.token.access_token;
        // const instagramUserID = results.token.user_id;
        //We need to get an long access token (refresh token) so it can be used for 60 days
        const long_token_response = await axios.get<{
          access_token: string;
          token_type: string;
          expires_in: number;
        }>(
          INSTA_API +
            '/access_token?grant_type=ig_exchange_token&client_secret=' +
            functions.config().instagram.client_secret +
            '&access_token=' +
            short_token
        );

        const long_token = long_token_response.data.access_token;
        functions.logger.log('Auth long token:', long_token);

        // Create a Firebase account and get the Custom Auth Token.
        //Update Account firebase
        console.log(
          'Vamos a actualizarrr ----',
          { id: req.user_id, long_token },
          '----'
        );
        const firebaseToken = await updateAccount(req.user_id, long_token);
        // Serve an HTML page that signs the user in and updates the user profile.
        res.jsonp({ token: firebaseToken });
      } catch (error) {
        functions.logger.log('un error to loco 714', error);
        res.jsonp({
          error: error instanceof Error ? error.toString() : 'Different error',
        });
      }
    });
  });

  // TO DELETE $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  // TO DELETE $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  /**
   * Creates a Firebase account with the given user profile and returns a custom auth token allowing
   * signing-in this account.
   * Also saves the accessToken to the datastore at /instagramAccessToken/$uid
   * @param {string} instagramID
   * @param {string} accessToken
   * @return {Promise<string>} The Firebase custom auth token in a promise.
   */
  async function createFirebaseAccount(
    instagramID: string,
    accessToken: string,
    username: string
  ) {
    try {
      // The UID we'll assign to the user.
      const uid = `instagram-${instagramID}`;
      functions.logger.log('instagram id', instagramID, uid);
      const date = new Date();
      const dateCreated = admin.firestore.Timestamp.fromDate(date);

      const userDoc = admin.firestore().doc(`/instaUsers/${uid}`);
      const user = await admin
        .auth()
        .getUser(uid)
        .catch((e) => {
          functions.logger.log('error getting user(dont exist)', e);
          return null;
        });
      functions.logger.log('user', user);

      // Create or update the user account.
      if (!user) {
        await admin.auth().createUser({
          uid: uid,
          displayName: username,
        });
      }
      // Save the access token to the Firebase Firestore Database.
      await userDoc.set(
        {
          token: accessToken,
          username,
          createdAt: dateCreated,
          updatedAt: dateCreated
        },
        {
          merge: true
        });
      // Create a Firebase custom auth token.
      const token = await admin.auth().createCustomToken(uid);
      functions.logger.log(
        'Created Custom token for UID "',
        uid,
        '" Token:',
        token
      );
      return token;
    } catch (e) {
      functions.logger.log('un error to firebase account', e);
      return '';
    }
  }

  async function insertStore(name: string, uid: string){
    try {
      const products: string[] = [];
      const date = new Date();
      const dateCreated = admin.firestore.Timestamp.fromDate(date);

      const userDoc = await admin
          .firestore()
          .collection('stores')
          .add(
            {
              name,
              user_uid: uid,
              products,
              createdAt: dateCreated,
              updatedAt: dateCreated
            }
          );
      return userDoc.id;
    } catch (e) {
      functions.logger.log('un error to insertStore', e);
      return '';
    }
  }

  async function createUserEmailAccount(
    useremail: string,
    password: string,
    uid: string,
    store_name: string
  ) {
    try {
      const userDoc = admin.firestore().doc(`/users/${uid}`);
      const date = new Date();
      const dateCreated = admin.firestore.Timestamp.fromDate(date);
      const user = await admin
        .auth()
        .getUser(uid)
        .catch((e) => {
          functions.logger.log('error getting user(dont exist)', e);
          return null;
        });
      functions.logger.log('user', user);

      // Create or update the user account.
      if (!user) {
        await admin.auth().createUser({
          uid: uid,
          // displayName: username,
        });
      }
      // Save the access token to the Firebase Firestore Database.
      await userDoc.set(
        {
          email: useremail,
          password,
          uid,
          store_name,
          username: store_name,
          createdAt: dateCreated,
          updatedAt: dateCreated,
          igtoken: '',
        },
        { merge: true }
        );
      // Create a Firebase custom auth token.
      const token = await admin.auth().createCustomToken(uid);
      functions.logger.log(
        'Created Custom token for UID "',
        uid,
        '" Token:',
        token
      );
      return userDoc.id;
    } catch (e) {
      functions.logger.log('un error to firebase account', e);
      return '';
    }
  }

  async function updateAccount(user_id: string, token: string) {
    try {
      const userDoc = admin.firestore().doc(`/users/${user_id}`);
      const date = new Date();
      const dateCreated = admin.firestore.Timestamp.fromDate(date);
      userDoc.update({ igtoken: token, updatedAt: dateCreated });
      return token;
    } catch (e) {
      functions.logger.log('un error to updateAccount 894', e);
      return '';
    }
  }

  api.post('*/createStore', async(req, res) => {
    // authenticate(req, res, async () => {
      try {
        functions.logger.log('body', req.body);
        const name_store = req.body.name;
        const user_uid = req.body.uid;
        const result = await insertStore(name_store, user_uid);
        res.send(result);
        // res.send(link.id);
      } catch (e) {
        const a = e as Stripe.StripeInvalidRequestError;
        functions.logger.log('un error en createStore ', e);
        res.status(400).send(a.message);
      }
    // });
  })
  api.post('*/createAccount', async(req, res) => {
    // authenticate(req, res, async () => {
      try {
        functions.logger.log('body', req.body);
        const email = req.body.email;
        const pass = req.body.pass;
        const uid = req.body.uid;
        const store_name = req.body.store_name as string;
        const result = await createUserEmailAccount(email, pass, uid, store_name);
        res.send(result);
        // res.send(link.id);
      } catch (e) {
        const a = e as Stripe.StripeInvalidRequestError;
        functions.logger.log('un error en createAccount ', e);
        res.status(400).send(a.message);
      }
    // });
  })
  api.post('*/facebook-link', async (req, res) => {
    authenticate(req, res, async () => {
      const { accessToken } = req.body;

      // accessToken must be present.
      if (!accessToken) {
        throw new Error('accessToken is required');
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore - Property will be assigned in middleware.
      const uid = req.user_id;

      const userDoc = admin.firestore().doc(`/instaUsers/${uid}`);

      await userDoc.update({ facebookToken: accessToken });

      return res.status(200).jsonp({ success: true });
    });
  });

  // GET ENDPOINTS

  //Endpoint to link facebook account with firebase and create an account
  // api.get('*/link', async (req, res) => {
  //   const token = req.query.token?.toString() || '';
  //   const instagramUserID = req.query.user_id?.toString() || '';
  //   // Create a Firebase account and get the Custom Auth Token.
  //   const firebaseToken = await createFirebaseAccount(instagramUserID, token);
  //   // Serve an HTML page that signs the user in and updates the user profile.
  //   res.jsonp({ token: firebaseToken });
  // });

  // api.get('*/account', async (req, res) => {
  //   authenticate(req, res, async () => {
  //     try {
  //       functions.logger.log('token', req.token);
  //       //Get insta account
  //       const results = await axios.get(FACEBOOK_API + '/me/accounts', {
  //         params: {
  //           access_token: req.token,
  //         },
  //       });
  //       functions.logger.log('account', results.data);
  //       res.jsonp(results.data);
  //     } catch (e) {
  //       functions.logger.log('error', e);
  //       res.send('error');
  //     }
  //   });
  // });

  api.get('*/posts', async (req, res) => {
    authenticate(req, res, async () => {
      //User must be authtenticated here req.user
      // functions.logger.log('usuario autenticado', req.token);

      try {
        const results = await axios.get(INSTA_API + '/me/media', {
          params: {
            access_token: req.token,
            // eslint-disable-next-line max-len
            // access_token: 'Bearer IGQVJYTGVjOFNZAbU16NWxOajRjc3JHRmJiU3BXOEd4NjVxVU9hb2xwdGxWTlBmUTFHdTV4SGJ2b3U1TWxoYU1wY2pTZADBfcGxPTElyNHJWR3FNSlNjNHVkeTdJTHRZAVXlKYkNBZAlV3',
            fields: 'id,media_url,caption,media_type,thumbnail_url',
          },
        });
        const posts = results.data;
        functions.logger.log('results from posts', results);

        res.send(posts);
      } catch (e) {
        functions.logger.log('un error to loco', e);
        res.jsonp({
          error: e instanceof Error ? e.toString() : 'Different error',
        });
      }
    });
  });

  //POST ENDPOINTS

  //Create a payment link
  api.post('*/link', async (req, res) => {
    authenticate(req, res, async () => {
      try {
        functions.logger.log('body', req.body);
        functions.logger.log('price', req.body.price);
        const stripePrivateKey = req.test
          ? functions.config().test?.stripe_key ||
            // eslint-disable-next-line max-len
            'sk_test_51HeFN3CSCspr9IRjIZMsOqXCBZFy99JHZng9XZgF16Krdphwam0Fbvt2LLEPjsJAXSWpR2nMIcPEKCh0tVB41MqR00Kv7KLqCv'
          : functions.config().stripe.key;
        //Connect to stripe
        const str = new stripe(stripePrivateKey, {
          apiVersion: '2020-08-27',
        });
        //Create a product
        const product = await str.products.create({
          name: req.body.name,
          description: req.body.description,
        });
        //Create a price for that product
        const price = await str.prices.create({
          unit_amount: req.body.price,
          currency: 'mxn',
          product: product.id,
        });
        //Create a link for that product
        const link = await str.paymentLinks.create({
          line_items: [
            {
              price: price.id,
              quantity: 1,
            },
          ],
          billing_address_collection: 'required',
          shipping_address_collection: { allowed_countries: ['MX'] },
          phone_number_collection: {
            enabled: true,
          },
          // after_completion: {
          //   type: 'redirect',
          //   redirect: { url: 'https://lizza-s-pocs.web.app/api/approve' },
          // },
        });
        const dateCreated = new Date();
        const newPublicLink: { [key: string]: any } = {
          url: link.url,
          name: req.body.name,
          price: req.body.price,
          date: admin.firestore.Timestamp.fromDate(dateCreated),
          image: req.body.image || '',
        };
        if (req.body.description) {
          newPublicLink.description = req.body.description;
        }
        //create our own link to the product which contain the actual payment link
        //Save the link in a subcollection of users with user id inside
        let userDoc = admin
          .firestore()
          .collection('instaUsers')
          .doc(req.user_id);

        if(!(await userDoc.get()).exists){
          userDoc = await admin
                    .firestore()
                    .collection('instaUsers')
                    .doc('instagram-'+req.user_id);
        }
        const user = await userDoc.get();
        const stock = req.body.stock;

        const isActive = req.body.isActive;
        const dimensions = req.body.dimensions;

        const newDoc = await userDoc
                        .collection('public')
                        .add({ ...newPublicLink, username: user.get('username'), stock, isActive, dimensions});

        await newDoc.set({ uid: newDoc.id }, { merge: true });
        //Create a private collection on the user
        await userDoc.collection('private').doc(newDoc.id).set(
          {
            link_id: link.id,
            user_id: req.user_id,
            uid: newDoc.id,
            product_name: newPublicLink.name,
            image: newPublicLink.image,
            price_id: price.id,
            product_id: product.id,
            stock,
            isActive,
            dimensions
          }
        );
        //Send our custom link id
        res.send(link.id);
      } catch (e) {
        const a = e as Stripe.StripeInvalidRequestError;
        functions.logger.log('un error creating link  ', e);
        res.status(400).send(a.message);
      }
    });
  });


  //Create a payment link for user with Email
  api.post('*/linkEmail', async (req, res) => {
    authenticate(req, res, async () => {
      try {
        functions.logger.log('body', req.body);
        functions.logger.log('price', req.body.price);
        const stripePrivateKey = req.test
          ? functions.config().test?.stripe_key ||
            // eslint-disable-next-line max-len
            'sk_test_51HeFN3CSCspr9IRjIZMsOqXCBZFy99JHZng9XZgF16Krdphwam0Fbvt2LLEPjsJAXSWpR2nMIcPEKCh0tVB41MqR00Kv7KLqCv'
          : functions.config().stripe.key;
        //Connect to stripe
        const str = new stripe(stripePrivateKey, {
          apiVersion: '2020-08-27',
        });
        //Create a product
        const product = await str.products.create({
          name: req.body.name,
          description: req.body.description,
        });
        //Create a price for that product
        const price = await str.prices.create({
          unit_amount: req.body.price,
          currency: 'mxn',
          product: product.id,
        });
        //Create a link for that product
        const link = await str.paymentLinks.create({
          line_items: [
            {
              price: price.id,
              quantity: 1,
            },
          ],
          billing_address_collection: 'required',
          shipping_address_collection: { allowed_countries: ['MX'] },
          phone_number_collection: {
            enabled: true,
          },
          // after_completion: {
          //   type: 'redirect',
          //   redirect: { url: 'https://lizza-s-pocs.web.app/api/approve' },
          // },
        });
        const dateCreated = new Date();
        const newPublicLink: { [key: string]: any } = {
          url: link.url,
          name: req.body.name,
          price: req.body.price,
          date: admin.firestore.Timestamp.fromDate(dateCreated),
          image: req.body.image || '',
        };
        if (req.body.description) {
          newPublicLink.description = req.body.description;
        }
        //create our own link to the product which contain the actual payment link
        //Save the link in a subcollection of users with user id inside
        const userDoc = admin.firestore().collection('users').doc(req.user_id);
        // const user = await userDoc.get();
        const stock = req.body.stock;

        const isActive = req.body.isActive;
        const dimensions = req.body.dimensions;

        const newDoc = await userDoc
          .collection('public')
          .add({ ...newPublicLink, stock, isActive, dimensions, user_id: req.user_id, store_id: req.store_id});

        await newDoc.set({ uid: newDoc.id }, { merge: true });
        //Create a private collection on the user
        await userDoc.collection('private').doc(newDoc.id).set({
          link_id: link.id,
          user_id: req.user_id,
          uid: newDoc.id,
          product_name: newPublicLink.name,
          image: newPublicLink.image,
          price_id: price.id,
          product_id: product.id,
          stock,
          isActive,
          dimensions,
          store_id: req.store_id
        });
        //Send our custom link id
        res.send(link.id);
      } catch (e) {
        const a = e as Stripe.StripeInvalidRequestError;
        functions.logger.log('un error creating link  ', e);
        res.status(400).send(a.message);
      }
    });
  });


//Create a payment link for user with Email
api.post('*/linkEmailNewCollection', async (req, res) => {
  authenticate(req, res, async () => {
    try {
      functions.logger.log('body', req.body);
      functions.logger.log('price', req.body.price);
      const stripePrivateKey = req.test
        ? functions.config().test?.stripe_key ||
          // eslint-disable-next-line max-len
          'sk_test_51HeFN3CSCspr9IRjIZMsOqXCBZFy99JHZng9XZgF16Krdphwam0Fbvt2LLEPjsJAXSWpR2nMIcPEKCh0tVB41MqR00Kv7KLqCv'
        : functions.config().stripe.key;
      //Connect to stripe
      const str = new stripe(stripePrivateKey, {
        apiVersion: '2020-08-27',
      });
      //Create a product
      const product = await str.products.create({
        name: req.body.name,
        description: req.body.description,
      });
      //Create a price for that product
      const price = await str.prices.create({
        unit_amount: req.body.price,
        currency: 'mxn',
        product: product.id,
      });
      //Create a link for that product
      const link = await str.paymentLinks.create({
        line_items: [
          {
            price: price.id,
            quantity: 1,
          },
        ],
        billing_address_collection: 'required',
        shipping_address_collection: { allowed_countries: ['MX'] },
        phone_number_collection: {
          enabled: true,
        },
      });
      const dateCreated = new Date();
      const newPublicLink: { [key: string]: any } = {
        url: link.url,
        name: req.body.name,
        price: req.body.price,
        date: admin.firestore.Timestamp.fromDate(dateCreated),
        image: req.body.image || '',
      };
      if (req.body.description) {
        newPublicLink.description = req.body.description;
      }
      //create our own link to the product which contain the actual payment link
      //Save the link in a subcollection of users with user id inside
      const userDocClient = admin
          .firestore()
          .collection('users')
          .doc(req.user_id);

      const userDocClientdata = await userDocClient.get();
      const userDoc = admin.firestore().collection('products').doc();
      // const user = await userDoc.get();
      const stock = req.body.stock;

      const isActive = req.body.isActive;
      const dimensions = req.body.dimensions;

      const public_info = {
          ...newPublicLink,
          stock,
          isActive,
          dimensions,
          user_id: req.user_id,
          username: userDocClientdata.get('store_name')
        };

      const private_info = {
        link_id: link.id,
        user_id: req.user_id,
        uid: userDoc.id,
        product_name: newPublicLink.name,
        image: newPublicLink.image,
        price_id: price.id,
        product_id: product.id,
        stock,
        isActive,
        dimensions,
        username: userDocClientdata.get('store_name')
      };
      //Send our custom link id
      const both = {...public_info, ...private_info}

      // Save the access token to the Firebase Firestore Database.
      await userDoc.set(
        both,
        {
          merge: true
        });
      res.send(userDoc.get());
    } catch (e) {
      const a = e as Stripe.StripeInvalidRequestError;
      functions.logger.log('un error creating linkEmailNewCollection  ', e);
      res.status(400).send(a.message);
    }
  });
});


  //Create a price for shipment
  api.post('*/createPriceShipment', async (req, res) => {
    try {
        functions.logger.log('body', req.body);

        const my_price = req.body.shipment_price;
        const my_shipmentId = req.body.quotationShipmentId;
        const my_rateShipment = req.body.shipment_price;

        const stripePrivateKey = req.test
          ? functions.config().test?.stripe_key ||
            // eslint-disable-next-line max-len
            'sk_test_51HeFN3CSCspr9IRjIZMsOqXCBZFy99JHZng9XZgF16Krdphwam0Fbvt2LLEPjsJAXSWpR2nMIcPEKCh0tVB41MqR00Kv7KLqCv'
          : functions.config().stripe.key;
        //Connect to stripe
        const str = new stripe(stripePrivateKey, {
          apiVersion: '2020-08-27',
        });
        //Create a product
        const product = await str.products.create({
          name: 'Envío',
          description: 'Envío del pedido ' + my_shipmentId + '_' + my_rateShipment,
        });
        //Create a price for that product
        const price = await str.prices.create({
          unit_amount: my_price,
          currency: 'mxn',
          product: product.id,
        });
        //Create a link for that product
        const link = await str.paymentLinks.create({
          line_items: [
            {
              price: price.id,
              quantity: 1,
            },
          ],
          billing_address_collection: 'required',
          shipping_address_collection: { allowed_countries: ['MX'] },
          phone_number_collection: {
            enabled: true,
          },
          // after_completion: {
          //   type: 'redirect',
          //   redirect: { url: 'https://lizza-s-pocs.web.app/api/approve' },
          // },
        });
        functions.logger.log('El link del envio es: ', link);
        //Send our custom link id
        res.send(price.id);
    } catch (e) {
        const a = e as Stripe.StripeInvalidRequestError;
        functions.logger.log('un error creating link  ', e);
        res.status(400).send(a.message);
    }
  });


  //Create a paymentLink for a cart with products
  api.post('*/linkCart', async (req, res) => {
    try {
      functions.logger.log('Creando un link de pago de carrito');
      const myItems = req.body.items;
      const shipment_id = req.body.shipment_id;
      const store_name = req.body.store_name;
      const stripePrivateKey = req.test
        ? functions.config().test.stripe_key
        : functions.config().stripe.key;
      functions.logger.log('El stripePrivateKey para linkCart es: ', stripePrivateKey);
      const str = new stripe(stripePrivateKey, {
        apiVersion: '2020-08-27',
      });

      const line_items = myItems.map((item: any) => {
        return {
          price: item.price_id,
          quantity: item.quantity,
        };
      });

      const redirect_url = req.test
      ? `https://lizza-s-pocs.web.app/testapi/approve?store_name=${store_name}&shipment_id=${shipment_id}`
      : `https://lizza-s-pocs.web.app/api/approve?store_name=${store_name}&shipment_id=${shipment_id}`

      //Create a link for that product
      const link = await str.paymentLinks.create({
        line_items,
        billing_address_collection: 'required',
        shipping_address_collection: { allowed_countries: ['MX'] },
        phone_number_collection: {
          enabled: true,
        },
        after_completion: {
          type: 'redirect',
          redirect: {
            url: redirect_url
          },
        },
      });

      // TODO: AFTER COMPLETION UN REDIRECT CON LOS PRICE_ID ENCODED PARA HACER EL LOW DE STOCK
      res.send(link.url);
    } catch (error) {
      const a = error as Stripe.StripeInvalidRequestError;
      functions.logger.log('Un error creando linkCart : ', error);
      res.send(400).send(a.message);
    }
  });

  //Create a payment link for a inhouse product
  api.post('*/inhouse', async (req, res) => {
    authenticate(req, res, async () => {
      try {
        functions.logger.log('body', req.body);
        functions.logger.log('fb product id', req.body.id);
        functions.logger.log('price', req.body.price);
        const stripePrivateKey = req.test
          ? functions.config().test.stripe_key
          : functions.config().stripe.key;
        //get product from firebase and assign to user
        const productData = await admin
          .firestore()
          .collection('products')
          .doc(req.body.id)
          .get();
        const product = { ...productData.data() };

        const userData = await admin.auth().getUser(req.user_id);
        //Connect to stripe
        const str = new stripe(stripePrivateKey, {
          apiVersion: '2020-08-27',
        });
        //Create a price for that product
        const price = await str.prices.create({
          unit_amount: req.body.price,
          currency: 'mxn',
          product: product.product_id,
        });
        //Create a link for that product
        const link = await str.paymentLinks.create({
          line_items: [
            {
              price: price.id,
              quantity: 1,
            },
          ],
          billing_address_collection: 'required',
          shipping_address_collection: { allowed_countries: ['MX'] },
          phone_number_collection: {
            enabled: true,
          },
          // after_completion: {
          //   type: 'redirect',
          //   redirect: { url: 'https://lizza-s-pocs.web.app/api/approve' },
          // },
        });
        const dateCreated = new Date();

        await admin
          .firestore()
          .collection('instaUsers')
          .doc(req.user_id)
          .collection('catalogue')
          .doc(req.body.id)
          .set(
            {
              ...product,
              url: link.url,
              link_id: link.id,
              price_id: price.id,
              sell_price: req.body.price,
              date: admin.firestore.Timestamp.fromDate(dateCreated),
              username: userData.displayName,
            },
            { merge: true }
          );

        res.send('ok');
      } catch (e) {
        const a = e as Stripe.StripeInvalidRequestError;
        functions.logger.log('un error creating link  ', e);
        res.status(400).send(a.message);
      }
    });
  });

  //Stripe payment webhook
  api.post('*/approve', async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = req.test
      ? functions.config().test.stripe_secret ||
        'whsec_Jo3LhDnQALHN8TiaVCPSGANpklGlZ6pf'
      : functions.config().stripe.secret;
    let event;
    functions.logger.log('payload2', req.rawBody);
    functions.logger.log('test', req.test);
    functions.logger.log('endpoint', endpointSecret);
    try {
      //Connect to stripe
      const stripePrivateKey = req.test
        ? functions.config().test?.stripe_key ||
          'sk_test_51HeFN3CSCspr9IRjIZMsOqXCBZFy99JHZng9XZgF16Krdphwam0Fbvt2LLEPjsJAXSWpR2nMIcPEKCh0tVB41MqR00Kv7KLqCv'
        : functions.config().stripe.key;
      const str = new stripe(stripePrivateKey, {
        apiVersion: '2020-08-27',
      });

      event = str.webhooks.constructEvent(
        req.rawBody,
        sig as string,
        endpointSecret
      );
    } catch (err) {
      const e = err as stripe.StripeSignatureVerificationError;
      functions.logger.log('error', e);

      return res.status(400).send(`Webhook Error: ${err}`);
    }
    // const event = req.body;
    functions.logger.log('event data', event.data);
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Payment;
        functions.logger.log('Los datos de session de stipe son: ', session);
        //Here we have the paymentlink id and the payment id, we need to store that on our db
        const dateCreated = new Date();
        //GET THE PAYMENTLINK FROM FIREBASE AND UPDATE IT WITH THE PAYMENT LINK
        //Create a payment in our side
        const paymentDoc = await admin
          .firestore()
          .collection('payments')
          .add({
            link_id: session.payment_link,
            address: session.shipping.address,
            email: session.customer_details.email,
            phone: session.customer_details.phone,
            name: session.shipping.name,
            status: session.payment_status,
            payment_id: session.payment_intent,
            date: admin.firestore.Timestamp.fromDate(dateCreated),
            price: session.amount_total,
          });
        // filter private collection by link_id and set a new payment colection with uid
        const privateLinks = await admin
          .firestore()
          .collectionGroup('private')
          .where('link_id', '==', session.payment_link)
          .get();
        privateLinks.forEach(async (doc) => {
          functions.logger.log('found link id', doc.id);
          //Set extra peyment info, user id, product name
          await paymentDoc.set(
            {
              uid: paymentDoc.id,
              user_id: doc.get('user_id'),
              product_name: doc.get('product_name'),
              image: doc.get('image') || '',
            },
            { merge: true }
          );
          const publicLinks = await admin
            .firestore()
            .collectionGroup('public')
            .where('link_id', '==', session.payment_link)
            .get();
          await Promise.all(
            publicLinks.docs.map(async (publicLink) => {
              await publicLink.ref.set(
                { payments: admin.firestore.FieldValue.increment(1) },
                { merge: true }
              );
            })
          );
          //Ref to payment link in user or/and increment payments in link
          await doc.ref
            .collection('payments')
            .doc(paymentDoc.id)
            .set({ uid: paymentDoc.id });
          // await doc.ref.set(
          //   { payments: admin.firestore.FieldValue.increment(1) },
          //   { merge: true }
          // );
        });
        return res.status(200).send('ok');
        break;
      }

      case 'checkout.session.async_payment_succeeded': {
        const session = event.data.object;

        // Fulfill the purchase...
        // fulfillOrder(session);
        functions.logger.log('session', session);

        break;
      }

      case 'checkout.session.async_payment_failed': {
        const session = event.data.object;

        // Send an email to the customer asking them to retry their order
        // emailCustomerAboutFailedPayment(session);
        functions.logger.log('session', session);

        break;
      }
      default:
        break;
    }
    return res.status(200).send('ok');
  });

  api.get('*/approve', async (req, res) => {

    const myUrl = req.url;

    functions.logger.log('Es test? ', req.test);

    functions.logger.log('Se hizo una petición a la ruta ' + myUrl);

    functions.logger.log('****El envio es ****[', req.query.shipment_id, ']');
    functions.logger.log('****El store_name es ****[', req.query.store_name, ']');

    let redirectURL = ''

    if(myUrl.includes('testapi')){
      functions.logger.log('Se va a probar en test porque viene de /testapi/');
      ///----------------------------        TEST      --------------------------------------------
      const API_KEY_MIENVIO = 'x1qsjmOgBxpoXfzydp7NljzimjVg8nrnAbMa1w85BcwvW6tDygMrRd8N1JP0';
      const URL_MIENVIO = 'https://dev-sandbox.mienvio.mx/api';
      ///----------------------------       END-TEST      -----------------------------------------
      const my_purchase_body = {
        'shipments': [
          req.query.shipment_id
        ],
        'payment': {
          'provider': 'wallet'
        }
      }

      const data = JSON.stringify(my_purchase_body);
      functions.logger.log('****data es ****[', data, ']');

      const result = await axios.post<unknown, { data: string; status: number }>(
        `${URL_MIENVIO}/purchases`,
        data,
        {
          headers: {
            Authorization: `Bearer ${API_KEY_MIENVIO}`,
            'Content-Type': 'application/json',
          },
        }
      );
      functions.logger.log('Result entvio en test es: ', result.data);
      redirectURL = `https://lizza-s-pocs--preview-one-7qv2pudz.web.app/${req.query.store_name}`;
    }else{
      functions.logger.log('Se va a probar en prod porque viene de /api/');
      ///----------------------------        PROD      --------------------------------------------
      const API_KEY_MIENVIO = 'QXyOi5qH4AMPW6nBoCHAbaqhnWIE8nCff60ilRAH7dfLyYGXdBBJi0k58uEF';
      const URL_MIENVIO = 'https://production.mienvio.mx/api';
      ///----------------------------       END-PROD      -----------------------------------------
      const my_purchase_body = {
        'shipments': [
          req.query.shipment_id
        ],
        'payment': {
          'provider': 'wallet'
        }
      }

      const data = JSON.stringify(my_purchase_body);
      functions.logger.log('****data es ****[', data, ']');

      const result = await axios.post<unknown, { data: string; status: number }>(
        `${URL_MIENVIO}/purchases`,
        data,
        {
          headers: {
            Authorization: `Bearer ${API_KEY_MIENVIO}`,
            'Content-Type': 'application/json',
          },
        }
      );
      functions.logger.log('Result entvio en prod es: ', result.data);
      redirectURL = `https://lizza.app/${req.query.store_name}`;
    }

    res.redirect(redirectURL);
  });

  // Mount the chat routes.
  api.use('*/chat', chatRouter());

  return api;
};
