<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide"  class="dialog">
    <q-card
      class="share-actions-card q-ma-md q-pa-md q-pt-xl relative-position card"
    >
   
    
    <q-card-section align="center">
         <q-card-section align="right" >
            <q-icon name="cancel"   @click="vamosProduct" class="close-icon"  />
            <q-icon    @click="vamosProduct" class="close-icon1"  />

           <q-card-section align="left" >
            <h4 class="heading">¡Tu catálogo en línea está listo!</h4>
            <p class="text">Agrega tu link a tu bio de Instagram y comienza a vender💸</p>
                 

           </q-card-section>
         </q-card-section>
       
      <q-input  class="input-1 input-area" readonly  color="primary"
                  v-model="productlink" 
                  
                       >
                    <template v-slot:prepend >
                      <div class="copy" @click="showNotif">
                           <q-icon color="primary" style="padding-left:10px; cursor:pointer" @click="handleClipboard()"  >
                        <svg width="21" height="26" viewBox="0 0 21 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14.1721 5.40039H2.87202C2.37654 5.40144 1.90161 5.59846 1.55088 5.94844C1.20015 6.29842 1.00211 6.77294 1 7.26841V23.1246C0.999999 23.6214 1.1971 24.098 1.54806 24.4497C1.89902 24.8014 2.37516 24.9995 2.87202 25.0006H14.1721C14.6697 25.0006 15.1469 24.803 15.4987 24.4511C15.8505 24.0993 16.0482 23.6221 16.0482 23.1246V7.26841C16.046 6.77225 15.8475 6.29713 15.4959 5.94703C15.1443 5.59694 14.6683 5.40039 14.1721 5.40039ZM15.2482 23.1326C15.246 23.4166 15.1317 23.6882 14.9302 23.8883C14.7286 24.0883 14.4561 24.2006 14.1721 24.2006H2.87202C2.58734 24.1995 2.31468 24.0857 2.11375 23.884C1.91282 23.6824 1.80001 23.4093 1.80001 23.1246V7.26841C1.80211 6.98511 1.91586 6.71408 2.11656 6.51413C2.31726 6.31418 2.58872 6.20144 2.87202 6.2004H14.1721C14.4575 6.2004 14.7312 6.31376 14.933 6.51556C15.1348 6.71735 15.2482 6.99104 15.2482 7.27641V23.1326Z" fill="#DDDDDD" stroke="#E75935"/>
                          <path d="M18.6162 1H7.22411C6.73892 0.999999 6.27354 1.19247 5.93009 1.53517C5.58663 1.87788 5.39315 2.34283 5.39209 2.82802V4.24804C5.39209 4.35412 5.43423 4.45587 5.50925 4.53088C5.58426 4.6059 5.68601 4.64804 5.79209 4.64804C5.89818 4.64804 5.99992 4.6059 6.07494 4.53088C6.14995 4.45587 6.1921 4.35412 6.1921 4.24804V2.82802C6.19316 2.55501 6.30235 2.29354 6.49578 2.10086C6.6892 1.90819 6.95109 1.80001 7.22411 1.80001H18.6162C18.8882 1.80107 19.1486 1.90984 19.3406 2.10252C19.5325 2.29519 19.6402 2.55607 19.6402 2.82802V18.7762C19.6381 19.0471 19.5296 19.3064 19.338 19.498C19.1464 19.6896 18.8872 19.7981 18.6162 19.8002H17.3202C17.2141 19.8002 17.1124 19.8423 17.0374 19.9174C16.9624 19.9924 16.9202 20.0941 16.9202 20.2002C16.9202 20.3063 16.9624 20.408 17.0374 20.4831C17.1124 20.5581 17.2141 20.6002 17.3202 20.6002H18.6162C19.1014 20.5992 19.5664 20.4057 19.9091 20.0622C20.2518 19.7188 20.4443 19.2534 20.4442 18.7682V2.82802C20.4442 2.3432 20.2517 1.87823 19.9088 1.53541C19.566 1.19259 19.1011 1 18.6162 1Z" fill="#DDDDDD" stroke="#E75935"/>
                        </svg>
                      </q-icon>
                      <span style="padding: 0px 10px;">|</span>
                      </div>
                      
                    </template>
        </q-input>
    </q-card-section>
      
       
      </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useDialogPluginComponent } from 'quasar';
