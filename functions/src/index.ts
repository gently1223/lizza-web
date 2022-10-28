import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import stripe from 'stripe';

import API from './api';
import ARCUS from './arcus';
const PROD_API = API(false);
const TEST_API = API(true);
const ARCUS_API = ARCUS(false);
export const api = functions.https.onRequest(PROD_API);
export const testapi = functions.https.onRequest(TEST_API);
export const arcus = functions.https.onRequest(ARCUS_API);
if (!admin.apps.length) {
  admin.initializeApp();
}
//Listerners
export const productChanged = functions.firestore
  .document('instaUsers/{userId}/public/{productId}')
  .onUpdate(async (change, ctx) => {
    const oldPrice = change.before.get('price'),
      newPrice = change.after.get('price');
    //change price in stripe if changed
    if (oldPrice !== newPrice) {
      functions.logger.log('diferent price');
      const privateProductDoc = await admin
        .firestore()
        .collection('instaUsers')
        .doc(ctx.params.userId)
        .collection('private')
        .doc(ctx.params.productId)
        .get();
      const linkId = privateProductDoc.get('link_id'),
        url = change.after.get('url');
      const stripePrivateKey =
        url.indexOf('test') > -1
          ? functions.config().test.stripe_key
          : functions.config().stripe.key;
      //Connect to stripe
      const str = new stripe(stripePrivateKey, {
        apiVersion: '2020-08-27',
      });
      //get stripe link items(products) to get the price id
      const line_items = await str.paymentLinks.listLineItems(linkId);
      functions.logger.log('items', line_items.data);
      const productId = line_items.data[0].price?.product;
      //if we have price id change the price in stripe if not then dont change the price in firebase
      //TO CHANGE THE PRICE WE NEED TO CREATE A NEW ONE FOR THE SAME PRODUCT AND CREATE A DIFFERENT PAYMENTLINK(DISABLE OLD ONE)
      if (productId) {
        //create new price for product and set it on paymentlink line item
        functions.logger.log('produt id', productId);

        //Create a new price for that product
        const price = await str.prices.create({
          unit_amount: newPrice,
          currency: 'mxn',
          product: productId as string,
        });

        //Create new payment link and disbled old one
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

        //Disable old link and assign new url/link to product
        await str.paymentLinks.update(linkId, { active: false });
        return change.after.ref.set(
          {
            link_id: link.id,
            url: link.url,
          },
          { merge: true }
        );
      } else {
        return null;
      }
    }
    return change;
  });

export const productChangedNewCollection = functions.firestore
  .document('products/{productId}')
  .onUpdate(async (change, ctx) => {
    const oldPrice = change.before.get('price'),
      newPrice = change.after.get('price');
    //change price in stripe if changed
    if (oldPrice !== newPrice) {
      functions.logger.log('diferent price');
      const privateProductDoc = await admin
        .firestore()
        .collection('products')
        .doc(ctx.params.productId)
        .get();
      const linkId = privateProductDoc.get('link_id'),
        url = change.after.get('url');
      const stripePrivateKey =
        url.indexOf('test') > -1
          ? functions.config().test.stripe_key
          : functions.config().stripe.key;
      //Connect to stripe
      const str = new stripe(stripePrivateKey, {
        apiVersion: '2020-08-27',
      });
      //get stripe link items(products) to get the price id
      const line_items = await str.paymentLinks.listLineItems(linkId);
      functions.logger.log('items', line_items.data);
      const productId = line_items.data[0].price?.product;
      //if we have price id change the price in stripe if not then dont change the price in firebase
      //TO CHANGE THE PRICE WE NEED TO CREATE A NEW ONE FOR THE SAME PRODUCT AND CREATE A DIFFERENT PAYMENTLINK(DISABLE OLD ONE)
      if (productId) {
        //create new price for product and set it on paymentlink line item
        functions.logger.log('produt id', productId);

        //Create a new price for that product
        const price = await str.prices.create({
          unit_amount: newPrice,
          currency: 'mxn',
          product: productId as string,
        });

        //Create new payment link and disbled old one
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

        //Disable old link and assign new url/link to product
        await str.paymentLinks.update(linkId, { active: false });
        return change.after.ref.set(
          {
            link_id: link.id,
            url: link.url,
          },
          { merge: true }
        );
      } else {
        return null;
      }
    }
    return change;
  });
