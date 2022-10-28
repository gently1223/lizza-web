import { reactive, toRefs, computed } from 'vue';
import { auth, analytics } from 'boot/firebase';
import { api } from 'boot/axios';
import FIREBASE from 'firebase';

const state = reactive({
  user: <firebase.default.User | null>null,
});
export const useAuthApi = () => {
  const loginAnonym = async () => {
    if (state.user?.email) return;

    try {
      console.log('no user, sign in again');
      const credentials = await auth().signInAnonymously();
      state.user = credentials.user;
    } catch (error) {
      console.log(error);
    }
  };
  const loginWithPass = async (email: string, pass: string) => {
    try {
      const credentials = await auth().signInWithEmailAndPassword(email, pass);
      state.user = credentials.user;
      console.log(credentials.user);
    } catch (e) {
      console.log(e);
      return e as firebase.default.auth.AuthError;
    }
  };
  const loginWithGoogle = async () => {
    try {
      const provider = new FIREBASE.auth.GoogleAuthProvider();
      const credentials = await auth().signInWithPopup(provider);
      state.user = credentials.user;
      console.log(credentials.user);
      return { user: credentials.user };
    } catch (e) {
      console.log(e);
      return { error: e as firebase.default.auth.AuthError };
    }
  };
  const loginWithInstagram = () => {
    try {
      analytics.logEvent('ig_login_start');
      if (window.location.hostname.includes('preview')) {
        if (window.location.hostname.includes('tony')) {
          window.location.href = '/testapi/redirecttony';
        }
        else if (window.location.hostname.includes('jesus')) {
          window.location.href = '/testapi/redirectjesus';
        }
        else if (window.location.hostname.includes('sara')) {
          window.location.href = '/testapi/redirectsara';
        }
        else if (window.location.hostname.includes('mike')) {
          window.location.href = '/testapi/redirectmike';
        }
        else if (window.location.hostname.includes('thulsi')) {
          window.location.href = '/testapi/redirectthulsi';
        }
        else{
          window.location.href = '/testapi/redirect';
        }
      } else {
        window.location.href = '/api/redirect';
      }
    } catch (e) {
      console.log(e);
      return e;
    }
  };
  const loginWithFacebook = async () => {
    const loginResult = await new Promise<fb.AuthResponse | null>((resolve) => {
      try {
        FB.login(
          (result) => {
            console.log(result);
            if (result.authResponse) {
              //is logged in
              resolve(result.authResponse);
            } else {
              resolve(null);
            }
          },
          { scope: 'public_profile,email,instagram_basic,instagram_manage_messages,pages_manage_metadata,pages_read_engagement' }
        );
        console.log('login with facebook');
      } catch (e) {
        console.log(e);
        resolve(null);
        return e;
      }
    });
    return loginResult;
  };
  //Not in used ATM
  const linkAccount = async (token: string, user_id: string) => {
    //Create firebase account or update token
    const response = await api.get<{ token: string }>('/link', {
      params: { token, user_id },
    });
    const fbToken = response.data.token;
    console.log(fbToken);
    //Login in firabase
    if (fbToken) {
      const credentials = await auth().signInWithCustomToken(fbToken);
      console.log(credentials);
      state.user = credentials.user;
    }
  };
  const instagramRedirect = async (code: string, i_state: string) => {
    try {
      const response = await api.get<{ token: string }>('/token', {
        params: { code, state: i_state },
      });
      const token = response.data.token;
      console.log(token);
      if (token) {
        const credentials = await auth().signInWithCustomToken(token);
        console.log(credentials);

        // Link the current Facebook account to the newly created Firebase account.
        await linkFacebook();

        state.user = credentials.user;
      }
      analytics.logEvent('ig_login_end');
    } catch (e) {
      console.log(e);
      return e;
    }
  };
  const checkFacebookStatus = async () => {
    const authResponse = await new Promise<fb.AuthResponse>((resolve) => {
      // auto authenticate with the api if already logged in with facebook
      FB.getLoginStatus(({ authResponse }) => {
        if (authResponse) {
          console.log('facebook auth', authResponse);
          // await linkAccount(authResponse.accessToken, authResponse.userID);
          //push to main and the guard will take care of sync the account
        } else {
          console.log('no response');
        }
        resolve(authResponse);
      });
    });
    return authResponse;
  };

  const conectInstagram = async (code: string, i_state: string) => {
    try {
      console.log('La url de redirect es: ', {
        code,
        state: i_state,
        redirect_url: window.location.hostname,
      });
      const response = await api.get<{ token: string }>('/connectInstagram', {
        params: {
          code,
          state: i_state,
          redirect_url: window.location.hostname,
        },
      });
      const token = response.data.token;
      console.log('El token de la petici´øn es -> ', token);
      // if (token) {
      //   const credentials = await auth().signInWithCustomToken(token);
      //   console.log(credentials);
      //   // Link the current Facebook account to the newly created Firebase account.
      //   await linkFacebook();
      //   state.user = credentials.user;
      // }
      analytics.logEvent('ig_login_end');
    } catch (e) {
      console.log(e);
      return e;
    }
  };
  /**
   * Will link the currently logged-in Facebook User to the currently authenticated user.
   * This must be done after the Instagram Account has been linked / created Firebase Auth Account.
   */
  const linkFacebook = async () => {
    const { accessToken } = await checkFacebookStatus();
    const user = auth().currentUser;

    // AccessToken must be available and user must be logged in.
    if (accessToken && user) {
      const response = await api.post('/facebook-link', {
        accessToken: accessToken
      });

      console.log('Facebook Account link response', response);
    } else {
      console.error('Unable to link Facebook Account to Firebase Auth Account', { accessToken, user });
    }
  };

  const isLoggedIn = () => {
    const user = auth().currentUser;
    if (user) {
      state.user = user;
      return true;
    } else {
      state.user = null;
      return false;
    }
  };
  const logout = async () => {
    await auth().signOut();
    const respo = await checkFacebookStatus();
    if (respo) {
      await new Promise((resolve) => {
        FB.logout(function (response) {
          console.log('Logged Out!', response);
          resolve(response);
        });
      });
    }

    window.location.href = '/';
  };

  const createAuthWithMailAndPass = async (email: string, pass: string) => {
    try {
      const credentials = await auth().createUserWithEmailAndPassword(
        email,
        pass
      );
      state.user = credentials.user;
      if (credentials.user) {
        return {
          created: true,
          message: 'User Auth Created',
          data: credentials.user,
        };
      } else {
        return { created: false, message: 'User Auth problem', data: null };
      }
    } catch (e) {
      console.log(e);
      const error = e as firebase.default.auth.AuthError;
      return { created: false, message: error.message, data: null };
    }
  };
  const createUserDBAuthWithMailAndPass = async (
    email: string,
    pass: string,
    uid: string,
    store_name: string
  ) => {
    try {
      const result = await api.post<unknown, { data: string; status: number }>(
        '/createAccount',
        {
          email,
          pass,
          uid,
          store_name,
        }
      );
      //The link id
      console.log(result);
      if (result.status === 400) {
        return { success: false, value: result.data };
      }
      return { success: true, value: result.data };
    } catch (e) {
      console.log(e);
      const error = e as firebase.default.auth.AuthError;
      return { success: false, value: error };
    }
  };
  const loginWithMailAndPass = async (email: string, pass: string) => {
    try {
      const credentials = await auth().signInWithEmailAndPassword(email, pass);
      state.user = credentials.user;
      const result = {
        isLoggedIn: true,
        message: 'Loggin Succesfully',
        data: credentials,
      };
      console.log('El usuario logeado es <', result, '>');
      return result;
    } catch (e) {
      console.log(e);
      const error = e as firebase.default.auth.AuthError;
      return { isLoggedIn: false, message: error.message, data: null };
    }
  };

  const sendRecoverPasswordEmail = async (email: string) => {
    const user = auth();
    let redirect_url = '';
    if (window.location.hostname.includes('preview')) {
      if (window.location.hostname.includes('tony')) {
        redirect_url = 'https://lizza-s-pocs--preview-tony-7l6eknwd.web.app/login';
      }
      else if (window.location.hostname.includes('jesus')) {
        redirect_url = 'https://lizza-s-pocs--preview-jesus-l1yizlzh.web.app/login';
      }
      else if (window.location.hostname.includes('sara')) {
        redirect_url = 'https://lizza-s-pocs--preview-sara-f8p5f7nt.web.app/login';
      }
      else if (window.location.hostname.includes('mike')) {
        redirect_url = 'https://lizza-s-pocs--preview-mike-d44cl5lp.web.app/login';
      }
      else if (window.location.hostname.includes('thulsi')) {
        redirect_url = 'https://lizza-s-pocs--preview-thulsi-4az0hug1.web.app/login';
      }
      else{
        redirect_url = 'https://lizza-s-pocs--preview-one-7qv2pudz.web.app/login';
      }
    } else {
      redirect_url = 'https://lizza.app/login';
    }
    const actionCodeSettings = {
      url: redirect_url+ '?email=' + email,
      handleCodeInApp: true,
    };
    let result;
    await user
      .sendPasswordResetEmail(email, actionCodeSettings)
      .then(() => {
        // Password reset email sent!
        // ..
        result = { emailSent: true, message: 'Email sent succesfully' };
      })
      .catch((error) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        const errorCode = error.code;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        const errorMessage = error.message;
        result = {
          emailSent: false,
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          message: `Error ${errorCode}, message: ${errorMessage}`,
        };
      });

    return result;
  };
  const confirmPasswordReset = async (oobCode: string, newPassword: string) => {
    const user = auth();
    let result;
    await user
      .confirmPasswordReset(oobCode, newPassword)
      .then(() => {
        // Password reset email sent!
        // ..
        result = {  message: 'Password has been reset!' };
      })
      .catch((error) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        const errorCode = error.code;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        const errorMessage = error.message;
        result = {
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          message: `Error ${errorCode}, message: ${errorMessage}`,
        };
      });

    return result;
  };
  const emailExists = async (email: string) => {
    try {
      const credentials = await auth().fetchSignInMethodsForEmail(email);
      if(credentials.length == 0){
        return { exists: false, methods: null }
      }else{
        return { exists: true, methods: credentials };
      }
    } catch (e) {
      console.log(e);
      const error = e as firebase.default.auth.AuthError;
      return { isLoggedIn: false, message: error.message, data: null };
    }
  };
  const updatePassword = async (newPassword: string) => {
    try {
      const result = await state.user?.updatePassword(newPassword);
      return { changed: true, message: result };
    } catch (e) {
      console.log(e);
      const error = e as firebase.default.auth.AuthError;
      return { changed: false, message: error.message };
    }
  };
  //Computed
  const userId = computed(() => {
    return state.user ? state.user.uid : '';
  });
  return {
    ...toRefs(state),
    userId,
    emailExists,
    createAuthWithMailAndPass,
    loginWithMailAndPass,
    sendRecoverPasswordEmail,
    createUserDBAuthWithMailAndPass,
    loginAnonym,
    loginWithPass,
    loginWithInstagram,
    conectInstagram,
    instagramRedirect,
    isLoggedIn,
    loginWithFacebook,
    linkAccount,
    checkFacebookStatus,
    logout,
    loginWithGoogle,
    confirmPasswordReset,
    updatePassword
  };
};
