import { reactive, toRefs } from 'vue';
import { db } from 'boot/firebase';
import { api } from 'boot/axios';

export const useStoresApi = () => {
  const getAllStoresNames = async () => {
    const names: string[] = [];
    const result = await db()
                  .collection('stores')
                  .get();
    const stores = result.docs;
    stores.forEach(element => {
      names.push(element.data().name);
    });
    return names;
  }
  const existsName = async (name: string) => {
    const result = await db()
                  .collection('stores')
                  .doc(name)
                  .get();
    if(result.exists){
      return true;
    }
    return false;
  }
  const getStore = async (name: string) => {
    try {
      const userData = await db()
                      .collection('stores')
                      .where('name', '==', name).get();
      // state.user = { ...userData.data(), uid: userData.id } as User;
      return userData.docs[0].data();
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  const insertStore = async (name: string, uid: string) => {
    try {
      const names = await getAllStoresNames();
      if(!names.includes(name)){
        const result = await api.post<unknown, { data: any; status: number }>('/createStore', {name, uid});
        //The link id
        console.log(result);
        if (result.status === 400) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          return { inserted: false, data: result.data };
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        return {inserted: true, data: result.data};
      }
      return {inserted: false, data: null};
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  const updateStore = async (id_store: string, user_id: string) => {
    try {
      await db()
        .collection('stores')
        .doc(id_store)
        .set({ user_uid: user_id }, { merge: true });
    } catch (error) {
      console.log(error)
      return null;
    }
  }

  return {
    getAllStoresNames,
    existsName,
    getStore,
    insertStore,
    updateStore,
  }
};
