<template>
  <q-page>
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
      </div>

      <div class="custom-shape">
        <svg data-name="Layer 1" viewBox="0 0 1200 120" preserveAspectRatio="none" data-v-304bf8e6="">
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            class="shape-fill" data-v-304bf8e6=""></path>
        </svg>
      </div>
    </div>

    <div class="form">
      <q-input
        rounded outlined borderless
        type="email"
        v-model="email"
        label="Correo electrónico"
        class="q-mb-sm"
        :rules="[
          val => val && val.length > 0 || 'Este campo es obligatorio',
          val => val && val.match(regExprEmail) || 'Debe ser un email válido',
          ]"
      />
      <q-input
        class="q-mb-lg"
        rounded outlined
        v-model="password"
        label="Contraseña"
        :type="isPwd ? 'password' : 'text'"
        :rules="[
          val => val && val.length > 0 || 'Este campo es obligatorio',
          val => val && val.length >= 6 || 'Este campo debe ser mínimo de 6 digitos  '
        ]"
        >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <div class="rememberme-forgetpassw">
        <q-checkbox  v-model="red" label="Recuérdame" color="#e75935" />
        <p class="orange" @click="toChangePassword">¿Olvidaste tu constraseña?</p>
      </div>
      <q-btn
        class="full-width"
        label="Iniciar sesión"
        padding="12px 125px"
        unelevated rounded
        color="primary"
        text-color="white"
        @click="logIn"
        :disable="!email || !password"
        no-caps/>
    </div>

    <footer class="footer">
      <div class="have-account">
        <p>¿No tienes cuenta? <span @click="toRegister" class="orange-register">Registrate aquí</span></p>
      </div>
    </footer>
  </q-page>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useQuasar } from 'quasar';
  import { useAuthApi } from 'src/factories/useAuthApi';
  import { useStore } from 'src/store';

  export default defineComponent({
    setup() {
      const email  = ref('');
      const password = ref('');
      const regExprEmail = '^[^@]+@[^@]+\.[a-zA-Z]{2,}$';
      const router = useRouter();
      const store = useStore();
      const $q = useQuasar();

      const { loginWithMailAndPass } = useAuthApi();

      const toRegister = async ()=> {
        await router.push('/register');
      }

      const toChangePassword = async ()=> {
        await router.push('/recover-password');
      }

      const logIn = async () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const rtaLogin = await loginWithMailAndPass(email.value, password.value);
        console.log('Respuesta del proceso del Loggin: ', rtaLogin);
        if(rtaLogin?.isLoggedIn) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          store.commit('loginUser/setEmailPassw', {email: email.value, password: password.value});
          store.commit('loginUser/setIsLogged', true);
          await router.push('/create-product-options');
        }else {
          $q.notify({
            color: 'red',
            textColor: 'white',
            message: 'Usuario o contraseña erroneos. Por favor verifica'
          })
        }
      }

      return {
        email,
        regExprEmail,
        password,
        isPwd: ref(true),
        red: ref(false),
        toRegister,
        logIn,
        toChangePassword
      }
    },

  })
  </script>

<style lang="scss" scoped>
  .form {
    margin-top: 140px;
    margin-bottom: 140px;
    padding: 2px 25px;
  }

  .footer {
    text-align: center;
    padding: 2px 25px;
    font-weight: 500;
    display: flex;
    flex-direction: column;
    justify-content: end;
    padding-bottom: 15px;

  }
  .privacy-policy {
    font-size: 10px;

  }
  .have-account {
    font-size: 12px;
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

  .orange {
    color: #e75935;
    text-decoration: none;
    top: 12px !important;
    position: relative;
  }
  .orange-register{
    color: #e75935;
    text-decoration: none;
  }
  .header {
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

  .slider {
    background-image: url('../../public/images/header.png');
    height: 190px;
    background-size: cover;
    position: relative;
  }

  .slider-text {
    display: flex;
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

  .desktop {
    display: none !important;
  }

  .mobile {
    display: block !important;
  }

  .rememberme-forgetpassw {
    display: flex;
    font-size: 11px;
    font-weight: 600;
    font-family: monospace;
    justify-content: space-around;
    top: -20px;
    position: relative;
  }
</style>
