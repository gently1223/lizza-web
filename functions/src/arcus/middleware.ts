import * as express from 'express';
import jwt from 'jsonwebtoken';

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
    const verifed = await new Promise((resolve) => {
      jwt.verify(idToken, 'somekeyhere', (result) => {
        if (result?.message) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
    if (verifed) {
      next();
      return;
    } else {
      res.status(403).send('Unauthorized');
      return;
    }
  } catch (e) {
    res.status(403).send('Unauthorized');
    return;
  }
};
