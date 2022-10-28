<template>
  <q-page class="container">
    <div class="header">
      <span class="logo-box">
        <a href="https://lizzapp.com" target="_blank">
          <img class="logo" alt="Lizza logo" src="icons/lizza.png" />
        </a>
      </span>
    </div>
    <div class="slider">
      <div class="slider-text">
        <span class="slider-text-1 desktop">
          Vende en redes,
          <span class="slider-text-2"> sin rollos </span></span>

      </div>

      <div class="slider-text">
        <span class="slider-text-1 mobile">
          Vende en redes,<br class="mobile" />
          <span class="slider-text-2"> sin rollos </span></span>
          <div class="div-text-description">
            <p class="text-description">
              La plataforma para quienes venden en redes sociales. <br> Acepta pagos con tarjeta y efectivo, gestiona tus mensajes, tus pedidos y mucho más en un sólo lugar.
            </p>
          </div>
      </div>



      <div class="custom-shape">
        <svg data-name="Layer 1" viewBox="0 0 1200 120" preserveAspectRatio="none" data-v-304bf8e6="">
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            class="shape-fill" data-v-304bf8e6=""></path>
        </svg>
      </div>
    </div>


    <div class="column text-center q-mt-xl fb-mobile">
      <!-- <div>
        <q-btn
          @click="handleLogin"
          size="md"
          icon="mdi-email"
          label="Registrate con email"
        >
        </q-btn>
      </div>
      O -->
      <div class="tf-flex" >
        <!-- <q-btn
          @click="handleLogin"
        > -->
        <q-btn
          class="q-mb-lg"
          label="Iniciar sesión"
          padding="12px 125px"
          unelevated rounded
          color="primary"
          text-color="white"
          @click="login"
          no-caps/>

          <q-btn
          class="shadow-2 register"
          label="Registrate"
          padding="12px 135px"
          unelevated rounded
          color="white"
          text-color="grey"
          @click="toRegister"
          no-caps/>
        <!-- <q-btn
          @click="handleTelefone"
          color="white"
          size="md"
          class="tf-btn text-black tf-size "
          label="Ingresar con mi teléfono"
        >
        </q-btn> -->
      </div>
    </div>



    <footer class="">
      <span class="powered">Powered by</span>
      <a href="https://lizzapp.com" target="_blank">
        <img class="bottom-logo" src="icons/lizza_logo_orange.svg" />
      </a>
    </footer>
  </q-page>
</template>

<script>
import { onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthApi } from 'src/factories/useAuthApi';
import { useQuasar } from 'quasar';
import { analytics } from 'boot/firebase';
import Loader from 'src/components/Loader.vue';

export default {
  components: {
      // eslint-disable-next-line vue/no-unused-components
      Loader
    },
  setup() {
    const $q = useQuasar();
    const {
      loginWithInstagram,
      loginWithFacebook,
      checkFacebookStatus,
      isLoggedIn,
      loginWithGoogle,
      // linkAccount,
    } = useAuthApi();
    const router = useRouter();
    const handleLogin = async () => {
      // analytics.logEvent('fb_login_click');
      // const authResponse = await loginWithFacebook();
      // if (authResponse && authResponse.accessToken) {
      //   // await router.push('/');
      //   //Link insta account
      //   // loginWithInstagram();
      //   analytics.logEvent('fb_login_response', { success: true });

      //   await router.push('/insta');
      // } else {
      //   analytics.logEvent('fb_login_response', { success: false });
      // }
      await router.push('/new-login');
    };

    const handleTelefone = async () => {
     analytics.logEvent('telefone_login_click');
      await router.push('/underconstruction');
    };

    const login = async() => {
      await router.push('/new-login');
    }
    const devLogin = async () => {
      await loginWithGoogle();
      await router.push('/');
    };

    const isDev = computed(() => {
      return window.location.port === '8080';
    });

    const toRegister = async () => {
      await router.push('/register');
    }

    onMounted(async () => {
      if (isLoggedIn()) {
        analytics.logEvent('logged_in');
        await router.push('/create-product-options');
      }
      // else {
      //   analytics.logEvent('fb_login_auto');
      //   $q.loading.show({
      //     spinner: Loader,
      //     spinnerColor: 'white',
      //     spinnerSize: 140,
      //     backgroundColor: 'black',
      //   });
      //   const authResult = await checkFacebookStatus();
      //   //Link account and show loading till redirect
      //   if (authResult && authResult.accessToken) {
      //     // await linkAccount(authResult.accessToken, authResult.userID);
      //     // console.log('after link account');
      //     // Show popup asking to link insta account or just link account without asking
      //     // loginWithInstagram();
      //     analytics.logEvent('fb_login_response', { success: true });

      //     await router.push('/insta');
      //   } else {
      //     analytics.logEvent('fb_login_response', { success: false });
      //   }
      //   $q.loading.hide();
      // }
    });
    return {
      loginWithInstagram,
      loginWithFacebook,
      handleLogin,
      handleTelefone,
      devLogin,
      isDev,
      toRegister,
      login
    };
  },
};
</script>

