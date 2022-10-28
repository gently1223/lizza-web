<template>
  <q-page v-if="userForm" class="q-pa-md container-page">
    <q-page-sticky position="bottom-right" :offset="[40, 120]" style="z-index: 1">
      <q-btn v-if="changed" round color="primary" icon="done" @click="save" />
    </q-page-sticky>
    <p class="text-caption text-center">
     Mi cuenta
    </p>
    <q-card class="q-my-md contact">
     <div @click="(e) => { save; if(e.target !== e.currentTarget){ expanded1 = !expanded1} }">
      <q-card-actions class="headings">
        <q-card-section>
            <div class="text-h6">Datos de contacto</div>
        </q-card-section>
        <q-btn
          color="grey"
          round
          flat
          dense
          class="dropdown"
          :icon="expanded1 ? 'keyboard_arrow_down' : 'keyboard_arrow_right'"
        />
      </q-card-actions>
      </div>
      <q-slide-transition>
        <div v-show="expanded1">
         <div class="row contact-input">
      <q-card-section class="input-area">
        <q-input prefix="+52 |"
          class="q-mb-md c-input"
          rounded
          outlined
          label="Número de teléfono"
          v-model="userForm.phone"
        />
      </q-card-section>
      <q-card-section class="input-area">
        <q-input
          class="q-mb-md c-input"
          rounded
          outlined
          label="Email"
          v-model="userForm.email"
        />

      </q-card-section>
      </div>
        </div>
      </q-slide-transition>
    </q-card>
    <q-card class="q-my-md socials" >
    <div @click="(e) => {  if(e.target !== e.currentTarget){ expanded2 = !expanded2} }">
    <q-card-actions class="headings">
        <q-card-section>
            <div class="text-h6">Redes sociales</div>
          </q-card-section>
          <q-btn
          color="grey"
          round
          flat
          dense
          class="dropdown"
          :icon="expanded2 ? 'keyboard_arrow_down' : 'keyboard_arrow_right'"
        />
    </q-card-actions>
    </div>
    <q-slide-transition>
    <div v-show="expanded2">

    <div class="row contact-input">
    <div class="flexstart">
     <div class="socialapps">
        <a href="https://web.whatsapp.com" target="_blank">
        <img src="/images/WA_logo.svg" class="socialimg" alt="WA_logo">
        </a>
     </div>
    <q-card-section class="input-area">
      <q-input
        class="q-mb-md c-input-social"
        rounded
        outlined
        label="Introduce tu número de teléfono"
        v-model="userForm.socials.whatsapp"
      />

    </q-card-section>
    </div>
    <div class="flexend">
     <div class="socialapps">
         <a href="https://instagram.com" target="_blank">
        <img src="/images/Instagram_logo.svg" class="socialimg" alt="Instagram_logo">
        </a>
     </div>
    <q-card-section class="input-area">
      <q-input
        class="q-mb-md c-input-social"
        rounded
        outlined
        label="Instagram"
        v-model="userForm.username"
      />
    </q-card-section>
    </div>
    </div>
    <div class="row contact-input">
     <div class="flexstart">
     <div class="socialapps">
         <a href="https://tiktok.com" target="_blank">
        <img src="/images/TikTok_Logo.svg" class="socialimg" alt="TikTok">
        </a>
     </div>
    <q-card-section class="input-area">
      <q-input
        class="q-mb-md c-input-social"
        rounded
        outlined
        label="Introduce tu nombre de usuario"
        v-model="userForm.socials.tiktok"
      />
    </q-card-section>
    </div>
     <div class="flexend">
     <div class="socialapps">
         <a href="https://facebook.com" target="_blank">
        <img src="/images/Fb_logo.svg" class="socialimg" alt="img-logo-fb">
        </a>
     </div>
    <q-card-section class="input-area">
      <q-input
        class="q-mb-md c-input-social"
        rounded
        outlined
        label="Facebook"
        v-model="userForm.socials.facebook"
      />
    </q-card-section>
    </div>
    </div>
     </div>
    </q-slide-transition>
  </q-card>

   <q-card class="q-my-md bank" >
     <div  @click="(e) => {  if(e.target !== e.currentTarget){ expanded3 = !expanded3} }">
    <q-card-actions class="headings">
        <q-card-section>
            <div class="text-h6">Datos bancarios</div>
          </q-card-section>
          <q-btn
          color="grey"
          round
          flat
          dense
          class="dropdown"
          :icon="expanded3 ? 'keyboard_arrow_down' : 'keyboard_arrow_right'"
        />
    </q-card-actions>
    </div>
    <q-slide-transition>
   <div v-show="expanded3">
    <div class="row contact-input">
    <q-card-section class="input-area">
      <q-input
        class="q-mb-md c-input"
        rounded
        outlined
        label="Nombre de titular de cuenta"
        v-model="userForm.bank_details.name"
      />
    </q-card-section>
    <q-card-section class="input-area">
      <q-input
        class="q-mb-md c-input"
        rounded
        outlined
        label="CLABE"
        v-model="userForm.bank_details.clabe"
      />
    </q-card-section>
    <q-card-section class="text-area" >

    <q-checkbox val="red" keep-color color="red" />
  <div> Confirmo que todos los pagos serán enviados a esta cuenta. </div>
     </q-card-section>
    </div>
    </div>
    </q-slide-transition>
  </q-card>
  <q-card v-if="userForm.address" class="q-my-md address" >
    <div @click="(e) => {  if(e.target !== e.currentTarget){ expanded4 = !expanded4} }">
    <q-card-actions class="headings" >
        <q-card-section>
            <div class="text-h6">Dirección para recoger productos</div>
          </q-card-section>
          <q-btn
          color="grey"
          round
          flat
          dense
          class="dropdown"
          :icon="expanded4 ? 'keyboard_arrow_down' : 'keyboard_arrow_right'"
        />
    </q-card-actions>
    </div>
    <q-slide-transition>
        <div v-show="expanded4">
     <div class="row contact-input">
      <q-card-section class="input-area">
        <q-input
          class="q-mb-md c-input"
          rounded
          outlined
          label="Calle y número ext."
          v-model="userForm.address.number_out"
        />
      </q-card-section>
      <q-card-section class="input-area">
        <q-input
          class="q-mb-md c-input"
          rounded
          outlined
          label="Número Int. (Opcional)"
          v-model="userForm.address.number_in"
        />

      </q-card-section>
    </div>
    <div class="row contact-input">
    <q-card-section class="input-area">
      <q-input
        class="q-mb-md c-input"
        rounded
        outlined
        label="Código Postal"
        v-model="userForm.address.postal_code"
        @change="blurText"

      />
    </q-card-section>
    <q-card-section class="input-area">
     <q-select
     v-if="asentamientosList.length"
     rounded
     outlined
     class="q-mb-md c-input"
     v-model="userForm.address.street"
     :options="asentamientosList"
     label="Colonia"
      />
    </q-card-section>
    </div>
  <div class="row contact-input">
    <q-card-section class="input-area">
      <q-input
        class="q-mb-md c-input"
        rounded
        outlined
        label="Ciudad"
        v-model="userForm.address.city"
      />
    </q-card-section>
    <q-card-section class="input-area">
      <q-input
        class="q-mb-md c-input"
        rounded
        outlined
        label="Estado"
        v-model="userForm.address.state"
      />
    </q-card-section>
    </div>
    <div class="contact-input">
    <q-card-section class="input-area">
      <q-input
        class="q-mb-md h-input"
        rounded
        outlined
        label="Referencias adicionales"
        v-model="userForm.address.add_ref"
      />
    </q-card-section>
    </div>
    </div>
    </q-slide-transition>
  </q-card>
  <q-card v-if="userForm.address" class="q-my-md address" >
    <div @click="(e) => {if(e.target !== e.currentTarget){ expanded5 = !expanded5} }">
    <q-card-actions class="headings" >
        <q-card-section>
            <div class="text-h6">Cambiar contraseña</div>
          </q-card-section>
          <q-btn
          color="grey"
          round
          flat
          dense
          class="dropdown"
          :icon="expanded5 ? 'keyboard_arrow_down' : 'keyboard_arrow_right'"
        />
    </q-card-actions>
    </div>
    <q-slide-transition>
      <div v-show="expanded5">
        <div class="row contact-input">
           <q-card-section class="input-area">
              <q-input
                  class="q-mb-md c-input"
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
                  class="q-mb-md c-input"
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
                  class="q-mb-md c-input"
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
                  :disable="!password || !password2 || !passwordAfter"
                  no-caps/>
    </q-card-section>
    </div>
    </div>
    </q-slide-transition>
  </q-card>

  </q-page>
   <div>
      <Hamburguer-Menu></Hamburguer-Menu>
  </div>