import { useUserApi } from 'src/factories/useUserApi';
import { copyToClipboard, useQuasar } from 'quasar';
import { useRouter } from 'vue-router';


const { user } = useUserApi();
const username = user.value?.username;
const productlink = 'https://lizza.app/' + String(username);
const copied = ref(false);
const $router = useRouter();

const handleClipboard = async () => {
  if (copied.value) {
    return;
  }

  await copyToClipboard(productlink);
  // Indicate the copy was successful and reset it after few secs.
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 3000);
};


export default defineComponent({
  props: {
    title: {
      type: String,
      default: 'Seguro?',
    },
    message: {
      type: String,
      default: 'Esto es un mensaje!',
    },
  },

 emits: [
    // REQUIRED; need to specify some events that your
    // component will emit through useDialogPluginComponent()
    ...useDialogPluginComponent.emits,
  ],
 setup() {
    // REQUIRED; must be called inside of setup()
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
      useDialogPluginComponent();

    const vamosProduct = () => {
             onDialogOK();
    };
    const $q = useQuasar();
     const showNotif = () => {
        $q.notify({
          message: 'Copied!',
          color: 'primary'
        })
      }
       return {
      dialogRef,
      onDialogHide,
      onDialogOK,
      onDialogCancel,
      vamosProduct,
      productlink,
      handleClipboard,
      showNotif
    };
  },
});
</script>

<style lang="scss" scoped>
body {
font-family: 'Manrope';
font-style: normal;
}

.card {
position: absolute;
overflow: hidden;
width: 596px;
height: 374.6px;
background: #FFFFFF;
border-radius: 40px;
}
.text-title{
    font-size: 1.7rem;
    font-weight: 410;
    line-height: 2rem;
    letter-spacing: normal;
    color: #E75935;
    text-align: center;
    margin-bottom: 10px;
    margin-top: -15px;
}
.text-description{
    font-size: 1.0rem;
    font-weight: 400;
    line-height: 2rem;
    letter-spacing: normal;
    margin-bottom: 10px;

}
.q-card{
    max-height: calc(100vh - 48px);
    margin: 12px;
    border-radius: 20px;
}
.btns {
background: white;
border:none;
margin-bottom: 0px;
font-size: 15px;
color: grey;
top: -8px;
width: 100%;
}

.close-icon  {
   font-size: 32px;
   color: #AAA;
   top: -40px;
}

 .close-icon1 {
   display: none;
  }
.input-1 {
    display:flex; 
    position: relative;
    width: 451.6px;
    height: 60.4px;
    font-weight: 600;
    font-size: 22.4px;
    line-height: 18px;
    color: #E75935;
    padding: 8px 25.6px;
    background: #FFFFFF;
    align-content: center;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
    border-radius: 100px;
    overflow: hidden;
    margin-top: -10px;
    display: flex;

}
.heading {
font-weight: 600;
font-size: 28px;
text-align: center;
color: #E75935;
margin-top: -50px;
}
.text {
font-weight: 400;
font-size: 22.6px;
text-align: center;
color: #AAAAAA;
margin-top: -30px;

}

@media (max-width: 640px) {
 .card {
    width: 100%;
    border-radius: 60px 60px 0px 0px;
    bottom: -10px; 
  }
  .heading {
font-size: 18px;
margin-top: 20px;
}
.text {
font-size: 16px;
}
.input-1 {
    width: 303px;
    height: 50px;
    padding:0px 0px 10px 2px;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
}
 .close-icon {
   display: none ;
  }
  .close-icon1 {
    width: 60%;
    height: 6px;
    display: block;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 30px;
    margin: 0 auto;
    margin-top: -30px;
  }
}


</style>
