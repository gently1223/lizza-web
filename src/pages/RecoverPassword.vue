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
        <p class="main-text">Recupera tu contraseña </p>
        <p class="main-text-two">Introduce tu correo electrónico para recuperar tu contraseña. Recuerda revisar tu carpeta de Spam.</p>
      </main>
    <div class="form">
      <q-input
        rounded outlined borderless
        v-model="email"
        type="email"
        label="Correo electrónico"
        name="to_name"
        class="q-mb-sm"
        :rules="[
          val => val && val.length > 0 || 'Este campo es obligatorio',
          val => val && val.match(regExprEmail) || 'Debe ser un email válido',
          ]"/>
    <q-btn
        unelevated rounded
        :loading="progress[1].loading"
        :percentage="progress[1].percentage"
        class="full-width"
        label="Recuperar Contraseña"
        padding="16px"
        color="primary"
        text-color="white"
        @click="sendEmail()"
        :disable="!email"
        no-caps/>
    </div>
     <div class="textLink">
        <a @click="redirect">Cancelar</a>
    </div>
    <footer>
      <a class="power" href="https://lizzapp.com" target="_blank" style="text-decoration:none; color: white;">
        <img class="bottom-logo" src="icons/lizza_logo_orange.svg" alt="lizza-foter"/>
      </a>
    </footer>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router';
import { useAuthApi } from 'src/factories/useAuthApi';
import {useQuasar } from 'quasar';

  export default defineComponent({
    setup() {
      const progress = ref([
      { loading: false, percentage: 0 },
      { loading: false, percentage: 0 },
      { loading: false, percentage: 0 }
      ])
      const router = useRouter();
      const email  = ref('');
      const $q = useQuasar();
      const { sendRecoverPasswordEmail } = useAuthApi();
      const intervals = [ null, null, null ]

      const regExprEmail = '^[^@]+@[^@]+\.[a-zA-Z]{2,}$';
      const sendEmail = async () => {
        progress.value[ 1 ].loading = true
          progress.value[ 1 ].percentage = 0

          intervals[ 1 ] = setInterval(() => {
            progress.value[ 1 ].percentage += Math.floor(Math.random() * 8 + 10)
            if (progress.value[ 1 ].percentage >= 100) {
              clearInterval(intervals[ 1 ])
              progress.value[ 1 ].loading = false
            }
          }, 400)
        const my_email = email.value;
        const response = await sendRecoverPasswordEmail(my_email);
        console.log('response',response)
        if (response.emailSent === true) {
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            message: 'Correo enviado exitosamente'
          })
        }else{
          $q.notify({
            color: 'deep-orange',
            textColor: 'white',
            message: 'El usuario no existe, por favor verifica'
          })
        }
      }

      const redirect = async() => {
        await router.push('new-login');
      }
      
      return {
        email,
        regExprEmail,
        isPwd: ref(true),
        red: ref(false),
        progress,
        redirect,
        sendEmail,
      }
    },

  })
</script>

<style scoped>

.header {
    background: #e75935;
    text-align: center;
    margin-bottom: 70px;
    padding-top: 50px;
    position: relative;
}
.logo {
    width: 72px;
    position: relative;
    top: -10px;
}
.logo-box {
    width: 30%;
}
.relative-position {
     position: static; 
}
.textLink{
    font-family: 'Manrope';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    text-decoration-line: underline;
    color: #AAAAAA;
    text-align: center;
    position: relative;
    top: 50px;
}
footer {
   position: fixed;
   left: 0;
   bottom: 0;
   width: 100%;
   text-align: center;
   background: #FFFFFF;
   box-shadow: 0px -2px 8px rgba(0, 0, 0, 0.15);
}
.bottom-logo {
    margin-top: 19px;
    width: 80px;
}
.main {
    text-align: center;
}
.main-text {
    font-family: 'Manrope';
    font-style: normal;
    font-weight: 800;
    font-size: 24px;
    line-height: 45px;
    color: #001E32;
    margin-top: -30px;
}
.form{
    margin: 0 20px 20px 20px;
}
.main-text-two {
    font-family: 'Manrope';
    font-style: normal;
    font-weight: 590;
    font-size: 13px;
    line-height: 18px;
    text-align: center;
    color: #434343;
    margin: -15px 20px 20px 20px;
}
 
@media (max-width: 600px) {
  .main-text {
    font-family: 'Manrope';
    font-style: normal;
    font-weight: 800;
    font-size: 24px;
    line-height: 33px;
    color: #001E32;
  }
  .bottom-logo{
    margin-top: 19px;
    width: 80px;
  }
  .relative-position {
     position: static; 
  }
  .header {
    background: #e75935;
    text-align: center;
    margin-bottom: 70px;
    padding-top: 50px;
    position: relative;
  }
  .main-text-two {
    font-family: 'Manrope';
    font-style: normal;
    font-weight: 590;
    font-size: 13px;
    line-height: 18px;
    text-align: center;
    color: #434343;
    margin: -15px 20px 20px 20px;
  }
  .form{
    margin: 0 20px 20px 20px;
  }
  .textLink{
    font-family: 'Manrope';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    text-decoration-line: underline;
    color: #AAAAAA;
    text-align: center;
    position: relative;
    top: 50px;
  }
  footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 50px;
    color: white;
    text-align: center;
    background: #FFFFFF;
    box-shadow: 0px -2px 8px rgba(0, 0, 0, 0.15);
  } 
}

</style>
