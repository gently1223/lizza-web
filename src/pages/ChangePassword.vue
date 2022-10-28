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
        <p class="main-text">Crea una contraseña segura</p>
        <p class="main-text-two">Introduce tu nueva contraseña para ingresar a Lizza</p>
      </main>
    <div class="form">
      <q-input
        class="q-mb-md"
        rounded outlined
        v-model="password"
        label="Contraseña"
        :type="isPwd ? 'password' : 'text'"
        :rules="[
          val => val && val.length > 0 || 'Este campo es obligatorio',
          val => val && val.length >= 6 || 'Este campo debe ser mínimo de 6 digitos  '
        ]" >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <q-input
        class="q-mb-md"
        rounded outlined
        v-model="password2"
        label="Confirmar contraseña"
        :type="isPwd ? 'password' : 'text'"
        :rules="[
          val => val && val.length > 0 || 'Este campo es obligatorio',
          val => val && val.length >= 6 || 'Este campo debe ser mínimo de 6 digitos  '
        ]" >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
    <q-btn
        unelevated rounded
        class="full-width"
        label="Restablecer contraseña"
        padding="16px"
        color="primary"
        text-color="white"
        @click="ChangePassword"
        :disable="!password || !password2 || password !== password2"
        no-caps/>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import PasswordUpdate from 'src/components/dialogs/PasswordUpdate.vue';
import { useAuthApi } from 'src/factories/useAuthApi';

  export default defineComponent({
    setup() {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const router = useRouter();
      const $q = useQuasar();
      let password = ref(''), password2= ref('')
      const { confirmPasswordReset } = useAuthApi();

      const ChangePassword = async () => {
        const params = new URLSearchParams(window.location.search)
        const obCode = params.get('oobCode')
        console.log(params.get('oobCode'));
        const newPassword = password2.value;
        const response = await confirmPasswordReset(obCode, newPassword);
        console.log('response', response)
        $q.dialog({
            component: PasswordUpdate,
            componentProps: {
            title: 'EXITOSO',
            message: 'La contraseña ha sido actualizada exitosamente, por favor, ingresa de nuevo.'
            },
          }).onOk((result) => {
            router.push('/new-login').catch(() => console.log('Vamos! = ', result));
        });
      }
      return {
        password,
        password2,
        isPwd: ref(true),
        ChangePassword
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

.main {
    text-align: center;
}
.main-text {
    font-family: 'Manrope';
    font-style: normal;
    font-weight: 900;
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
    font-weight: 900;
    font-size: 24px;
    line-height: 33px;
    color: #001E32;
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

}

</style>
