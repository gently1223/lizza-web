import { reactive, toRefs } from 'vue';
import { db } from 'src/boot/firebase';
import { Product } from 'src/components/models';

const DOMAIN = process.env.SHARE_LINK_DOMAIN || '';
const CATALOGUE_DOMAIN = process.env.SHARE_CATALOGUE_DOMAIN || '';

const state = reactive({
  products: <Product[]>[],
  listener: <firebase.default.Unsubscribe | null>null,
  product: <Product>{},
  inhouseProducts: <Product[]>[],
});
export const useProductApi = () => {
  const listenProducts = (user_id: string) => {
    // if(user_id.includes('instagram')){
    //   //if (!user_id) return;
    //   if (state.listener && typeof state.listener === 'function') {
    //     state.listener();
    //     state.products.length = 0;
    //   }
    //   state.listener = db()
    //     .collection('instaUsers')
    //     .doc(user_id)
    //     .collection('public')
    //     .onSnapshot((next) => {
    //       next.docChanges().map((change) => {
    //         const { type, oldIndex, newIndex } = change;
    //         const newProduct = change.doc.data() as Product;
    //         // {
    //         //   uid: change.doc.id,
    //         //   link_id: change.doc.get('link_id') as string,
    //         //   payment_id: change.doc.get('payment_id') as string,
    //         //   url: change.doc.get('url') as string,
    //         //   name: change.doc.get('name') as string,
    //         //   description: change.doc.get('description') as string,
    //         //   date: change.doc.get(
    //         //     'date'
    //         //   ) as firebase.default.firestore.Timestamp,
    //         //   price: change.doc.get('price') as number,
    //         //   image: change.doc.get('image') as string,
    //         // }

    //         if (type === 'added') {
    //           console.log('added product');
    //           state.products.splice(newIndex, 0, newProduct);
    //         }
    //         if (type === 'modified') {
    //           console.log('modified product');
    //           state.products.splice(oldIndex, 1);
    //           state.products.splice(newIndex, 0, newProduct);
    //         }
    //         if (type === 'removed') {
    //           state.products.splice(oldIndex, 1);
    //         }
    //       });
    //     });
    // }else{
    //   if (state.listener && typeof state.listener === 'function') {
    //     state.listener();
    //     state.products.length = 0;
    //   }
    //   state.listener = db()
    //     .collection('instaUsers')
    //     .doc('instagram-'+user_id)
    //     .collection('public')
    //     .onSnapshot((next) => {
    //       next.docChanges().map((change) => {
    //         const { type, oldIndex, newIndex } = change;
    //         const newProduct = change.doc.data() as Product;
    //         if (type === 'added') {
    //           console.log('added product');
    //           state.products.splice(newIndex, 0, newProduct);
    //         }
    //         if (type === 'modified') {
    //           console.log('modified product');
    //           state.products.splice(oldIndex, 1);
    //           state.products.splice(newIndex, 0, newProduct);
    //         }
    //         if (type === 'removed') {
    //           state.products.splice(oldIndex, 1);
    //         }
    //       });
    //     });
    // }

    if (!user_id) return;
      if (state.listener && typeof state.listener === 'function') {
        state.listener();
        state.products.length = 0;
      }
      state.listener = db()
        .collection('products')
        .where('user_id', '==', user_id)
        .onSnapshot((next) => {
          next.docChanges().map((change) => {
            const { type, oldIndex, newIndex } = change;
            const newProduct = change.doc.data() as Product;
            if (type === 'added') {
              console.log('added product');
              state.products.splice(newIndex, 0, newProduct);
            }
            if (type === 'modified') {
              console.log('modified product');
              state.products.splice(oldIndex, 1);
              state.products.splice(newIndex, 0, newProduct);
            }
            if (type === 'removed') {
              state.products.splice(oldIndex, 1);
            }
          });
        });
  };

  const listenCatalogueProducts = (user_id: string) => {
    if (!user_id) return;

    if (state.listener && typeof state.listener === 'function') {
      state.listener();
      state.products.length = 0;
    }
    state.listener = db()
      .collection('instaUsers')
      .doc(user_id)
      .collection('catalogue')
      .onSnapshot((next) => {
        next.docChanges().map((change) => {
          const { type, oldIndex, newIndex } = change;
          const newProduct = change.doc.data() as Product;

          if (type === 'added') {
            console.log('added product');
            state.products.splice(newIndex, 0, newProduct);
          }
          if (type === 'modified') {
            console.log('modified product');
            state.products.splice(oldIndex, 1);
            state.products.splice(newIndex, 0, newProduct);
          }
          if (type === 'removed') {
            state.products.splice(oldIndex, 1);
          }
        });
      });
  };

  const getProducts = async (user_id: string) => {
    if (!user_id) return state.products;
    // if (user_id.includes('instagram')){
    //   const productsSnap = await db()
    //     .collection('instaUsers')
    //     .doc(user_id)
    //     .collection('public')
    //     .get();
    //   return productsSnap.docs;
    // }else{
    //   const productsSnap = await db()
    //     .collection('instaUsers')
    //     .doc('instagram-'+user_id)
    //     .collection('public')
    //     .get();
    //   return productsSnap.docs;
    // }
    const productsSnap = await db()
        .collection('products')
        .where('user_id', '==', user_id)
        .get();
    return productsSnap.docs;
  };

  const getInhouseProducts = async () => {
    const productsSnap = await db().collection('products').get();
    state.inhouseProducts = productsSnap.docs.map(
      (doc) => ({ ...doc.data(), uid: doc.id } as Product)
    );
    return productsSnap.docs;
  };
  const getCatalogue = async (user_id: string) => {
    const productsSnap = await db()
      .collection('instaUsers')
      .doc(user_id)
      .collection('catalogue')
      .get();
    return productsSnap.docs;
  };

  const getProductDetail = async (id: string) => {
    const productsSnap = await db()
      .collection('products')
      .where('uid', '==', id)
      .get();
    return productsSnap.docs[0].data();
  };

  const getPrivateeProductDetail = async (id: string) => {
    const productsSnap = await db()
      .collectionGroup('private')
      .where('uid', '==', id)
      .get();
    if(productsSnap.empty){
      const productsSnap = await db()
      .collection('products')
      .where('uid', '==', id)
      .get();
      return productsSnap.docs[0];
    }
    return productsSnap.docs[0];
  };
  const udpateUserProduct = async (user_id: string, product: Product) => {
    console.log('prodct id', product.uid);
    if (user_id) {
      //Update user
      await db()
        .collection('instaUsers')
        .doc(user_id)
        .collection('public')
        .doc(product.uid)
        .set({ ...product }, { merge: true });

      await db()
        .collection('products')
        .doc(product.uid)
        .set({ ...product }, { merge: true });

      state.product = { ...state.product, ...product };
    }
  };
  const deleteUserProduct = async (user_id: string, id: string) => {
    await db()
      .collection('products')
      .where('uid', '==', id)
      .get()
      .then(
        querySnapshot => {
          querySnapshot.forEach(doc => {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            doc.ref.delete();
          })
        }
      )
  };

  const selectProduct = (product: Product) => {
    state.product = product;
  };

  const getProductLink = (product: Product) => {
    if (window.location.hostname.includes('preview')) {
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      return window.location.href + product.uid;
    } else {
      return product.uid ? DOMAIN + product.uid : '';
    }
  };
  const getProductLinkHome = (store: string | undefined, product: Product) => {
    if (window.location.hostname.includes('preview')) {
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      // return window.location.href + store + '/' + product.uid;
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      return window.location.href+ 'link/' + product.uid;
    } else {
      return product.uid ? DOMAIN + product.uid : '';
    }
  };

  const getCatalogueLink = (user_id: string) => {
    const crypt = btoa(user_id);
    return CATALOGUE_DOMAIN + crypt;
  };

  const isTestProduct = (product: Product) => {
    return product.url.indexOf('test') > -1;
  };

  //TODO get private product detail and merge with current one

  return {
    listenProducts,
    getProducts,
    getProductDetail,
    getPrivateeProductDetail,
    selectProduct,
    getProductLink,
    getProductLinkHome,
    getCatalogue,
    listenCatalogueProducts,
    getInhouseProducts,
    getCatalogueLink,
    isTestProduct,
    deleteUserProduct,
    udpateUserProduct,
    ...toRefs(state),
  };
};