<style lang="scss" scoped>
  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #e75935;
    height: 60px;
    text-align: center;
  }
  .powered {
    font-size: 12px;
    color: grey;
    margin-right: 10px;
  }
  .register {
    margin-bottom: 230px;
  }
  .div-text-description{
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    text-align: center;
    position: relative;
    display: flex;
    flex-direction: column;
    display: flex !important;
    margin: 0 auto;
  }
  .text-description{
    // width: 331px;
    // height: 76px;
    width: 627px;
    height: 93px;
    text-align: center;
    font-family: 'Manrope';
    font-style: normal;
    color: #AAAAAA;
    display:flex;
    justify-self: center;
    align-items: center;
    margin-top: 160px;
    padding: 30px;;
    font-weight: 500;
    font-size: 18px;
    line-height: 31px;
  }
  .tf-flex {
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items: center;
  }
@media (max-width: 600px) {
  .text-description{
    width: 331px;
    height: 76px;

    font-family: 'Manrope';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 19px;
    text-align: center;
    /* Grey 3 - Caption Text */
    color: #AAAAAA;
    /* Inside auto layout */
    flex: none;
    order: 0;
    flex-grow: 1;
    margin-top: 10px;
  }

  .tf-flex {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items: center;
  }
  .texto_check {
    font-size: 14px !important;
    margin-bottom: 0px !important;
  }

  .fb-mobile {
    margin-top: 220px;

  }

  .fb-size {
    width: 314px !important;
    height: 50px !important;
    font-size: 12px !important;
    text-transform: none;

  }
  .tf-size {
    width: 314px !important;
    height: 50px !important;
    background-color: white !important;
    border-radius: 14px;
    font-size: 12px !important;
    color: #848484 !important;
    text-transform: none;
  }

  .chk_padding {
    padding-right: 0px !important;
    padding-left: 15px !important;
  }

  .ttc {
    padding: 10px 0px !important;
  }

  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #e75935;
    height: 60px;
    text-align: center;
  }

  .logo {
    height: 16px;
    width: 72px;
    margin: 20px 15px;
  }

  .logo-box {
    width: 30%;
  }

  .text-box {
    width: 70%;
    height: 60px;
    float: right;
  }

  .logo-text {
    text-align: right;
    margin: 20px 15px;
    font-size: 16px;
    color: white;
  }
}

@media (min-width: 600px) {
  .fb-size {
    width: 396px !important;
    height: 63px !important;
    background-color: #4267b2 !important;
    border-radius: 14px;
    font-size: 16px !important;
    text-transform: none;
  }
  .tf-size {
    width: 396px !important;
    height: 63px !important;
    background-color: white !important;
    border-radius: 14px;
    color: #848484 !important;
    font-weight: 600;
    font-size: 16px !important;
    text-transform: none;
  }


  .tf-flex {
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items: center;
  }

  .chk_padding {
    padding-right: 0px !important;
    padding-left: 15px !important;
  }

  .ttc {
    padding: 10px 0px !important;
  }

  .header {
    display: flex;
    background: #e75935;
    height: 60px;
    text-align: center;
  }

  .logo {
    height: 30px;
    width: 136px;
    margin: 15px 50px;
  }

  .logo-box {
    width: 50%;
  }

  .text-box {
    width: 50%;
    height: 60px;
    float: right;
  }

  .logo-text {
    text-align: right;
    margin: 18px 50px;
    font-size: 20px;
    color: white;
  }
}

