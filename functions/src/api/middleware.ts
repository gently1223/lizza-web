import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import * as express from 'express';
// Express middleware that validates Firebase ID Tokens passed in the Authorization HTTP header.
// The Firebase ID token needs to be passed as a Bearer token in the Authorization HTTP header like this:
// `Authorization: Bearer <Firebase ID Token>`.
// when decoded successfully, the ID Token content will be added as `req.user`.
export const authenticate: express.RequestHandler = async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer ')
  ) {
    res.status(403).send('Unauthorized');
    return;
  }
  const idToken = req.headers.authorization.split('Bearer ')[1];
  try {
    const decodedIdToken = await admin.auth().verifyIdToken(idToken);
    // functions.logger.log('Decode token', decodedIdToken);
    const userDoc = await admin
      .firestore()
      .collection('instaUsers')
      .doc(decodedIdToken.uid)
      .get();
    if(userDoc.exists){
      functions.logger.log('user found is <', userDoc, '>');
      req.token = userDoc.get('token');
      req.facebookAccessToken = userDoc.get('facebookToken');
      req.user_id = decodedIdToken.uid;
      next();
      return;
    }else{
      const userDoc = await admin
                      .firestore()
                      .collection('users')
                      .doc(decodedIdToken.uid)
                      .get();
      functions.logger.log('user found is <', userDoc, '>');
      req.token = userDoc.get('igtoken');
      req.facebookAccessToken = userDoc.get('facebookToken');
      req.user_id = decodedIdToken.uid;
      next();
      return;
      // const userDoc = await admin
      //                 .firestore()
      //                 .collection('users')
      //                 .doc(decodedIdToken.uid)
      //                 .get();
      // functions.logger.log('user found is <', userDoc, '>');
      // req.token = userDoc.get('igtoken');
      // req.facebookAccessToken = userDoc.get('facebookToken');
      // req.user_id = decodedIdToken.uid;
      // const userStore = await admin
      //                 .firestore()
      //                 .collection('stores')
      //                 .where('user_uid', '==', decodedIdToken.uid)
      //                 .get();
      // req.store_id = userStore.docs[0].id;
      // next();
      // return;
    }
  } catch (e) {
    res.status(403).send('Unauthorized');
    return;
  }
};
