<template>
  <q-modal v-model="opened" v-if="showStory" >
      <div class="mySlidesfade">
       <section class="flex justify-end p-4" style="right: -20px">
         <div class="menu-icon">
           <a href="javascript:" @click="toggleStory('')">
             <img src="sidebar/close.svg" />
           </a>
         </div>
       </section>
       <div class="video-container">
           <video  :poster="video"  autoplay  playsinline style="margin: 15px; overflow: hidden;" class="video-container">
           <source :src="video" type="video/mp4"/>
       </video>
     </div>
       </div>
   </q-modal> 
 
   <q-page v-if="!showStory" class="content">

    <q-toolbar class="shadow-1 desktop-view">
      <div class="socialmedia">
        <div
          class="relative flex items-top justify-center min-h-screen bg-gray-100 sm:items-center sm:pt-0"
        >
          <div
            class="flex flex-col lg:flex-row items-center mt-8 bg-white overflow-hidden shadow sm:rounded-lg p-6 "
          >
            <div class="circle cursor-pointer"
                role="button"
                @click="toggleStory('videos/dashboard4.mov')">
                <img src="/images/highlight-4.svg" class="socialimg" />      
            </div>
          </div>
        </div>
  
        <div
          class="relative flex items-top justify-center min-h-screen bg-gray-100 sm:items-center sm:pt-0"
        >
          <div
            class="flex flex-col lg:flex-row items-center mt-8 bg-white overflow-hidden shadow sm:rounded-lg p-6 "
          >
            <div class="circle cursor-pointer"
                role="button"
                @click="toggleStory('videos/dashboard3.mov')">
                <img src="/images/highlight-3.svg" class="socialimg" />
            </div>
          </div>
        </div>
  
        <div
          class="relative flex items-top justify-center min-h-screen bg-gray-100 sm:items-center sm:pt-0"
        >
            <div
              class="flex flex-col lg:flex-row items-center mt-8 bg-white overflow-hidden shadow sm:rounded-lg p-6 "
            >
              <div class="circle cursor-pointer"
                  role="button"
                  @click="toggleStory('videos/dashboard2.mov')">
                  <img src="/images/highlight-2.svg" class="socialimg"
                  />
              </div>
            </div>
        </div>
  
        <div class="relative flex items-top justify-center min-h-screen bg-gray-100 sm:items-center sm:pt-0">
            <div
              class="flex flex-col lg:flex-row items-center mt-8 bg-white overflow-hidden shadow sm:rounded-lg p-6 "
            >
              <div 
                class="circle cursor-pointer"
                role="button"
                @click="toggleStory('videos/dashboard1.mov')"
              >
                <img src="/images/highlight-1.svg" class="socialimg" />   
              </div>
            </div>
        </div>
      </div>
    
    </q-toolbar>

    <div class="card-section desktop-view">
      <div class=" q-mx-md card1" style="background: #fff">
        <div class="image">
          <q-img src="images/M001-31.JPG" class="images"></q-img>
        </div>
        <div class="card-section2">
          <h3 class="text1" >Las tiendas con más de 5 productos venden 50% más</h3>
          <q-btn
            class="full-width"
            dense
            color="primary"
            label="Crear un producto"
            @click="goToProduct"
          > 
          </q-btn>
          <br/>
          <a href="https://api.whatsapp.com/send?phone=5215584817757&text=Hola%20%F0%9F%98%8A%20%C2%BFC%C3%B3mo%20puedo%20tener%20mi%20tienda%20en%20l%C3%ADnea%20gratis%3F" target="_blank">
            <p class="para1">¿Necesitas ayuda? </p>
  
          </a>
        </div>
      </div>

      <div class="justify-center q-mx-md card1" style="background: #fff">
        <a href="#" class="close-icon"><img   src="sidebar/close.svg" /> </a>
        <q-toolbar-title style="height: 30px !important;padding: 0px !important;">
          <span  class="text-primary title-text" >
            ¡Abre tu tienda al público!
          </span>
          <p class="text2" >
            Copia el link en tu bio de Instagram para vender más💸
          </p>
        </q-toolbar-title>
        <q-input  
          class="input-2 input-area" 
          readonly 
          color="primary"
          v-model="productlink"
        >
          <template v-slot:prepend>
            <div class="copy" @click="showNotif">
              <q-icon color="primary" style="padding-left:20px; cursor:pointer" @click="handleClipboard()"  >
                <svg width="21" height="26" viewBox="0 0 21 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.1721 5.40039H2.87202C2.37654 5.40144 1.90161 5.59846 1.55088 5.94844C1.20015 6.29842 1.00211 6.77294 1 7.26841V23.1246C0.999999 23.6214 1.1971 24.098 1.54806 24.4497C1.89902 24.8014 2.37516 24.9995 2.87202 25.0006H14.1721C14.6697 25.0006 15.1469 24.803 15.4987 24.4511C15.8505 24.0993 16.0482 23.6221 16.0482 23.1246V7.26841C16.046 6.77225 15.8475 6.29713 15.4959 5.94703C15.1443 5.59694 14.6683 5.40039 14.1721 5.40039ZM15.2482 23.1326C15.246 23.4166 15.1317 23.6882 14.9302 23.8883C14.7286 24.0883 14.4561 24.2006 14.1721 24.2006H2.87202C2.58734 24.1995 2.31468 24.0857 2.11375 23.884C1.91282 23.6824 1.80001 23.4093 1.80001 23.1246V7.26841C1.80211 6.98511 1.91586 6.71408 2.11656 6.51413C2.31726 6.31418 2.58872 6.20144 2.87202 6.2004H14.1721C14.4575 6.2004 14.7312 6.31376 14.933 6.51556C15.1348 6.71735 15.2482 6.99104 15.2482 7.27641V23.1326Z" fill="#DDDDDD" stroke="#E75935"/>
                  <path d="M18.6162 1H7.22411C6.73892 0.999999 6.27354 1.19247 5.93009 1.53517C5.58663 1.87788 5.39315 2.34283 5.39209 2.82802V4.24804C5.39209 4.35412 5.43423 4.45587 5.50925 4.53088C5.58426 4.6059 5.68601 4.64804 5.79209 4.64804C5.89818 4.64804 5.99992 4.6059 6.07494 4.53088C6.14995 4.45587 6.1921 4.35412 6.1921 4.24804V2.82802C6.19316 2.55501 6.30235 2.29354 6.49578 2.10086C6.6892 1.90819 6.95109 1.80001 7.22411 1.80001H18.6162C18.8882 1.80107 19.1486 1.90984 19.3406 2.10252C19.5325 2.29519 19.6402 2.55607 19.6402 2.82802V18.7762C19.6381 19.0471 19.5296 19.3064 19.338 19.498C19.1464 19.6896 18.8872 19.7981 18.6162 19.8002H17.3202C17.2141 19.8002 17.1124 19.8423 17.0374 19.9174C16.9624 19.9924 16.9202 20.0941 16.9202 20.2002C16.9202 20.3063 16.9624 20.408 17.0374 20.4831C17.1124 20.5581 17.2141 20.6002 17.3202 20.6002H18.6162C19.1014 20.5992 19.5664 20.4057 19.9091 20.0622C20.2518 19.7188 20.4443 19.2534 20.4442 18.7682V2.82802C20.4442 2.3432 20.2517 1.87823 19.9088 1.53541C19.566 1.19259 19.1011 1 18.6162 1Z" fill="#DDDDDD" stroke="#E75935"/>
                </svg>
              </q-icon>
              <span style="padding: 0px 10px;">|</span>
            </div>
          </template>
        </q-input>
      </div>

      <div class=" q-mx-md card1" style="background: #fff">
        <div class="image">
          <q-img src="images/M001-8.png" class="images"></q-img>
        </div>
        <div class="card-section2">
          <h3 class="text2" >Queremos mejorar para ti</h3>
        
          <q-btn
            class="full-width"
            dense
            color="primary"
            label="Ir a la encuesta"
            @click="goToTypeform('https://form.typeform.com/to/L7XtS55V')"
          > 
          </q-btn>
        </div>
      </div>

    </div>
 
     <!-- Mobile -->
 
   <q-toolbar class="shadow-1 mobile-view">
     <div class="socialmedia">
       <div
         class="relative flex items-top justify-center min-h-screen bg-gray-100 sm:items-center sm:pt-0"
       >
         <div
           class="flex flex-col lg:flex-row items-center mt-8 bg-white overflow-hidden shadow sm:rounded-lg p-6 "
         >
           <div class="circle cursor-pointer"
               role="button"
               @click="toggleStory('videos/dashboard4.mov')">
               <img src="/images/highlight-4.svg" class="socialimg" />      
           </div>
         </div>
       </div>
 
       <div
         class="relative flex items-top justify-center min-h-screen bg-gray-100 sm:items-center sm:pt-0"
       >
         <div
           class="flex flex-col lg:flex-row items-center mt-8 bg-white overflow-hidden shadow sm:rounded-lg p-6 "
         >
           <div class="circle cursor-pointer"
               role="button"
               @click="toggleStory('videos/dashboard3.mov')">
               <img src="/images/highlight-3.svg" class="socialimg" />
           </div>
         </div>
       </div>
 
       <div
         class="relative flex items-top justify-center min-h-screen bg-gray-100 sm:items-center sm:pt-0"
       >
           <div
             class="flex flex-col lg:flex-row items-center mt-8 bg-white overflow-hidden shadow sm:rounded-lg p-6 "
           >
             <div class="circle cursor-pointer"
                 role="button"
                 @click="toggleStory('videos/dashboard2.mov')">
                 <img src="/images/highlight-2.svg" class="socialimg"
                 />
             </div>
           </div>
       </div>
 
       <div class="relative flex items-top justify-center min-h-screen bg-gray-100 sm:items-center sm:pt-0">
           <div
             class="flex flex-col lg:flex-row items-center mt-8 bg-white overflow-hidden shadow sm:rounded-lg p-6 "
           >
             <div 
               class="circle cursor-pointer"
               role="button"
               @click="toggleStory('videos/dashboard1.mov')"
             >
               <img src="/images/highlight-1.svg" class="socialimg" />   
             </div>
           </div>
       </div>
     </div>
   
   </q-toolbar>
 
   <q-separator class="separador mobile-view" color="1px solid #DDDDDD" style="display:flex;margin: 0 auto;width:720px;justify-content:center;align-items:center;" inset />
 
   <div class="card-section mobile-view">
     <div class=" q-mx-md card1" style="background: #fff">
       <div class="image">
         <q-img src="images/M001-31.JPG" class="images"></q-img>
       </div>
       <div class="card-section2">
         <h3 class="text1" >Las tiendas con más de 5 productos venden 50% más</h3>
         <q-btn
           class="full-width"
           dense
           color="primary"
           label="Crear un producto"
           @click="goToProduct"
         > 
         </q-btn>
         <br/>
         <a href="https://api.whatsapp.com/send?phone=5215584817757&text=Hola%20%F0%9F%98%8A%20%C2%BFC%C3%B3mo%20puedo%20tener%20mi%20tienda%20en%20l%C3%ADnea%20gratis%3F" target="_blank">
           <p class="para1">¿Necesitas ayuda? </p>
 
         </a>
       </div>
     </div>
     <div class="justify-center q-mx-md card1" style="background: #fff">
       <a href="#" class="close-icon"><img   src="sidebar/close.svg" /> </a>
       <q-toolbar-title style="height: 30px !important;padding: 0px !important;">
         <span  class="text-primary title-text" >
           ¡Abre tu tienda al público!
         </span>
         <p class="text2" >
           Copia el link en tu bio de Instagram para vender más💸
         </p>
       </q-toolbar-title>
       <q-input  
         class="input-2 input-area" 
         readonly 
         color="primary"
         v-model="productlink"
       >
         <template v-slot:prepend>
           <div class="copy" @click="showNotif">
             <q-icon color="primary" style="padding-left:20px; cursor:pointer" @click="handleClipboard()"  >
               <svg width="21" height="26" viewBox="0 0 21 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path d="M14.1721 5.40039H2.87202C2.37654 5.40144 1.90161 5.59846 1.55088 5.94844C1.20015 6.29842 1.00211 6.77294 1 7.26841V23.1246C0.999999 23.6214 1.1971 24.098 1.54806 24.4497C1.89902 24.8014 2.37516 24.9995 2.87202 25.0006H14.1721C14.6697 25.0006 15.1469 24.803 15.4987 24.4511C15.8505 24.0993 16.0482 23.6221 16.0482 23.1246V7.26841C16.046 6.77225 15.8475 6.29713 15.4959 5.94703C15.1443 5.59694 14.6683 5.40039 14.1721 5.40039ZM15.2482 23.1326C15.246 23.4166 15.1317 23.6882 14.9302 23.8883C14.7286 24.0883 14.4561 24.2006 14.1721 24.2006H2.87202C2.58734 24.1995 2.31468 24.0857 2.11375 23.884C1.91282 23.6824 1.80001 23.4093 1.80001 23.1246V7.26841C1.80211 6.98511 1.91586 6.71408 2.11656 6.51413C2.31726 6.31418 2.58872 6.20144 2.87202 6.2004H14.1721C14.4575 6.2004 14.7312 6.31376 14.933 6.51556C15.1348 6.71735 15.2482 6.99104 15.2482 7.27641V23.1326Z" fill="#DDDDDD" stroke="#E75935"/>
                 <path d="M18.6162 1H7.22411C6.73892 0.999999 6.27354 1.19247 5.93009 1.53517C5.58663 1.87788 5.39315 2.34283 5.39209 2.82802V4.24804C5.39209 4.35412 5.43423 4.45587 5.50925 4.53088C5.58426 4.6059 5.68601 4.64804 5.79209 4.64804C5.89818 4.64804 5.99992 4.6059 6.07494 4.53088C6.14995 4.45587 6.1921 4.35412 6.1921 4.24804V2.82802C6.19316 2.55501 6.30235 2.29354 6.49578 2.10086C6.6892 1.90819 6.95109 1.80001 7.22411 1.80001H18.6162C18.8882 1.80107 19.1486 1.90984 19.3406 2.10252C19.5325 2.29519 19.6402 2.55607 19.6402 2.82802V18.7762C19.6381 19.0471 19.5296 19.3064 19.338 19.498C19.1464 19.6896 18.8872 19.7981 18.6162 19.8002H17.3202C17.2141 19.8002 17.1124 19.8423 17.0374 19.9174C16.9624 19.9924 16.9202 20.0941 16.9202 20.2002C16.9202 20.3063 16.9624 20.408 17.0374 20.4831C17.1124 20.5581 17.2141 20.6002 17.3202 20.6002H18.6162C19.1014 20.5992 19.5664 20.4057 19.9091 20.0622C20.2518 19.7188 20.4443 19.2534 20.4442 18.7682V2.82802C20.4442 2.3432 20.2517 1.87823 19.9088 1.53541C19.566 1.19259 19.1011 1 18.6162 1Z" fill="#DDDDDD" stroke="#E75935"/>
               </svg>
             </q-icon>
             <span style="padding: 0px 10px;">|</span>
           </div>
         </template>
       </q-input>
     </div>
     <div class=" q-mx-md card1" style="background: #fff">
       <div class="image">
         <q-img src="images/M001-8.png" class="images"></q-img>
       </div>
       <div class="card-section2">
         <h3 class="text2" >Queremos mejorar para ti</h3>
       
         <q-btn
           class="full-width"
           dense
           color="primary"
           label="Ir a la encuesta"
           @click="goToTypeform('https://form.typeform.com/to/L7XtS55V')"
         > 
         </q-btn>
       </div>
     </div>
   </div>
   <!-- End Mobile -->
   </q-page>
 
   <div>
       <Pwa-Menu></Pwa-Menu>
   </div> 
 </template>
 
 <script lang="ts">
 // import { auth } from 'src/boot/firebase';
 import { copyToClipboard, useQuasar } from 'quasar';
 import { useUserApi } from 'src/factories/useUserApi';
 import { useArcusApi } from 'src/factories/useArcusApi';
 import { useAuthApi } from 'src/factories/useAuthApi';
 import { useFormats } from 'src/factories/useFormats';
 import { useProductApi } from 'src/factories/useProductApi';
 import PwaMenu from 'src/components/PwaMenu.vue';
 import { defineComponent, onMounted,  ref} from 'vue';
 import { useRouter } from 'vue-router';
 // import { Stories } from 'vue-insta-stories';
 
 
 const { user } = useUserApi();
 const username = user.value?.username;
 const email = user.value?.email;
 const productlink = 'https://lizza.app/' + String(username);
 
 const copied = ref(false);
 
 
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
   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
   components: {  PwaMenu },
   setup() {
     //Get route link id
     const $q = useQuasar();
     const router = useRouter();
     const { payee_id } = useArcusApi();
     const { loginAnonym, isLoggedIn } = useAuthApi();
     const { listenProducts, products } = useProductApi();
     const { fromCentsToUnit } = useFormats();
      
     
      const onCopy = () => {
       
       console.log("copy");
     };
     onMounted(async () => {
       if (!isLoggedIn()) {
         await loginAnonym();
       }
     
       //Retrieve public link info(stripe url, price, image, date..)
       const p = router.currentRoute.value.params.id.toString();
       const decrypt = atob(p);
       console.log(p, decrypt);
       payee_id.value = p;
       //0tJnMYcpIQJ6m5vEct0H
       //Get products from catalogue
       listenProducts(decrypt);
       //   //Signout only if not an insta user
       //   if (!user.value?.displayName) {
       //     await auth().signOut();
       //   }
     });
 
     const goToProduct = async () => {
       await router.push('/create-product-options');
     }
     const goToSettings = async () => {
       await router.push('/settings');
     }
      const goToTypeform =  (url: string) => {
       window.open(url, '_blank');
     }
 
      const showNotif = () => {
         $q.notify({
           message: 'Copied!',
           color: 'primary',
           position: 'bottom'
         })
       }
     return { products, fromCentsToUnit, onCopy,goToProduct, goToSettings, goToTypeform, productlink,email, handleClipboard, showNotif};
   },
    data() {
     return {
       // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
       device_detection: false,
       showStory: false,
       opened: false,
       video: '',
     }
   },
 
   methods: {
     toggleStory(video: string) {
       this.showStory = !this.showStory;
       this.opened = !this.opened;
       // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
       console.log('log video is:', video)
       this.video = video;
     },
   },
 });
 </script>
 
 <style lang="scss" scoped>
 html,
 body {
     overflow-y: auto;
     font-family: 'Manrope';
     font-style: normal;
 }
 .shadow-1 {
 display: flex;
 margin: 0 auto;
 flex-direction: column;
 justify-content: space-between;
 align-items: center;
 padding: 24px;
 gap: 24px;
 background: #FFFFFF;
 box-shadow: none;
 position: relative;
 
 }
 
 .storycontainer {
   width: 100%;
   height: 100vh;
 }
 .socialmedia {
   width: 100%!important;
   display: flex;
   justify-content: space-between;
 }
 .text-center {
     position: absolute;
     font-size: 28px;
 }
 span{
    margin-bottom: 4px;
 }
 .input-2 {
     display:flex; 
     position: relative;
     width: 100%;
     height: 48px;
     background: #FFFFFF;
     align-content: center;
     box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
     border-radius: 100px;
     overflow: hidden;
     color: #434343;
     font-weight: 600;
     font-size: 16px;
     line-height: 24px;  
 }
 
  .input-area {
     color: #E75935 !important;
     font-weight: 600;
     font-size: 20px;
     line-height: 18px;
   
 }
 
 .button {
    position: absolute;
    width: 26px;
    height: 26px;
    right: 24px;
    padding: 6px 2px;
 }
 .btn-round{
     background: #E75935;
     width: 24px;
     height: 24px;
 }
 
 .socialapps {
   position: relative;
 } 
 
 .video {
   position: absolute;
   width: 72px;
   height: 72px;
   border-radius: 50%;
 }
 .videostory {
   position: absolute;
   width: 72px;
   height: 72px;
   border-radius: 50%;
 }
 
 .socialimg {
   width: 100px;
   height:100px;
   border-radius: 50%;
 }
 .circle {
   position: relative;
   display: flex;
   justify-content: center;
   align-items: center;
 }
 
 
 .socialmedia svg{  
       position: absolute;
       fill:none;
       stroke:#8a3ab9;
       stroke-linecap: round;
       stroke-width:5;
       stroke-dasharray: 1;
       stroke-dashoffset: 0;
       animation: stroke-draw 6s ease-out infinite alternate; 
       // animation: stroke-draw 6s cubic-bezier(0.77, 0, 0.175, 1) infinite alternate; 
   }
   @keyframes stroke-draw {
     from{
       stroke:#8a3ab9;
       stroke-dasharray: 1;
     }
     to{
       stroke:#cd486b;
       transform:rotate(180deg);
       stroke-dasharray: 8;
     }}
 
 
 .card-section {
    position: relative;
    display: flex;
    margin: 0 20px 0 320px;
    flex-direction: column;
    justify-content: center;
    align-content: center;
 }
 
 .card-section2 {
   position: relative;
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   align-content: center;
   margin-left: 210px;
   width: -webkit-fill-available;
    
    .text1 {
     font-weight: 600;
     font-size: 1.8vw;
     line-height: 25px;
     color: #001E32;
     padding-left: 0px !important;
    }
 
    .text2{
     font-weight: 700;
     font-size: 18px;
     letter-spacing: 2px;
     line-height: 25px;
     color: #001E32;
     white-space: nowrap;
    }
    p {
     font-weight: 400;
     font-size: 14px;
     line-height: 16px;
     letter-spacing: 0.44px;
     text-decoration-line: underline;
     color: #AAAAAA;
     text-align: center;
    }
    .para1 {
     padding-left:130px;
    
    }
 }
 .card1 {
     position: relative;
     display: flex;
     flex-direction: column;
     justify-content: flex-start;
     align-items: flex-start;
     padding: 24px;
     width: calc(100%-302px);
     height: 207px;
     margin-top: 30px;
     background: rgba(231, 89, 53, 0.1);
     box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
     border-radius: 16px;
 }
 
 .card-2 {
   position: relative;
   display: flex;
   padding: 24px;
   width: 720px;
   height: 132px;
   margin-top: 30px;
   background: rgba(231, 89, 53, 0.1);
   box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
   border-radius: 16px;
 
 }
 
 .scooter {
   position: absolute;
   width: 145px;
   height: 80px;
   right: 5.81%;
   bottom: 10.41%;
 }
 .scootertext {
 
   p {
 
     left: calc(50% - 151px/2 - 76px);
     font-weight: 500;
     font-size: 16px;
     line-height: 16px;
     color: #434343;
 
   }
 
   h3 {
 
   left: calc(50% - 172px/2 - 65.5px);
   font-family: 'Manrope';
   font-style: normal;
   font-weight: 700;
   font-size: 20px;
   line-height: 16px;
   color: #E75935;
 
   }
 
 
 }
 .card2 {
      position: relative;
     display: flex;
     flex-direction: column;
     justify-content: flex-start;
     align-items: flex-start;
     padding: 24px;
     width: 720px;
     height: 207px;
     margin-top: 30px;
     background: rgba(231, 89, 53, 0.1);
     box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
     border-radius: 16px;
        
 }
 .images {
   position: absolute;
   left: 0;
   width: 207px;
   height: 207px;
   padding: 0px;
   margin: 0px;
   background: #FFFFFF;
   box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
   border-radius: 16px 0px 0px 16px;
   top: 0px;
 
 }
 .full-width {
 width: 216px;
 height: 46px;
 background: #E75935;
 box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
 border-radius: 100px;
 text-transform: none;
 font-family: 'Manrope';
 font-style: normal;
 font-weight: 600;
 font-size: 18px;
 line-height: 16px;
 }
 
 h3 {
 font-family: 'Manrope';
 font-style: normal;
 font-weight: 600;
 font-size: 28px;
 line-height: 25px;
 }
 .close-icon  {
     position: absolute;
     height: 24px;
     width: 24px;
     right:12px;
     top: 12px;
     background-color: none;
     box-shadow: 0 0 10px 0 rgb(0 0 0 / 20%);
     display: flex;
     justify-content: center;
     align-items: center;  
     border-radius: 50%;
     transition: all 0.4s ease;
     
 }
  .close-icon:hover {
     background-color: var(--q-primary);
     
   }
   .close-icon  img {
     position: absolute;
     
     filter: invert(78%) sepia(1%) saturate(0%) hue-rotate(143deg) brightness(88%) contrast(88%);
     height: 16px;
     transition: all 0.4s ease;
   }
   .close-icon:hover img {
     filter: invert(100%) sepia(8%) saturate(0%) hue-rotate(123deg) brightness(100%) contrast(101%);
   }
 
 .copy-icon {
   position: absolute;
   left: 4.23%;
   right: 93.54%;
   top: 22.73%;
   bottom: 32.73%;
   background: #DDDDDD;
   border: 1px solid #E75935;
 }
 
 .auto-layout {
   display: flex;
   flex-direction: row;
   align-items: center;
   padding: 10px;
   margin-bottom: 10px !important;
   gap: 40px;
   width: 500px;
   height: 40px;
 }
 
 span.product-count {
 width: 28px;
 height: 40px;
 font-family: 'Manrope';
 font-style: normal;
 font-weight: 800;
 font-size: 40px;
 line-height: 40px;
 letter-spacing: 0.44px;
 color: #E75935;
 }
 span.name {
 width: 78px;
 height: 28px;
 font-family: 'Manrope';
 font-style: normal;
 font-weight: 400;
 font-size: 20px;
 line-height: 27px;
 padding: 20px;
 letter-spacing: 0.44px;
 color: #434343;
 }
 
 .line {
 width: 40px;
 height: 0px;
 border: 2px solid #DDDDDD;
 transform: rotate(90deg);
 }
 .chevron {
 width: 100%;
 font-family: 'Manrope';
 font-style: normal;
 font-weight: 400;
 font-size: 14px;
 line-height: 16px;
 display: flex;
 justify-content: flex-end;
 letter-spacing: 0.44px;
 text-decoration-line: underline;
 color: #AAAAAA;
 
 .chevron1 {
 
   border-right: 2px solid lightgray;
   border-bottom: 2px solid lightgray;
   width: 8px !important; height: 4px !important;
   transform: rotate(-45deg);
   cursor: pointer;
   }
 }
 span.title-text {
     font-family: 'Manrope';
     font-style: normal;
     font-weight: 700;
     font-size: 20px;
     color: #E75935;
 }
 
 p.text2 {
     font-family: 'Manrope';
     font-style: normal;
     font-weight: 400;
     font-size: 16px;
     color: #AAAAAA;
     
   
 }
 
 .ig-stories {
 
   height: 100vh;
   height: -webkit-fill-available;
   width: 50vw;
   top: 0;
   background-color: #dddddd;
 }
 
 .mySlidesfade{
   display: flex;
   justify-content:center;
   align-items:center;
   flex-direction: column;
   height: 50vh;
   height: -webkit-fill-available;
   width: 100vw;
   top: 0;
   background: black;
 
  
 }
  #close-btn {
     right: -20px;
   }
 .video-container{
   height: 100%;
   height: -webkit-fill-available;
   width: 28vw;
   margin-top: 40px;
   top: 0;
   background: black;
 }
 
 
 .menu-icon a {
     position: absolute;
     top: -6px;
     right: -4px;
     height: 44px;
     width: 44px;
     background-color: #FFFFFF;
     box-shadow: 0 0 10px 0 rgb(0 0 0 / 20%);
     display: block;
     border-radius: 30px;
     padding: 10px;
     transition: all 0.4s ease;
     z-index:9999;
   }
   .menu-icon a:hover {
     background-color: var(--q-primary);
   }
   .menu-icon a img {
     filter: invert(78%) sepia(1%) saturate(0%) hue-rotate(143deg) brightness(88%) contrast(88%);
     height: 24px;
     transition: all 0.4s ease;
   }
 
   .menu-icon a:hover img {
     filter: invert(100%) sepia(8%) saturate(0%) hue-rotate(123deg) brightness(100%) contrast(101%);
   }
 
  
 
 
 @media (max-width: 600px) {
   .card-section2 {
     margin-left: 150px;
   }
   .text-center {
     font-size: 20px;
   
 }
   .card1 {
     margin-top: 30px;
     padding: 12px 16px;
     gap: 12px;
     width: 94%!important;
     height: 140px;
 }
 .input-1 {
     width: 303px;
     height: 50px;
     padding:0px 0px 10px 2px;
     font-weight: 400;
     font-size: 12px;
     line-height: 16px;
 }
   .socialimg {
     width: 66px;
     height: 66px;
   }
   .circle {
     width: 66px;
     height:66px;
   }
   span.title-text {
     width: 179px;
     font-family: 'Manrope';
     font-style: normal;
     font-weight: 700;
     font-size: 14px;
     line-height: 16px;
   }
 
   q-item-label.product-price {
     width: 179px;
     line-height: 16px;
     font-weight: 500;
     font-size: 14px;
     margin-top: 0px;
     margin-bottom: 5px;
   }
   q-btn.full-width {
     width: 179px;
     height: 32px;
     left: 0px;
     top: 76px;
     margin: 6px 0px;
   }
   .photo-name {
     font-size: 12px;
   }
 
   .auto-layout {
   gap: 10px;
   width: 100%;
   height: 20px;
 }
 
 span.product-count {
 width: 18px;
 height: 40px;
 font-weight: 800;
 font-size: 16px;
 line-height: 40px;
 letter-spacing: 0.44px;
 color: #e75935d3;
 }
 span.name {
 width: 28px;
 height: 40px;
 font-weight: 400;
 font-size: 14px;
 line-height: 27px;
 padding: 20px;
 letter-spacing: 0.44px;
 color: #434343;
 }
 
 .line {
 width: 20px;
 height: 0px;
 border: 2px solid #DDDDDD;
 transform: rotate(90deg);
 }
 .chevron {
 width: 100%;
 font-weight: 400;
 font-size: 14px;
 line-height: 16px;
 display: flex;
 justify-content: flex-end;
 letter-spacing: 0.44px;
 text-decoration-line: underline;
 color: #AAAAAA;
 }
 span.title-text {
     font-family: 'Manrope';
     font-style: normal;
     font-weight: 700;
     font-size: 18px;
     color: #E75935;
 }
 
 p.text2 {
  
     font-weight: 400;
     font-size: 12px;
     color: #AAAAAA;
     word-break: break-word;
     
 }
 .card-section2 {
     .text1{
     font-size: 12px;
     white-space:normal !important;
     margin-top: -10px;
     
    }
    
    
 
     .text2{
     font-weight: 600;
     font-size: 14px;
     line-height: 25px;
     white-space:normal !important;
     margin-top: 20px;
    padding-left: 0px !important;
     
    }
    p {
     font-size: 12px;
     margin-top: -10px;
    }
     .para1 {
     padding-left:10px;
      font-weight: 400;
     font-size: 12px;
     line-height: 16px;
    }
 }
 .card1 {
     padding: 12px 16px;
     gap: 12px;
     width: 335px;
     height: 134px;
     margin-top: 30px;
 }
 
 .card-2 {
   padding: 24px;
   width: 335px;
   height: 94px;
   margin-top: 30px;
   
 }
 .button {
    width: 20px;
    height: 20px;
    right: 32px;
    margin-top: -6px;
 }
 .scooter {
   width: 105px;
   height: 60px;
 }
 .scootertext {
 
   p {
     font-size: 14px;
   }
 
   h3 {
   font-weight: 700;
   font-size: 16px;
   color: #E75935;
 
   }
 
 
 }
 .card2 {
     padding: 12px 16px;
     gap: 12px;
     width: 335px;
     height: 150px;
     margin-top: 30px;
 }
 .images {
   width: 134px;
   height: 134px;
 
 }
 .full-width {
 width: 169px;
 height: 32px;
 font-size: 12px;
 left: 0px;
 }
 
 h3 {
 font-size: 18px;
 }
 .ig-stories {
     position: relative;
     height: 730px;
     width: 420px;
   }
 
 .mySlidesfade{
   height: 100vh; 
 }
 .video-container{
   width: 65vw;
   margin-left: -40px;
   height: 100vh;
   margin-top: -50px;
   margin-bottom: -50px;
 }
 
 .menu-icon a {
     position: relative;
     display: flex;
     justify-content: center;
     align-items: center;
     top: -2px;
     right: -2px;
     height: 30px;
     width: 30px;
     z-index: 999;
   }
  
   .menu-icon a img {
     position: absolute;
     height: 16px;
   }
 .close-icon  {
     
     height: 18px;
     width: 18px;    
     
 }
 }
 
.desktop-view {
  margin: 0 20px 0 320px;
  width: auto!important;
}

 @media (max-width: 900px) {
   .card-section {
     margin-left: 20px;
   }
 }
 
 @media (min-width: 901px) {
   .desktop-view {
     display: block;
   }
   .mobile-view {
     display: none;
   }
   .content {
     padding-top: 52px;
     padding-bottom: 52px;
   }
 }
 
 @media (max-width: 900px) {
   .desktop-view {
     display: none;
   }
   .mobile-view {
     display: block;
   }
 }
 </style>
 