@media (max-width: 600px) {
  .slider {
    background-image: url('../../public/images/header.png');
    height: 190px;
    background-size: cover;
    position: relative;
  }

  .slider-text {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 100%;
    text-align: center;
  }

  .slider-text-1 {
    color: black;
    font-size: 36px;
    margin-top: 200px;
  }

  .slider-text-2 {
    color: white;
    background: #e75935;
    font-size: 36px;
    padding: 0px 5px;
  }
}

@media (min-width: 600px) {
  .slider {
    background-image: url('../../public/images/header.png');
    height: 400px;
    background-size: cover;
    position: relative;
  }

  .slider-text {
    display: flex !important;

    justify-content: space-around;
  }

  .slider-text-1 {
    color: white;
    font-size: 48px;
    margin-top: 200px;
  }

  .slider-text-2 {
    color: white;
    background: #e75935;
    font-size: 48px;
  }
}

.custom-shape {
  bottom: 0;
  left: 0;
  line-height: 0;
  overflow: hidden;
  position: absolute;
  transform: rotate3d(1, 0, 0, 180deg);
  width: 100%;
  margin-bottom: -1px;
  margin-top: -1px;
}

.custom-shape svg {
  display: block;
  height: 87px;
  position: relative;
  width: calc(148% + 1.3px);
}

svg:not(:root) {
  overflow: hidden;
}

.custom-shape .shape-fill {
  fill: #fff;
}

.cabecera_img {
  position: relative;
  max-height: 60vh;
  height: 80vw;
  background-image: url(/login.png);
  background-size: cover;
}

.div_footer {
  margin-bottom: 2em;
}

.titulo {
  top: 0px;
  padding-left: 1em;
  padding-right: 1em;
  text-align: center;

  font-family: Manrope;
  font-style: normal;
  font-weight: 600;
  font-size: 25px;
  line-height: 28px;
  /* or 140% */

  margin-bottom: 3em;
  color: #001e32;
}

.texto_check {
  top: 0px;
  text-align: left;

  padding-left: 1em;
  padding-right: 1em;
  font-family: Manrope;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 28px;
  /* or 140% */

  margin-bottom: 3em;
  color: #001e32;
}

.insta-btn {
  background: linear-gradient(90deg,
      #df9440 -0.5%,
      #9f399e 46.32%,
      #6027d6 100.5%);
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  width: 25em;
  height: 4em;
  margin-bottom: 5em;
}

body {
  margin: 0px !important;
}

@media (min-width: 600px) {
  .desktop {
    display: block !important;
  }

  .mobile {
    display: none !important;
  }
}

@media (max-width: 600px) {
  .desktop {
    display: none !important;
  }

  .mobile {
    display: block !important;
  }
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

footer {
  text-align: center;
  margin-bottom: 40px;
}

ft-bottom {
  bottom: 40px !important;
}

.bottom-logo {
  height: 13px;
  width: 59px;
}

#tnc {
  margin-left: -15px;
}

.orange {
  color: #e75935;
}

svg.fb {
  padding: 15px;
}

.inner-container-text {
  margin-top: 75px;
}

@media (max-width: 600px) {
  .inner-container {
    width: 100% !important;
  }

  .inner-container-text {
    margin-left: 5%;
    margin-top: 50px !important;
  }

  .fb-button {
    padding: 20px 40px !important;
    height: 50px !important;
    width: 314px !important;
    font-size: 16px !important;
    background: #3b5998;
    color: white;
  }

  .inner-container {
    width: 40%;
    margin: 0px auto !important;
  }

  footer {
    text-align: center;
    // margin-top: 50px !important;
    margin-bottom: 20px;
  }
}

.inner-container {
  width: 50%;
  margin: -40px auto 10px auto;
}

.fb-button {
  border-radius: 12px;
  margin: auto;
  display: flex;
  align-items: center;
  padding: 20px 70px;
  height: 63px;
  width: 396px;
  font-size: 20px;
  background: #3b5998;
  color: white;
}

</style>