</template>
<script lang="ts">
import { User } from 'src/components/models';
import { useUserApi } from 'src/factories/useUserApi';
import { getColonys } from 'src/factories/useColony';
import { defineComponent, ref, watch } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { useAuthApi } from 'src/factories/useAuthApi';
import Loader from 'src/components/Loader.vue';
import HamburguerMenu from 'src/components/HamburguerMenu.vue';
import AlertVue from 'src/components/dialogs/Alert.vue';
import PasswordUpdate from 'src/components/dialogs/PasswordUpdate.vue';


export default defineComponent({
  components: { HamburguerMenu },
  setup() {
    const { user, udpateUser, getPasswordFromUser, updatePasswordDBFromUser} = useUserApi();
    const { updatePassword } = useAuthApi();
    const { getColonysArray } = getColonys();
    const { logout } = useAuthApi();
    const $q = useQuasar();
    const router = useRouter();
    const password = ref(''), password2 = ref(''), passwordAfter = ref('')
    let asentamientosList = ref(['Ingresa el codigo postal'])

    const changed = ref(false),
      userForm = ref<User>({
        email: user.value?.email,
        phone: user.value?.phone,
        username: user.value?.username,
        uid: user.value?.uid,
        address: {
          street: '',
          number_in: '',
          number_out: '',
          postal_code: '',
          city: '',
          state: '',
          add_ref: '',
        },
        bank_details: {
          name: '',
          clabe: '',
        },
         socials: {
          facebook: '',
          whatsapp:  '',
          tiktok:  '',
        },
      });

    if (user.value?.address) {
      userForm.value.address = user.value?.address;
    }
    if (user.value?.bank_details) {
      userForm.value.bank_details = user.value?.bank_details;
    }
    if (user.value?.socials) {
      userForm.value.socials = user.value?.socials;
    }
    watch(userForm.value, () => {
      changed.value = true;
    });

    const ChangePassword = async () => {
      const passwordUser = await getPasswordFromUser(user.value?.email as string)
        if (password.value != password2.value) {
          $q.notify({
            color: 'deep-orange',
            textColor: 'white',
            message: 'Las contraseñas no coinciden, por favor verifica'
          })
        }else if (passwordUser != passwordAfter.value) {
          $q.notify({
            color: 'deep-orange',
            textColor: 'white',
            message: 'La contraseña anterior no coincide, por favor verifica'
          })
        }else{
        const newPassword = password2.value;
        const myUserId = user.value?.uid as string;
        await updatePassword(newPassword);
        await updatePasswordDBFromUser(myUserId, newPassword);
        $q.dialog({
            component: PasswordUpdate,
            componentProps: {
            title: 'EXITOSO',
            message: 'La contraseña ha sido actualizada exitosamente'
            },
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          }).onOk(async(result) => {
            await logout()
            router.push('/new-login').catch(() => console.log('Vamos! = ', result));
        });
      }
    }

    const save = async () => {
      $q.loading.show({
        spinner: Loader,
        spinnerColor: 'orange',
        spinnerSize: 140,
        backgroundColor: 'white',
        message: 'Actualizando datos',
        messageColor: 'white',
      });
      await udpateUser(userForm.value);
      changed.value = false;

      $q.loading.hide();
    };

    const savehandler = async () => {
      console.log('user save handler:', userForm.value);
      await udpateUser(userForm.value);
    };

     const blurText = async () =>{
      try {
        const codigo_postal = userForm.value.address.postal_code
        const postCode = await getColonysArray(parseInt(codigo_postal));
        if(postCode.success) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          asentamientosList.value = [...postCode.value.response.asentamiento];
        }else {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          $q.dialog({
              component: AlertVue,
              componentProps: {
                  title:
                      'Error al consultar el Código Postal. Por favor indica uno válido',
              },
          }).onOk((result) => {
              console.log('ok', result);
          });
          return;
        }

      } catch (error) {
        console.error(error);
      }
    }
    return {
      expanded1: ref(false), expanded2: ref(false),isPwd: ref(true),expanded3: ref(false),
      expanded4: ref(false),model: ref(null),expanded5: ref(false),
      password,password2,userForm, passwordAfter, changed,asentamientosList, save , ChangePassword, savehandler,blurText};
  },
  created() {
  window.addEventListener('beforeunload', this.handler)
},
methods: {
  handler: function handler() {
      this.savehandler;
  }
}
});
</script>

