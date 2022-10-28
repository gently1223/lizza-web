import { boot } from 'quasar/wrappers';
// import { useAuthApi } from 'src/factories/useAuthApi';

export default boot(async () => {
  // const { linkAccount } = useAuthApi();

  await new Promise((resolve) => {
    // wait for facebook sdk to initialize before starting the vue app
    window.fbAsyncInit = function () {
      FB.init({
        appId: '514616313217695',
        cookie: true,
        xfbml: true,
        version: 'v13.0',
      });
      resolve(true);
    };

    // load facebook sdk script
    (function (d, s, id) {
      const js: HTMLScriptElement = d.createElement(s) as HTMLScriptElement,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js.id = id;
      js.src =
        'https://connect.facebook.net/es_ES/sdk.js?scope=public_profile,email';
      fjs.parentNode?.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  });
});
