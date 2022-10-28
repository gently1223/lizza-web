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

  <q-page v-if="!showStory">
    <div class="card-section">
      <div class="justify-center q-mx-md card1" style="background: #fff; display: flex; flex-direction: row; justify-content: space-between; height: auto!important; padding: 16px!important">
        <div style="display: flex; flex-direction: row; justify-content: flex-start; align-items: center;padding: 10px">
          <q-toolbar-title>
            🛍 Mi tienda
          </q-toolbar-title>
        </div>
        <q-btn
          class="blue-grey-3"
          flat
          :size="'xl'"
          :label="'>'"
          @click="goToProduct"
        >
        </q-btn>
      </div>
    </div>

    <div class="card-section">
      <div class="justify-center q-mx-md card1" style="background: #fff; display: flex; flex-direction: row; justify-content: space-between; height: auto!important; padding: 16px!important">
        <div style="display: flex; flex-direction: row; justify-content: flex-start; align-items: center;padding: 10px">
          <q-toolbar-title>
            📞 Datos de contacto
          </q-toolbar-title>
        </div>
        <q-btn
          class="blue-grey-3"
          flat
          :size="'xl'"
          :label="'>'"
          @click="goToProduct"
        >
        </q-btn>
      </div>
    </div>

    <div class="card-section">
      <div class="justify-center q-mx-md card1" style="background: #fff; display: flex; flex-direction: row; justify-content: space-between; height: auto!important; padding: 16px!important">
        <div style="display: flex; flex-direction: row; justify-content: flex-start; align-items: center;padding: 10px">
          <q-toolbar-title>
            🏦 Datos bancarios
          </q-toolbar-title>
        </div>
        <q-btn
          class="blue-grey-3"
          flat
          :size="'xl'"
          :label="'>'"
          @click="goToProduct"
        >
        </q-btn>
      </div>
    </div>

    <div class="card-section">
      <div class="justify-center q-mx-md card1" style="background: #fff; display: flex; flex-direction: row; justify-content: space-between; height: auto!important; padding: 16px!important">
        <div style="display: flex; flex-direction: row; justify-content: flex-start; align-items: center;padding: 10px">
          <q-toolbar-title>
            👀 Ver como se ve mi tienda
          </q-toolbar-title>
        </div>
        <q-btn
          class="blue-grey-3"
          flat
          :size="'xl'"
          :label="'>'"
          @click="goToProduct"
        >
        </q-btn>
      </div>
    </div>

    <div class="card-section">
      <div class="justify-center q-mx-md card1" style="background: #fff; display: flex; flex-direction: row; justify-content: space-between; height: auto!important; padding: 16px!important">
        <div style="display: flex; flex-direction: row; justify-content: flex-start; align-items: center;padding: 10px">
          <q-toolbar-title>
            🔑 Cambiar contraseña
          </q-toolbar-title>
        </div>
        <q-btn
          class="blue-grey-3"
          flat
          :size="'xl'"
          :label="'>'"
          @click="goToProduct"
        >
        </q-btn>
      </div>
    </div>

    <div class="card-section">
      <div class="justify-center q-mx-md card1" style="background: #fff; display: flex; flex-direction: row; justify-content: space-between; height: auto!important; padding: 16px!important">
        <div style="display: flex; flex-direction: row; justify-content: flex-start; align-items: center;padding: 10px">
          <q-toolbar-title>
            ℹ️ Información 
          </q-toolbar-title>
        </div>
        <q-btn
          class="blue-grey-3"
          flat
          :size="'xl'"
          :label="'>'"
          @click="goToProduct"
        >
        </q-btn>
      </div>
    </div>
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
width: 720px;
height: 168px;
background: #FFFFFF;
box-shadow: none;
position: relative;

}

.storycontainer {
  width: 100%;
  height: 100vh;
}
.socialmedia {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0px 50px;
  margin-top: 60px;
}
.text-center {
    position: absolute;
    font-size: 28px;
}
span{
   margin-bottom: 4px;
}
.input-1 {
    display:flex; 
    position: relative;
    width: 672px;
    height: 54px;
    background: #FFFFFF;
    align-content: center;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
    border-radius: 100px;
    overflow: hidden;
    color: #434343;
    font-weight: 600;
    font-size: 20px;
    line-height: 27px;
   
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
  width: 76px;
  height:76px;
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
   position: absolute;
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   align-content: center;
   margin-left: 210px;
   width: 335px;
   
   .text1 {
    font-weight: 600;
    font-size: 18px;
    line-height: 25px;
    color: #001E32;
    white-space: nowrap;
    padding-left: 0px !important;
   }

   .text2{
    
    font-weight: 700;
    font-size: 18px;
    letter-spacing: 2px;
    line-height: 25px;
    color: #001E32;
    white-space: nowrap;
    padding-left: 120px;
    
    
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
.card12 {
  margin-bottom: 100px !important;
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
left: 80px;
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
  .shadow-1 {
    width: 335px;
    height: 132px;
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



  .socialmedia {
    padding: 0px 10px;
    margin-top:40px;
  }
  .socialimg {
    width: 46px;
    height: 46px;
  }
  .circle {
  width: 56px;
  height:56px;
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
   margin-left: 130px;
   width: 169px;

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

@media (max-width: 900px) {
  .card-section {
    margin-left: 20px;
  }
}
</style>
