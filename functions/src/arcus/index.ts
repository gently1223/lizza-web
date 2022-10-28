import express, { Express } from 'express';
import jwt from 'jsonwebtoken';
import { authenticate } from './middleware';
import { v4 } from 'uuid';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import crypto from 'crypto';
functions.logger.log('crypto', crypto.randomUUID);
console.log(crypto.randomUUID(), 'crypto');
interface ArcusRequest {
  //Unique deposit identifier created by Arcus. It will follow the format of "ap_XXXXXXX"
  id: string;
  //Type of object to be sent. ()
  object: string;
  //Type of payment to be processed.(deposit,bill_pay,cash_out)
  type: string;
  //Account reference (as provided by the payee) that will be used to reference the account into which funds will be deposited.
  //This reference could be either the participants’ internal account reference or a CLABE
  // (Clave Bancaria Estandarizada, Spanish for "standardized banking cipher" or "standardized bank code")
  account_reference: string;
  //ISO 3166-1 country in which the payee and payment are being processed.
  country: string;
  //Amount of the deposit in local currency. In cents. (i.e. 100MXN will be represented as 10000)
  amount: number;
  //Currency (MXN, EUR...)
  currency: string;
  //Reference of the payer that initiated the deposit transaction(this is our user id in DB)
  payer_id: string;
  metadata: {
    //Point Of Sale ID, as provided by the payer that is processing the payment
    pos_id: string;
    //Cashier unique ID that can be used to identify unequivocally the cashier that initiated the payment from the payer side. Required in certain geographies
    cashier_id: string;
  };
}
interface ArcusResponse {
  //Unique deposit identifier created by Arcus. It will follow the format of "ap_XXXXXXX"
  id: string;
  //Type of object to be sent. ()
  object: string;
  //Type of payment to be processed.(deposit,bill_pay,cash_out)
  type: string;
  //Account reference (as provided by the payee) that will be used to reference the account into which funds will be deposited.
  //This reference could be either the participants’ internal account reference or a CLABE
  // (Clave Bancaria Estandarizada, Spanish for "standardized banking cipher" or "standardized bank code")
  account_reference: string;
  //Amount of the deposit in local currency. In cents. (i.e. 100MXN will be represented as 10000)
  amount: number;
  //Verification code. Code generated by the Arcus Pay payment institution as means to verify the approved payment
  verification_code: string;
  //Timestamp when the deposit was authorized. RFC 3339 section 5.6.
  authorized_date: string;
  //Shows contact information (phone number and support email) of the payee with the purpose to clarify information about the payment between the users and the entities.
  //It's mandatory for Regulated Financial Entities

