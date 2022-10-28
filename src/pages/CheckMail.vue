<template>
  <q-page class="general-container">
    <div class="header">
      <span class="logo-box">
        <a class="power" href="https://lizzapp.com" target="_blank" style="text-decoration:none; color: white;">
          <img class="logo" alt="Lizza logo" src="icons/lizza.png" />
        </a>
      </span>
    </div>
      <main class="main" style="margin-bottom: 40px;">
        <p class="main-text">Verifica tu correo</p>
        <q-item-label class="text_description">Ingresa el código que enviamos a tu correo</q-item-label>
        <q-item-label class="mail_text">{{emailPassword.email}}</q-item-label>
      </main>
      <div class="authentication">
        <div class="row">
          <q-input
            class="code-number"
            filled
            v-model="code1"
            type="number"
            :input-style="{ textAlign: 'center' }"
            maxlength="1"/>
          <q-input
            class="code-number"
            filled
            v-model="code2"
            type="number"
            :input-style="{ textAlign: 'center' }"
            maxlength="1"/>

          <q-input
            class="code-number"
            filled
            v-model="code3"
            type="number"
            maxlength="1"
            :input-style="{ textAlign: 'center' }"/>
          <q-input
            class="code-number"
            filled
            v-model="code4"
            type="number"
            maxlength="1"
            :input-style="{ textAlign: 'center' }"
            @change="valideCode"/>
        </div>
        <q-btn
        class="btn"
        rounded
        color="primary"
        label="Siguiente"
        style="text-transform:none"
        @click="registerUser"
        :disable="!codeChecked"
        >
        </q-btn>
           <div >
              <q-item-label class="textInfo" >No recibi el codigo.
                <a class="textLink" style="text-decoration:none; cursor: pointer;" @click="reSendMail">Reenviar</a>
              </q-item-label>
              <q-item-label class="textInfo" >¿El correo no es correcto?.
                <a class="textLink" @click="changeEmail" style="text-decoration:none; cursor: pointer; ">Cambiar</a>
              </q-item-label>
          </div>
    </div>
  </q-page>
</template>

<script>
import { ref, computed } from 'vue';
import { useQuasar } from 'quasar';
import { useStore } from 'src/store';
import { useRouter } from 'vue-router';

import Loader from 'src/components/Loader.vue';

import { sendEmail } from '../utils/send-mail.helper';

export default {
  setup () {
    const $q = useQuasar();
    const store = useStore();
    const router = useRouter();
    const code1 = ref(''),
          code2 = ref(''),
          code3 = ref(''),
          code4 = ref(''),
          codeChecked = ref(false);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
    const verificationCodeSended = computed( () => store.getters['registerUser/verificationCode']);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
    const emailPassword = computed( () => store.getters['registerUser/emailPassword'])

    const valideCode = () => {
      const codeWritedUser = `${code1.value}${code2.value}${code3.value}${code4.value}`;
      if(codeWritedUser.length === 4) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if(Number(codeWritedUser) === verificationCodeSended.value) {
          codeChecked.value = true;
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            message: 'Código verificado'
          })
        }else {
          codeChecked.value = false;
          $q.notify({
            color: 'red',
            textColor: 'white',
            message: 'El código no coincide. Verifica e intenta de nuevo'
          })
        }
      }
    }

    const changeEmail = async () => {
      await router.push('/register')
    }
    const registerUser = async () => {
        $q.loading.show({
        spinner: Loader,
        spinnerColor: 'orange',
        spinnerSize: 140,
        backgroundColor: 'white',
        message: 'Generando producto',
        messageColor: 'white',
      });
        $q.loading.hide();
        await router.push('/store-name')
    }

    const reSendMail = async() => {
      try {
        //eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        $q.loading.show({
          spinner: Loader,
          spinnerColor: 'orange',
          spinnerSize: 140,
          backgroundColor: 'white',
          message: 'Generando  ',
          messageColor: 'white',
        });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        await sendEmail(emailPassword.value.email, verificationCodeSended.value);
        $q.notify({
          color: 'green-4',
          textColor: 'white',
          message: 'Código reenviado'
        })
        $q.loading.hide();
      } catch (error) {
        console.log('Error al enviar el correo: ');
      }
    }

    return {
      code1,
      code2,
      code3,
      code4,
      valideCode,
      codeChecked,
      emailPassword,
      changeEmail,
      registerUser,
      reSendMail
    }
  }
}
</script>