<style lang="scss" scoped>
html,
body {
    overflow-y: inherit;
}

.text-primary{
font-weight: 600;
font-size: 36px;
line-height: 49px;
}
.container-page{
  max-height: 100vh;
  overflow-y: scroll;
}
.text-caption{
font-weight: 500;
font-size: 20px;
line-height: 18px;
margin-bottom: 50px;
color: #434343;
text-align: center;
}
.headings{
display: flex;
flex-direction: row;
color: #001E32;
justify-content: space-between;
}

.text-h6{
font-weight: 700;
font-size: 20px;
}
.text-center {
 display: flex;font-size: 28px; justify-content: flex-start; padding-left:286px;margin-top: 80px;
}

.contact {
width: 866px;
left: 287px;
background: #FFFFFF;
box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
border-radius: 16px;
}

.bank {
width: 866px;
left: 287px;
background: #FFFFFF;
box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
border-radius: 16px;
}
.socials {
width: 866px;
left: 287px;
background: #FFFFFF;
box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
border-radius: 16px;
}

.address {
width: 866px;
left: 287px;
background: #FFFFFF;
box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
border-radius: 16px;
}

.contact-input{
display:flex;
flex-direction: row;
padding: 0px;
justify-content:space-around;



  .c-input{
  width: 386px;
  height: 55px;
  padding: 0px;
  border-radius: 100px;
  }
  .c-input-social{
  width: 289px;
  height: 55px;
  padding: 0px;
  border-radius: 100px;
  }




}
.input-area {
padding: 0px;
}
.h-input{
  width: 800px;
  height: 55px;
  align-items: center;
  padding: 0px;
  border-radius: 100px;
}
.socialapps{width:55px;height: 55px;box-shadow: 0px 0px 8px 0px #00000050;border-radius: 100px;padding: 0px; margin-right: 0px; margin-left: -10px;}
.socialimg{width:27.88px;margin:14px;}

.text-area {
width:100%;
display:flex;
flex-direction: row;
justify-content: flex-start;

width: 100%;
span{
text-align: center;
}
}

.flexstart{
display: flex;
flex-direction: flex-start;
}
.flexend{
display: flex;
flex-direction: flex-end;
justify-content: space-around;
}
@media(max-width:600px){

.text-primary{
font-weight: 600;
font-size: 20px;
line-height: 28px;
}
.text-caption{
font-weight: 500;
font-size: 12px;
line-height: 18px;
}

.text-h6{
font-weight: 700;
font-size: 16px;
}
.text-center {
 display: flex;font-size: 20px; justify-content: flex-start; padding-left:14px;margin-top: 60px;margin-bottom: -2px;
}

.contact {
width: 335px;
left: 10px;
}

.socials {
width: 335px;
left: 10px;
}
.bank {
width: 335px;
left: 10px;
}

.address {
width: 335px;
left: 10px;
}

.contact-input{
display:flex;
flex-direction: row;
padding: 0px;
justify-content:center;
padding-bottom: 20px;



  .c-input{
  width: 306px;
  height: 48px;
  align-items: center;
  padding: 0px;
  border-radius: 100px;
  }
  .c-input-social{
  width: 247px;
  height: 48px;
  padding-left: 10px;
  border-radius: 100px;
  }

}
.input-area {
padding: 0px;
}
.h-input{
  width: 305px;
  height: 48px;
  align-items: center;
  padding: 0px;
  border-radius: 100px;
}

.socialapps{width:48px;height: 48px;box-shadow: 0px 0px 8px 0px #00000050;border-radius: 100px;}
.socialimg{width:23.72px;margin:10px;}
}

</style>