  metadata: {
    //Point Of Sale ID, as provided by the payer that is processing the payment
    pos_id: string;
    //Cashier unique ID that can be used to identify unequivocally the cashier that initiated the payment from the payer side. Required in certain geographies
    cashier_id: string;
    // Can be used to share contact information for lizza
    company_contact?: string;
    //Can be used to publicize the slogan or how lizza identifies
    promotional_info?: string;
  };
}
export default (testMode: boolean): Express => {
  const arcus = express();
  if (testMode) {
    arcus.use((req, res, next) => {
      req.test = true;
      next();
    });
  }
  arcus.post('*/authentication', async (req, res) => {
    try {
      const user = req.body.user,
        pass = req.body.password;
      const arcusUser = admin
        .firestore()
        .collection('userArcus')
        .where('user', '==', user);
      functions.logger.log('arcusUser is  ', arcusUser);
      if (arcusUser === undefined) {
        res.status(422).send({
          code: '400',
          message: 'Los datos de inicio de sesión son inválidos',
        });
        return;
      }
      const searchUser = (await arcusUser.get()).docs[0].data();
      console.log(JSON.stringify(searchUser), 'searchUser********');
      if (searchUser.user !== user || searchUser.password !== pass) {
        res.status(422).send({
          code: '400',
          message: 'Los datos de inicio de sesión son inválidos',
        });
        return;
      } else {
        const token = await new Promise<string | undefined>((resolve) => {
          jwt.sign(
            { user, pass },
            'somekeyhere',
            { expiresIn: '1800s' },
            function (err, token) {
              console.log(err);
              console.log(token);
              resolve(token);
            }
          );
        });
        console.log('🚀 ~ file: index.ts ~ line 112 ~ token ~ token', token);
        if (token) {
          res.send({ token, expires_in: '1800' });
        } else {
          res.status(400).send('Impossible to create token');
        }
      }
    } catch (e) {
      console.log(e);
      res.status(400).send('Impossible to create token');
    }
  });

  arcus.post('*/arcuspay', (req, res) => {
    authenticate(req, res, async () => {
      try {
        const arcusRequest = req.body as ArcusRequest;
        const reference = req.body.account_reference;
        //this request contains the user id from our db and the iban or clabe to deposit the money
        functions.logger.log('req.body que trae', req.body);
        functions.logger.log('arcusRequest que trae', arcusRequest);
        if (!arcusRequest.id) {
          res.status(401).send('Unprocessable Entity (WebDAV)');
          return;
        }

        const userDoc = admin
          .firestore()
          .collection('arcus')
          .where('account_reference', '==', reference);
        functions.logger.log('userDoc is  ', userDoc);
        if (userDoc) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const search = (await userDoc.get()).docs[0].data();
          functions.logger.log('body arcus:  ', arcusRequest);
          console.log('encontrado  ', search);
          functions.logger.log('encontrado  ', search);
          if ((arcusRequest.amount as number) !== (search.amount as number)) {
            res
              .status(422)
              .send({ code: 'A012', message: 'Invalid or missing parameters' });
            return;
          }
          if (
            !arcusRequest.id ||
            !arcusRequest.object ||
            !arcusRequest.type ||
            !arcusRequest.account_reference ||
            !arcusRequest.currency ||
            !arcusRequest.payer_id ||
            !arcusRequest.metadata
          ) {
            res
              .status(422)
              .send({ code: 'A012', message: 'Invalid or missing parameters' });
            return;
          }
          if (
            arcusRequest.country.length > 2 ||
            arcusRequest.country !== arcusRequest.country.toUpperCase()
          ) {
            res.status(422).send({
              code: 'A012',
              message: 'Invalid or missing parameters',
              cause: 'Parameter country is invalid',
            });
            return;
          } else if (
            arcusRequest.currency.length > 3 ||
            arcusRequest.currency !== arcusRequest.currency.toUpperCase()
          ) {
            res.status(422).send({
              code: 'A012',
              message: 'Invalid or missing parameters',
              cause: 'Parameter currency is invalid',
            });
            return;
          }
          if (
            arcusRequest.object === 'arcus_pay' ||
            arcusRequest.type === 'cash_out'
          ) {
            res.status(422).send({
              code: 'A012',
              message: 'Invalid or missing parameters',
              cause: 'Parameter object or type is invalid',
            });
            return;
          }

          const arcusResponse: ArcusResponse = {
            id: arcusRequest.id,
            object: arcusRequest.object,
            type: arcusRequest.type,
            account_reference: arcusRequest.account_reference,
            amount: arcusRequest.amount,
            authorized_date: new Date().toISOString(),
            verification_code: v4(),
            metadata: {
              pos_id: arcusRequest.metadata.pos_id,
              cashier_id: arcusRequest.metadata.cashier_id,
              company_contact:
                'Correo: hola@lizzapp.com - Celular: +52 55 8481 7757',
              promotional_info:
                'Plataforma para quienes venden en redes sociales',
            },
          };
          res.status(201).send(arcusResponse);
        }
        if (userDoc === undefined) {
          res
            .status(422)
            .send({ code: 'A012', message: 'Invalid or missing parameters' });
          return;
        }
      } catch (error) {
        functions.logger.log('error en el catch', error);
        res.status(400).send(error);
      }
    });
  });
  arcus.post('*/createArcusPayment', async (req, res) => {
    try {
      functions.logger.log(
        'body para createArcusPayment dentro de arcus:  ',
        req.body
      );
      console.log('body para createArcusPayment:  ', req.body);
      const my_arcus_object = {
        account_reference: req.body.reference,
        amount: req.body.amount,
        status: 'pending',
      };
      // {
      //   "id": "ap_23125131",
      //   "object": "arcuspay",
      //   "type": "deposit",
      //   "account_reference": "1233321231231",
      //   "country": "MX",
      //   "amount": "10000",
      //   "currency": "MXN",
      //   "payer_id": "23312",
      //   "metadata": {
      //     "pos_id": "23442",
      //     "cashier_id": "xx@3444df_id_33"
      //   }
      // }
      const userDoc = admin.firestore().collection('arcus');
      // const user = await userDoc.get();
      // const stock = req.body.stock;
      // const isActive = req.body.isActive;
      // const dimensions = req.body.dimensions;
      const newDoc = await userDoc.add(my_arcus_object);
      // await newDoc.set({ uid: newDoc.id }, { merge: true });
      res.send(newDoc);
    } catch (e) {
      const a = e as Error;
      functions.logger.log(
        'un error createArcusPayment en functions/src/arcus/index.ts  ',
        e
      );
      res.status(400).send(a.message);
    }
  });
  return arcus;
};