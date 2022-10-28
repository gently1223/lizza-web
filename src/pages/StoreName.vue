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
        <p class="main-text">Cuéntanos...</p><br/>
        <p class="main-text">¿Cómo se llama tu tienda?</p>
      </main>
         <q-input
           rounded outlined
           :dense="dense"
           borderless
           v-model="name1"
           class="btn-input">
            <template v-slot:append>
                <q-avatar>
                    <img src="icons/flechaconnaranja.svg" v-if="name1" @click="createName" alt="img_siguiente">
                </q-avatar>
            </template>
         </q-input>
        <q-item-label  class="textInfo" v-if="url === name1">{{infoValidationFalse}}</q-item-label>
        <q-item-label class="textInfo" v-else>{{infoValidation}}</q-item-label>
          <q-input
            v-if="url !== name1"
            rounded outlined
            borderless
            readonly
            v-model="name2"
            :input-style=" {color:'#e75935'}"
            :dense="dense"
            class="btn-input-dos">
            <template v-slot:append>
                <q-avatar>
                    <img v-if="url === name1" :src="iconWarring" alt="img_siguiente">
                    <img v-else :src="icon" alt="img_siguiente">
                </q-avatar>
            </template>
         </q-input>
         <q-input
            v-else
            rounded outlined
            borderless
            readonly
            v-model="name2"
            :input-style=" {color:'#E4A400'}"
            :dense="dense"
            class="btn-input-dos">
             <template v-slot:append>
                <q-avatar>
                    <img v-if="url=== name1" :src="iconWarring" alt="img_siguiente">
                    <img v-else :src="icon" alt="img_siguiente">
                </q-avatar>
            </template>
         </q-input>
  </q-page>
</template>

<script>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from 'src/store';
import { useQuasar } from 'quasar';
import { useStoresApi } from 'src/factories/useStoresApi';
import { useAuthApi } from 'src/factories/useAuthApi';
import Loader from 'src/components/Loader.vue';

export default {
  setup () {
    const router = useRouter();
    const store = useStore();
    const $q = useQuasar();
    const { createAuthWithMailAndPass, createUserDBAuthWithMailAndPass } = useAuthApi();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
    const emailPassword = computed( () => store.getters['registerUser/emailPassword'])
    const { getAllStoresNames, insertStore, updateStore } = useStoresApi();

    let infoValidation = ref('Este va a ser el link a tu tienda en linea')
    let infoValidationFalse = ref('Este nombre no está disponible, por favor elige otro')
    let iconWarring = ref('icons/iconoir_warning-circled-outline.svg')
    let icon = ref('icons/iconoir_check.svg'), url = ref(''), name1 = ref(''), dense = ref(true)
    let objNames = []
    let name2 = computed(() => `lizza.app/${name1.value.replace(/[^a-zA-Z 0-9]+/g,' ').split(' ').join('').toLowerCase()}`)

    const createName = async() => {
      $q.loading.show({
        spinner: Loader,
        spinnerColor: 'orange',
        spinnerSize: 140,
        backgroundColor: 'white',
        message: 'Generando producto',
        messageColor: 'white',
      });
      const store_names = await getAllStoresNames();
      const value_text = name1.value.replace(/[^a-zA-Z 0-9]+/g,' ').split(' ').join('').toLowerCase();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
      const email_text = emailPassword.value.email;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
      const password_text = emailPassword.value.password;

      try {
        for (objNames of store_names ) {
          if(store_names.includes(value_text)){
            url.value = objNames.toString()
            $q.loading.hide();
            $q.notify({
                color: 'red',
                textColor: 'white',
                message: 'Este nombre ya existe. Por favor elige otro.'
            })
            return store_names;
          }else{
            url.value = store_names.toString()
            // 1st verify insert store, if is done, insert all other data
            let nameFinish = value_text;
            const inserted_store = await insertStore(nameFinish, '')
            if(inserted_store.inserted){
              const rtaRegisterUser = await createAuthWithMailAndPass(email_text, password_text);
              const result_createDBUser = await createUserDBAuthWithMailAndPass(email_text, password_text,
              String(rtaRegisterUser.data?.uid), nameFinish);

              await updateStore(inserted_store.data, result_createDBUser.value);

              $q.loading.hide();
              await router.push('/create-product-options')
              return store_names;
            }else{
              $q.notify({
                color: 'red',
                textColor: 'white',
                message: 'Error al registrarte. Por favor verifica el nombre de la tienda.'
              })
            }
          }
        }
      } catch (error) {
        console.error(error)
      }
    }


    return {
      infoValidation,
      infoValidationFalse,
      dense,
      name1,
      name2,
      icon,
      iconWarring,
      url,
      objNames,
      createName,
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
.relative-position {
     position: static;
}
.textInfo{
    font-family: 'Manrope';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 19px;
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
}
.btn-input{
    background: #FFFFFF;
    box-shadow: 0px 2px 12px rgb(0 0 0 / 15%);
    margin: 0 auto;
    margin-bottom: 50px;
    border-radius: 25px;
    width: 650px;
}
.btn-input-dos{
    background: #FFFFFF;
    box-shadow: 0px 2px 12px rgb(0 0 0 / 15%);
    margin: 0 auto;
    margin-bottom: 50px;
    border-radius: 25px;
    width: 650px;
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
.main-text {
    font-family: 'Manrope';
    font-style: normal;
    font-weight: 900;
    font-size: 24px;
    line-height: 30px;
    color: #001E32;
    margin-top: -30px;
}

@media screen and (min-width: 900px) {
  .main-text {
    font-family: 'Manrope';
    font-style: normal;
    font-weight: 900;
    font-size: 24px;
    line-height: 45px;
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
    line-height: 28px;
    color: #001E32;
  }
  .authentication{
    height: 64.79px;
    background: #FFFFFF;
    box-shadow: 0px 0px 8px rgb(0 0 0 / 10%);
    border-radius: 100px;
    margin: 30px;
  }
  .relative-position {
     position: static;
  }
  .header {
    background: #e75935;
    text-align: center;
    margin-bottom: 40px;
    padding-top: 50px;
    position: relative;
    margin-bottom: 80px;
  }
  .btn-input{
    background: #FFFFFF;
    box-shadow: 0px 2px 12px rgb(0 0 0 / 15%);
    margin-left: 45px;
    margin-bottom: 50px;
    border-radius: 25px;
    width: 300px;
  }
  .btn-input-dos{
    background: #FFFFFF;
    box-shadow: 0px 2px 12px rgb(0 0 0 / 15%);
    margin-left: 45px;
    margin-bottom: 50px;
    border-radius: 25px;
    width: 300px;
  }
  .textInfo{
    font-family: 'Manrope';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 19px;
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
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
