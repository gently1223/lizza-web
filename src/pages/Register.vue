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
        class="q-mb-sm color-in-text"
        :rules="[
          val => val && val.length > 0 || 'Este campo es obligatorio',
          val => val && val.match(regExprEmail) || 'Debe ser un email válido',
          ]"
      />
      <q-input
        class="q-mb-sm color-in-text"
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
         <q-input
        class="q-mb-sm color-in-text"
        rounded outlined
        v-model="password2"
        label="Confirma contraseña"
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
      <q-btn
        class="full-width"
        label="Registrarme"
        padding="12px 125px"
        unelevated rounded
        color="primary"
        text-color="white"
        @click="registerUser"
        :disable="!email || password.length < 6"
        no-caps/>
    </div>

    <footer class="footer">
      <div class="privacy-policy">
        <p>Al registrarme acepto la <a target="_blank" class="orange" href="https://lizzapp.com/index.php/politica-de-privacidad/">Política de Privacidad</a><a target="_blank" class="orange" href="https://lizzapp.com/index.php/condiciones-de-uso/">, Términos y Condiciones</a> , que México es mi ubicación actual y la moneda local se aplicará.</p>
      </div>
      <div class="have-account">
        <p>¿Ya tienes cuenta? <span class="orange" @click="toLogin">Ingresa aquí</span></p>
      </div>
    </footer>
  </q-page>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useQuasar } from 'quasar';
  import { useRouter } from 'vue-router';
  import { useStore } from 'src/store';

  import Loader from 'src/components/Loader.vue';
  import { codeVerification } from '../utils/code-verification.helper'
  import { useAuthApi } from 'src/factories/useAuthApi';

  import { sendEmail } from '../utils/send-mail.helper';

  export default defineComponent({
    setup() {
      const $q = useQuasar();
      const router = useRouter();
      const store = useStore();
      const { emailExists } = useAuthApi();
      const email  = ref('');
      const  password = ref('');
      const  password2 = ref('');
      const codeVerificationSended = codeVerification();
      const regExprEmail = '^[^@]+@[^@]+\.[a-zA-Z]{2,}$';

      const registerUser = async () => {
        if (password.value != password2.value) {
          $q.notify({
            color: 'deep-orange',
            textColor: 'white',
            message: 'Las contraseñas no coinciden, por favor verifica'
          })
        }else{
        $q.loading.show({
          spinner: Loader,
          spinnerColor: 'orange',
          spinnerSize: 140,
          backgroundColor: 'white',
          message: 'Generando  ',
          messageColor: 'white',
        });
        try {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const isEmailExists =  await emailExists(email.value);
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          if(!isEmailExists.exists){
            await sendEmailToUser();
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            store.commit('registerUser/setEmailPassw', {email: email.value, password: password.value});
            store.commit('registerUser/setVerificationCode', codeVerificationSended);

            await router.push('/check-mail');
            $q.loading.hide();


          }else{
            $q.loading.hide();
            $q.notify({
              color: 'green-4',
              textColor: 'white',
              message: 'Tu correo ya está registrado. Inicia sesión por favor.',
            });
          }
        } catch (error) {

        }
      }
    }

      const toLogin = async ()=> {
        await router.push('/new-login');
      }

      const sendEmailToUser = async () => {
        try {
          await sendEmail(email.value, codeVerificationSended);
        } catch (error) {
          console.log('Error al enviar el correo: ', error);
        }

      }
      return {
        email,
        regExprEmail,
        password,
        password2,
        isPwd: ref(true),
        registerUser,
        toLogin
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

  .color-in-text {
    color: #e75935;
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
    font-family: 'Manrope';
    font-style: normal;
    font-weight: 600;
    font-size: 11px;
    line-height: 14px;
    text-align: center;
    top: -90px;
    position: relative;
    margin: 10px;
  }
  .have-account {
    font-size: 12px;
    position: relative;
    top: -50px;
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

</style>
