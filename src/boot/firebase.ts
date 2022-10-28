import { boot } from 'quasar/wrappers';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DB_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID,
};

const fbApp = firebase.apps.length
  ? firebase.app()
  : firebase.initializeApp(firebaseConfig);
let db$: firebase.firestore.Firestore,
  auth$: firebase.auth.Auth,
  storage$: firebase.storage.Storage,
  host$: string,
  port$: string;

const auth = (): firebase.auth.Auth => {
  if (!auth$) {
    auth$ = fbApp.auth();
    if (host$ === 'localhost' && port$ !== '8080') {
      auth$.useEmulator('http://localhost:9099');
    }
  }
  return auth$;
};
const db = () => {
  if (!db$) {
    db$ = fbApp.firestore();
    if (host$ === 'localhost' && port$ !== '8080') {
      db$.useEmulator('localhost', 8080);
    }
  }
  return db$;
};

const storage = () => {
  if (!storage$) {
    storage$ = fbApp.storage();
    if (host$ === 'localhost' && port$ !== '8080') {
      storage$.useEmulator('localhost', 9199);
    }
  }
  return storage$;
};

const analytics = fbApp.analytics();

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default boot(async ({ router } /* { app, router, Vue ... } */) => {
  host$ = location.hostname;
  port$ = location.port;
  // console.log(host$, port$);
  try {
    const user = await new Promise((resolve, reject) => {
      auth().onAuthStateChanged((user) => {
        if (user) {
          if (user) {
            analytics.setUserId(user.uid);
            // analytics.setUserProperties({
            //   account_type: "Basic" // can help you to define audiences
            // });
          }
          resolve(user);
        } else {
          reject(null);
        }
      });
    });
    console.log('user',user);
    // if (user) {
    //   await router.push('/');
    // }
  } catch (e) {
    console.log(e);
  }
  router.beforeEach((to) => {
    analytics.logEvent('page_view', {
      page_path: to.path,
      page_title: to.name?.toString(),
    });
  });
  console.log('afer listen login');
});

export { auth, db, storage, analytics };
