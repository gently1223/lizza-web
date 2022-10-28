import { isLoggedIn, isInstagramRedirect } from 'src/guards/auth';
import { hasCatalogue, hasProducts, userMiddleware } from 'src/guards/user';
// import { hasCatalogue, userMiddleware } from 'src/guards/user';
import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter: [isLoggedIn, userMiddleware],
    children: [
      {
        path: '',
        beforeEnter: [hasProducts,isLoggedIn],
        component: () => import('src/pages/Home.vue'),
      },
      {
        path: 'posts',
        name: 'PostList',
        beforeEnter: isLoggedIn,
        component: () => import('src/pages/Articles.vue'),
      },
      {
        path: 'demo',
        name: 'Onboarding',
        component: () => import('src/pages/Onboarding.vue'),
      },
      {
        path: 'create-product-options',
        name: 'CreateProductOptions',
        beforeEnter: isLoggedIn,
        component: () => import('src/pages/CreateProductOptions.vue'),
      },
      {
        path: 'sample',
        name: 'Sample',
        component: () => import('src/pages/Sample.vue'),
      },
      {
        path: 'event',
        name: 'Event',
        component: () => import('src/pages/Event.vue'),
      },
      {
        path: 'product',
        name: 'ProductForm',
        component: () => import('src/pages/Product.vue'),
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('src/pages/Dashboard.vue'),
      },
      {
        path: 'clientinfo',
        name: 'ClientInfo',
        component: () => import('src/pages/ClientInfo.vue'),
      },
      {
        path: 'products',
        name: 'ProductList',
        component: () => import('src/pages/ProductList.vue'),
      },
      {
        path: 'detail',
        name: 'ProductDetail',
        beforeEnter: isLoggedIn,
        component: () => import('src/pages/ProductDetail.vue'),
        props: true,
      },
      {
        path: 'detail-dimensions',
        name: 'ProductDetailDimensions',
        beforeEnter: isLoggedIn,
        component: () => import('src/pages/ProductDetailDimensions.vue'),
        props: true,
      },
      {
        path: 'settings',
        name: 'Settings',
        beforeEnter: isLoggedIn,
        component: () => import('src/pages/Settings.vue'),
      },
      {
        path: 'password-store-change',
        name: 'passwordStore',
        beforeEnter: isLoggedIn,
        component: () => import('src/pages/ChangePasswordStore.vue'),
      },
      {
        path: 'orderSummary',
        name: 'orderSummary',
        // beforeEnter: isLoggedIn,
        component: () => import('src/pages/orderSummary.vue'),
      },
      {
        path: 'payments',
        name: 'Payments',
        beforeEnter: isLoggedIn,
        component: () => import('src/pages/Payments.vue'),
      },
      {
        path: 'chats',
        component: () => import('pages/Chats.vue')
      },
      {
        path: 'chats/:id',
        component: () => import('pages/ChatDetails.vue')
      },
    ],
  },
  //Routes for register user
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/new-login',
    name: 'NewLoguin',
    component: () => import('src/pages/NewLoguin.vue'),
  },
  {
    path: '/check-mail',
    name: 'CheckMail',
    component: () => import('src/pages/CheckMail.vue'),
  },
  {
    path: '/store-name',
    name: 'StoreName',
    component: () => import('src/pages/StoreName.vue'),
  },
  {
    path: '/recover-password',
    name: 'RecoverPassword',
    component: () => import('src/pages/RecoverPassword.vue'),
  },
  {
    path: '/change-password',
    name: 'ChangePassword',
    component: () => import('src/pages/ChangePassword.vue'),
  },

  //Wholesale user to create catalogue from our own products
  {
    path: '/wholesale',
    name: 'Wholesale',
    component: () => import('layouts/MainLayout.vue'),
    //TODO isloggedin and has catalogue
    beforeEnter: [isLoggedIn, userMiddleware],
    children: [
      {
        path: '',
        beforeEnter: hasCatalogue,
        component: () => import('src/pages/wholesale/Home.vue'),
      },
      {
        path: 'articles',
        component: () => import('src/pages/wholesale/Articles.vue'),
      },
      {
        path: 'product',
        component: () => import('src/pages/wholesale/Product.vue'),
      },
    ],
  },
  //Public wholesale catalogue
  {
    path: '/catalogue/:id',
    name: 'Catalogue',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/pages/catalogue/Home.vue'),
      },
    ],
  },
  //Public seller catalogue
  {
    path: '/:id',
    name: 'Products',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/pages/Seller.vue'),
      },
      {
        path: 'arcus',
        name: 'LocalPayment',
        component: () => import('src/pages/Arcus.vue'),
      },
    ],
  },

  {
    path: '/choice',
    beforeEnter: isLoggedIn,
    component: () => import('src/pages/Choice.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('src/pages/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('src/pages/Register.vue'),
  },
  {
    path: '/password',
    name: 'Password',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // {
      //   path: 'validate',
      //   name: 'Validate Code',
      //   component: () => import('src/pages/ValidateCode.vue'),
      // },
    ],
  },
  {
    path: '/insta',
    name: 'InstagramLink',
    beforeEnter: isInstagramRedirect,
    component: () => import('src/pages/Instagram.vue'),
  },
  {
    path: '/auth',
    name: 'InstagramAuthRedirect',
    component: () => import('src/pages/InstagramAuth.vue'),
  },
  {
    path: '/link/:link_id',
    name: 'PaymentLink',
    component: () => import('src/pages/Link.vue'),
  },
  {
    path: '/error/facebook',
    component: () => import('pages/ErrorFacebook.vue'),
  },
  {
    path: '/underconstruction',
    component: () => import('pages/UnderConstruction.vue'),
  },
  {
    path: '/datos-envio',
    component: () => import('pages/DatosEnvio.vue'),
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
  {
    path: '/error500',
    component: () => import('pages/Error500.vue')
  },
];

export default routes;
