import { RouteLocationNormalized, NavigationGuard } from 'vue-router';
import { useAuthApi } from 'src/factories/useAuthApi';


export const isLoggedIn: NavigationGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next
) => {
  const { isLoggedIn } = useAuthApi();
  const logged = isLoggedIn();
  if (process.env.DEV || window.location.pathname == '/event' || logged) {
    next();
  } else {
    next({ path: '/login' });
  }
};

export const isInstagramRedirect: NavigationGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next
) => {
  //if is not facebook format then redirect to login
  const { checkFacebookStatus } = useAuthApi();
  const authResponse = await checkFacebookStatus();
  if (authResponse && authResponse.accessToken) {
    next();
  } else {
    next({ path: '/login' });
  }
  //   next();
};
