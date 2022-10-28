import { RouteLocationNormalized, NavigationGuard } from 'vue-router';
import { useAuthApi } from 'src/factories/useAuthApi';
import { useProductApi } from 'src/factories/useProductApi';
import { useUserApi } from 'src/factories/useUserApi';

export const userMiddleware: NavigationGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next
) => {
  //Make this the middleware of seller / wholesale
  if (process.env.DEV) {
    next();
  } else {
    const { userId } = useAuthApi();
    const { getUser, user } = useUserApi();

    if (!user.value?.username) {
      //Get user data
      await getUser(userId.value);
    }
    //if try to access wholesale, check if the user really is wholesale
    // if (to.path.startsWith('/wholesale')) {
    //   if (user.value?.type === 'wholesale') {
    //     next();
    //   } else {
    //     //if not wholesale and trying to accesing then redirect to home
    //     next({ path: '/' });
    //   }
    // } else {
    //   //if user wholesale but try to accesss any other place, redirect to wholesale
    //   if (user.value?.type === 'wholesale') {
    //     next({ path: '/wholesale' });
    //   } else {
    //     //keep the flow
    //     next();
    //   }
    // }
    next();
  }
};

export const hasCatalogue: NavigationGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next
) => {
  //get products and await for them if not then redirec to articles
  const { getCatalogue, listenCatalogueProducts } = useProductApi();
  const { userId } = useAuthApi();

  const catProducts = await getCatalogue(userId.value);
  if (catProducts.length > 0) {
    listenCatalogueProducts(userId.value);

    console.log('going to next router', to.path);
    next();
  } else {
    next({ path: '/wholesale/articles' });
  }
};

export const hasProducts: NavigationGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next
) => {
  //get products and await for them if not then redirec to articles
  const { getProducts, listenProducts } = useProductApi();
  const { userId } = useAuthApi();

  const products = await getProducts(userId.value);
  listenProducts(userId.value);
  if (products.length > 0) {
    console.log('going to next router', to.path);
    next();
  } else {
    // next({ path: '/dashboard' });
    // next({ path: '/demo' });
    console.error('Has not products but going to next router', to.path);
    next();
  }
};
