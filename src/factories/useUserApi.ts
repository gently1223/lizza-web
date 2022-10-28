import { reactive, toRefs } from 'vue';
import { User } from 'src/components/models';
import { db } from 'boot/firebase';

const state = reactive({
  user: <User | null>null,
});

export const useUserApi = () => {
  const udpateUser = async (user: User) => {
    if (state.user?.uid) {
      //Update user
      // await db()
      //   .collection('instaUsers')
      //   .doc(state.user.uid)
      //   .set({ ...user }, { merge: true });
      const original = user;
      if(original.username === undefined){
        original.username = '';
      }
      console.log('Vamos a pasar ==> ', original)
      await db()
        .collection('users')
        .doc(state.user.uid)
        .set({ ...original }, { merge: true });
    }
  };

  const getUser = async (user_id: string) => {
    try {
      // let userData;
      // let otherUser;
      // if(user_id.includes('instagram')){
      //   userData = await db().collection('instaUsers').doc(user_id).get();
      //   otherUser = await db().collection('users').doc(user_id).get();
      // }else{
      //   userData = await db().collection('instaUsers').doc('instagram-'+user_id).get();
      //   otherUser = await db().collection('users').doc(user_id).get();
      // }
      // // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      // state.user = { ...userData.data(), ...otherUser.data(), uid: userData.id, username: otherUser.data()?.store_name } as User;
      // console.log('< ', state.user, '>')

      const otherUser = await db().collection('users').doc(user_id).get();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      state.user = { ...otherUser.data(), uid: otherUser.id, username: otherUser.data()?.store_name } as User;
      return state.user;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const getPasswordFromUser = async (email: string) => {
    try {
      const userData = await db().collection('users').where('email', '==', email).get();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
      return userData.docs[0].data().password as string;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  const updatePasswordDBFromUser = async (uid: string, newPassword: string) => {
    if(uid.includes('instagram-')){
      uid = uid.replace('instagram-', '')
    }
    const user = db()
                  .collection('users')
                  .doc(uid);
    await user.update({ password: newPassword })
  }

  const getUsername = async (user_id: string) => {
    try {
      console.log('Recibimos el ID: ', user_id);
      const userData = await db().collection('users').doc(user_id).get();
      state.user = { ...userData.data(), uid: userData.id } as User;
      return state.user.username;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const getInstagramUserName = async (username: string) => {
    try {
      // const userData = await db().collection('instaUsers').doc(user_id).get();
      // .collection("instaUsers").where("username", "==", "tonylizzapp")
      let userData
      // userData = await db().collection('instaUsers').where('username', '==', username).get();
      // if(userData.empty){
        userData = userData = await db().collection('users').where('store_name', '==', username).get();
      // }
      console.log('////', userData.docs[0].data())
      return userData.docs[0];
    } catch (e) {
      console.log(e);
      return null;
    }
  };
  const getUserSocials = async (user_id: string) => {
    try {
      const userData = await db().collection('instaUsers').doc(user_id).get();
      // state.user = { ...userData.data(), uid: userData.id } as User;
      // const user = { ...userData.data(), uid: userData.id } as User;
      return { ...userData.data(), uid: userData.id } as User;
    } catch (e) {
      console.log(e);
      return null;
    }
  };
  const getInstagramToken = async (user_id: string) => {
    try {
      const userData = await db().collection('users').doc(user_id).get();
      const data = { ...userData.data(), uid: userData.id } as User;
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const logoutInstagram = async () => {
    if (state.user?.uid) {
      //Update user
      const user = db()
                  .collection('instaUsers')
                  .doc(state.user.uid);
      await user.update({ token: '' })
    }
  }

  return {
    ...toRefs(state),
    getUser,
    udpateUser,
    getUsername,
    getInstagramUserName,
    getUserSocials,
    getInstagramToken,
    getPasswordFromUser,
    updatePasswordDBFromUser,
    logoutInstagram,
  };
};