<style scoped>

  .header {
    background: #e75935;
    text-align: center;
    margin-bottom: 40px;
    padding-top: 50px;
    position: relative;
    margin-bottom: 80px;
  }

  .logo {
    width: 72px;
    position: relative;
    top: -10px;
  }

  .logo-box {
    width: 30%;
  }

   .code-number{
    font-family: 'Manrope';
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
  }
  .row{
    display: grid;
    grid-template-columns: 60px 60px 60px 60px;
    grid-gap: 10px;
    padding: 2px 0px 0 0px;
    margin-bottom: 20px;
    margin-left: 15px;
  }
  .textInfo{
    font-family: 'Manrope';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 19px;
    display: flex;
    justify-content: center;
  }
  .btn{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 16px;
    gap: 10px;
    width: 100%;
    height: 51px;
    background: #E75935;
    border-radius: 100px;
    flex: none;
    order: 2;
    flex-grow: 0;
    text-transform: none;
    margin-bottom: 30px;
  }
  .authentication{
    height: 64.79px;
    background: #FFFFFF;
    box-shadow: 0px 0px 8px rgb(0 0 0 / 10%);
    border-radius: 100px;
    margin: 30px;
    margin-bottom: 20px;
  }
  .main {
    text-align: center;
  }
  .textLink{
    color: #E75935;
    cursor: pointer;
    font-family: 'Manrope';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 19px;
    }

  .main-text {
    font-family: 'Manrope';
    font-style: normal;
    font-weight: 900;
    font-size: 24px;
    line-height: 33px;
    color: #001E32;
    margin-top: -30px;
  }
  .mail_text{
    font-family: 'Manrope';
    font-style: normal;
    font-weight: 590;
    font-size: 14px;
    line-height: 18px;
    text-align: center;
    color: #E75935;
  }
  .text_description{
    font-family: 'Manrope';
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 18px;
    text-align: center;
    color: #434343;
  }

  @media screen and (min-width: 900px) {

  .main-text {
    font-family: 'Manrope';
    font-style: normal;
    font-weight: 900;
    font-size: 24px;
    line-height: 33px;
    color: #001E32;
    margin-top: -30px;
  }

}
@media (max-width: 600px) {

  .main-text {
    font-family: 'Manrope';
    font-style: normal;
    font-weight: 900;
    font-size: 24px;
    line-height: 33px;
    color: #001E32;
  }
  .text_description{
    font-family: 'Manrope';
    font-style: normal;
    font-weight: 590;
    font-size: 14px;
    line-height: 18px;
    text-align: center;
    color: #434343;
  }
  .authentication{
    height: 64.79px;
    background: #FFFFFF;
    box-shadow: 0px 0px 8px rgb(0 0 0 / 10%);
    border-radius: 100px;
    margin: 30px;
  }
    .header {
    background: #e75935;
    text-align: center;
    margin-bottom: 40px;
    padding-top: 50px;
    position: relative;
    margin-bottom: 80px;
  }
    .code_number{
    font-family: 'Manrope';
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    display: flex;
    align-items: center;
  }
    .row{
    display: grid;
    grid-template-columns: 60px 60px 60px 60px;
    grid-gap: 10px;
    padding: 2px 0px 0 0px;
    margin-bottom: 20px;
    margin-left: 15px;
  }
   .textInfo{
    font-family: 'Manrope';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 19px;
    display: flex;
    justify-content: center;
  }
  .btn{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 16px;
    gap: 10px;
    width: 100%;
    height: 51px;
    background: #E75935;
    border-radius: 100px;
    flex: none;
    order: 2;
    flex-grow: 0;
    text-transform: none;
    margin-bottom: 30px;
  }
}

</style>
