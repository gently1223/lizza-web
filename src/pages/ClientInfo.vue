<template>
  <q-page v-if="userForm" >
  <q-toolbar class="shadow-1">
     <div class="header-bar">
    <q-btn flat round color="grey" icon="arrow_back" to="/" />
        <q-toolbar-title class="text-center">
          <span v-if="product" class="text-primary text-bold">
            @{{ product.username }}
          </span>
        </q-toolbar-title>
        <div class="icons" style="display: flex; justify-content: space-around; width:10%; margin-right: 40px">
       <q-btn round>
      <q-img src="images/profile.svg" class="cart-img">  </q-img>
       </q-btn>
       </div>
       </div>
    </q-toolbar>

  <q-card v-if="userForm.address" class="q-my-md address" >
    <div >
    <q-card-actions class="headings" >
        <q-card-section class="flex-section">
            <div class="text-h6">Datos de envío</div>
            <div  color="primary">
               <p class="inicia-session"> Iniciar sesión </p>
            </div>

          </q-card-section>

    </q-card-actions>
    </div>
    <q-slide-transition>
    <div >
     <div class="row contact-input-1">
      <q-card-section class="input-area">
        <q-input
          class="q-mb-md c-input-1"
          rounded
          outlined
          label="Nombre completo"
          v-model="userForm.username"
        />
      </q-card-section>

    </div>
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
      />
    </q-card-section>
    <q-card-section class="input-area">
     <q-select
     rounded
     outlined
     class="q-mb-md c-input"
     v-model="userForm.address.street"
     :options="['Pontevedra', 'Puerta Aqua', 'Puerta de Hierro', 'Puerta del Bosque']"
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

    </div>
    </q-slide-transition>
  </q-card>
  <div class="button-primary">
      <q-btn
              v-if="!changed"
              rounded
              class="btn-primary"
              label="Procesar la compra"
              style="text-transform:none;color:#DDDDDD"

            >
      </q-btn>
      <q-btn
              v-if="changed"
              rounded
              class="btn-primary"
              color="primary"
              label="Procesar la compra"
              style="text-transform:none"
              @click="save"
            >
      </q-btn>

  </div>

  </q-page>

</template>
<script lang="ts">
import { User } from 'src/components/models';
// import { User } from 'src/components/models';
import { useUserApi } from 'src/factories/useUserApi';
import { defineComponent, ref, watch } from 'vue';
import { useProductApi } from 'src/factories/useProductApi';

export default defineComponent({
  setup() {
    const { user, udpateUser } = useUserApi();
    const { product} = useProductApi();
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
    const save = async () => {
      console.log('user', userForm.value);
      await udpateUser(userForm.value);
      changed.value = false;
    };
    const savehandler = async () => {
      console.log('user save handler:', userForm.value);
      await udpateUser(userForm.value);

    };
    console.log('user values:', user, userForm)
    //Watch user change then show accept change button
    return { expanded1: ref(false), expanded2: ref(false),  expanded3: ref(false),  expanded4: ref(false), userForm, changed, save ,savehandler,model: ref(null), product};
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

.text-primary{
font-weight: 600;
font-size: 36px;
line-height: 49px;
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


  .c-input-1{
  width: 386px;
  height: 55px;
  padding: 0px;
  border-radius: 100px;
  }
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

.contact-input-1{
display:flex;
flex-direction: row;
padding-left: 24px;
justify-content:flex-start;
  .c-input-1{
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
.inicia-session {
font-weight: 500;
font-size: 20px;
line-height: 22px;
color: #E75935;
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
left: 20px;
}

.contact-input-1{
display:flex;
flex-direction: row;
padding: 0px;
justify-content:center;
padding-bottom: 20px;

  .c-input-1{
  width: 306px;
  height: 55px;
  padding: 0px;
  border-radius: 100px;
  }

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

.contact-input{
display:flex;
flex-direction: row;
padding: 0px;
justify-content:center;
padding-bottom: 20px;

  .c-input-1{
  width: 306px;
  height: 55px;
  padding: 0px;
  border-radius: 100px;
  }

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
.contact-input-1.input-area {
padding: 0px;
width: 100%;
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

// ----------------------------------------------------------------
.header-bar {
width: 100%;
display: flex;
justify-content:space-evenly;
}
.shadow-1 {
width: 100%;
height: 80px;
left: 0px;
margin-bottom:30px;
top: 0px;
box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
}
.boton {
  border-radius: 11px;
  width: 100%;
  margin-top: 1.1em;
}
.compartir {
  padding: 1.1em;
}
.pagina {
  background: rgb(252, 225, 185);
  justify-content: center;
  text-align: center;
}
.link {
  padding: -2em;
  border: 6px solid rgb(240, 200, 23);
  color: orange;
  box-shadow: none;
  &:before {
    box-shadow: none;
  }
}
#iconCopy {
  width: 30px;
  height: 30px;
}
.border-input {
  color: $primary;
}
.flex-section {
    display: flex;
    width: 100%;
    justify-content: space-between;

}

.button-primary {
    display: flex !important;
    justify-content: center;
    margin-top: 50px;
    height: 70px;
    width: 100%;

}
.btn-primary {
  height: 70px;
  width: 404px;
}

.inicia-session {
font-weight: 500;
font-size: 20px;
line-height: 22px;
color: #E75935;
}
@media(max-width:600px){
.shadow-1 {
height: 64px;
margin-bottom:52px;
}

.cart-img {
width: 20px;
height: 16px;
align-items: center;
justify-content: center;
}

.btn-primary {
  height: 48px;
  width: 303px;
}
.inicia-session {
 display: none;
}
}
</style>
