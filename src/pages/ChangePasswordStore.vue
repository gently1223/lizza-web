<template>
    <q-toolbar class="shadow-1">
      <q-btn flat round color="grey" icon="arrow_back" to="/datos-envio" />
      <q-toolbar-title class="text-center">
        <span class="text-primary text-bold">Cambiar contraseña</span>
      </q-toolbar-title>
      <div class="icons" style="display: flex; justify-content: space-around; width:10%; margin-right: 40px">
      </div>
    </q-toolbar>
    <div class="form">
        <q-card class="my-card">
            <q-card-section>
                <q-input
                    class="q-mb-lg"
                    rounded outlined
                    v-model="passwordAfter"
                    label="Contraseña anterior"
                    :type="isPwd ? 'password' : 'text'"
                    :rules="[
                    val => val && val.length > 0 || 'Este campo es obligatorio',
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
                    class="q-mb-lg"
                    rounded outlined
                    v-model="password"
                    label="Contraseña nueva"
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
                    class="q-mb-lg"
                    rounded outlined
                    v-model="password2"
                    label="Confirmar contraseña nueva"
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
            </q-card-section>
        </q-card>
    </div>
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
      let password = ref(''), password2 = ref(''), passwordAfter = ref('')
      const { confirmPasswordReset } = useAuthApi();

      const ChangePassword = async () => {
        if (password.value != password2.value) {
          $q.notify({
            color: 'deep-orange',
            textColor: 'white',
            message: 'Las contraseñas no coinciden, por favor verifica'
          })
        }else{
        const params = new URLSearchParams(window.location.search)
        const obCode = params.get('oobCode')
        console.log(params.get('oobCode'));
        const newPassword = password2.value;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
    }
      return {
        password,
        password2,
        passwordAfter,
        isPwd: ref(true),
        red: ref(false),
        ChangePassword
      }
    }
  })
</script>

<style lang="scss" scoped>
.shadow-1 {
  width: 100%;
  height: 80px;
  left: 0px;
  margin-bottom: 10px;
  top: 0px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
}
.form {
  height: 85vh;
  overflow-y: scroll;
  padding: 0px 5px;
  margin: 0px 10px;
}
@media (max-width: 600px) {

}
</style>