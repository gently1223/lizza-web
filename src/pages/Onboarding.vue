
<template>

  <q-page class="q-pa-md" v-touch-swipe="handleSwipe" >
    <div class="slideshow-container mobileslide" v-if="video === 1 || slide === 1 " v-touch-swipe="handleSwipe">
    <img src="images/clay iphone.png"/>


      <div class="mySlidesfade" >
            <video  poster="videos/video1.mp4" loop autoplay muted playsinline style="margin: 15px; overflow: hidden;">
          <source src="videos/video1.mp4" type="video/mp4"/>
          </video>

          <div class="text-box">
              <span style="color:001E32;font-weight:bold;">Crea tu catálogo con Instagram</span>
              <p style="color:434343;font-weight:medium">
                 Elige tus posts de Instagram con tus productos, añade el precio y descripción, crea tu catálogo y compártelo, ¡así de fácil!
              </p>
          </div>
      </div>

      <div class="q-button">
          <q-btn flat style="color: #848484;text-transform: capitalize;" label="Saltar" @click="handleClick" />
          <btn class="dot" v-bind:class="{ dotclicked: clicked || video === 1 || slide === 1}"  @click="currentSlide(1)"></btn>
          <btn class="dot" v-bind:class="{ dotclicked: clicked && video === 2}"  @click="currentSlide(2)"></btn>
          <btn class="dot" v-bind:class="{ dotclicked: clicked && video === 3}"  @click="currentSlide(3)"></btn>


           <q-btn flat style="color: #848484;text-transform: capitalize;" label="Siguiente" @click="currentSlide(2)" />

      </div>

    </div>
    <div class="slideshow-container mobileslide" v-if="video === 2 || slide === 2" v-touch-swipe="handleSwipe">
    <img src="images/clay iphone.png"/>


      <div class="mySlidesfade" >
          <video  poster="videos/video2.mp4" loop autoplay muted playsinline style="margin: 15px; overflow: hidden;">
          <source src="videos/video2.mp4" type="video/mp4"/>
          </video>

          <div class="text-box">
              <span style="color:001E32;font-weight:bold;">¿A dónde te enviamos el dinero?</span>
              <p style="color:434343;font-weight:medium">
                 Cobra a tus clientes con seguridad y privacidad. Recuerda añadir tu cuenta para recibir tus pagos una vez hayas enviado el producto.
              </p>
          </div>
      </div>

      <div class="q-button">
          <q-btn flat style="color: #848484;text-transform: capitalize; " label="Saltar" @click="handleClick" />
          <div class="dot-class">
          <btn class="dot" v-bind:class="{ dotclicked: clicked && video === 1}"  @click="currentSlide(1)"></btn>
          <btn class="dot" v-bind:class="{ dotclicked: clicked && video === 2 || slide === 2}"  @click="currentSlide(2)"></btn>
          <btn class="dot" v-bind:class="{ dotclicked: clicked && video === 3}"  @click="currentSlide(3)"></btn>
            </div>
          <q-btn flat style="color: #848484;text-transform: capitalize;" label="Siguiente" @click="currentSlide(3)"/>

      </div>
      </div>

    <div class="slideshow-container mobileslide" v-if="video === 3 || slide === 3" v-touch-swipe="handleSwipe">
    <img src="images/clay iphone.png"/>


      <div class="mySlidesfade" >
          <video  poster="videos/video3.mp4" autoplay muted playsinline style="margin: 15px; overflow: hidden;">
          <source src="videos/video3.mp4" type="video/mp4"/>
          </video>

          <div class="text-box">
            <span style="color:001E32;font-weight:bold;">Comparte y empieza a vender</span>
            <p style="color:434343;font-weight:medium">
              Tu catálogo y tus productos siempre accesibles para compartir con clientes en redes sociales… ¡y muy pronto tendremos nuevas funcionalidades para Instagram!
            </p>
          </div>
      </div>

      <div class="q-button">
          <div>
          <btn class="dot" v-bind:class="{ dotclicked: clicked && video === 1}"  @click="currentSlide(1)"></btn>
          <btn class="dot" v-bind:class="{ dotclicked: clicked && video === 2}"  @click="currentSlide(2)"></btn>
          <btn class="dot" v-bind:class="{ dotclicked: clicked && video === 3 || slide === 3}"  @click="currentSlide(3)"></btn>
          </div>

           <q-btn flat style="color: #848484;text-transform: capitalize;" label="Comenzar" @click="handleClickFinish" />

      </div>

    </div>

  </q-page>
</template>

<script >
import { onMounted } from 'vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useInstaApi } from 'src/factories/useInstaApi';
import { usePostForm } from 'src/factories/usePostForm';
import { useAuthApi } from 'src/factories/useAuthApi';
import { useQuasar } from 'quasar';
import Loader from 'src/components/Loader.vue';
//import { analytics } from 'boot/firebase';
import { useProductApi } from 'src/factories/useProductApi';
// import HamburguerMenu from 'src/components/HamburguerMenu.vue';

export default {
  //components: { HamburguerMenu },
  // eslint-disable-next-line vue/no-unused-components
  components: {  Loader },
  setup() {
    const $q = useQuasar();
    const info = ref(null);
    const $router = useRouter();
    const { getPosts, posts } = useInstaApi();
    const { posts: formPosts, getPostImage, clean } = usePostForm();
    const { logout, user } = useAuthApi();
    const { products } = useProductApi();
    // user.value.displayName
    onMounted(async () => {
      console.log('This: ', this)
      clean();
      this.video = 1;
      this.slide = 1;
      $q.loading.show({
        spinner: Loader,
        spinnerColor: 'orange',
        spinnerSize: 140,
        backgroundColor: 'white',
        message: 'Buscando posibles productos',
        messageColor: 'white',
      });
      await getPosts();
      $q.loading.hide();
    });
    // const postDisabled = (value) => {
    //   return formPosts.value.length > 0 && !formPosts.value.includes(value);
    // };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    const handleClick = async () => {
      // Go to login
      await $router.push('/login');
    };

    const handleClickFinish = async () => {
      // Go to login
      //await $router.push('/posts');
      await $router.push('/create-product-options');

    };
    return {
      posts,
      formPosts,
      user,
      products,
      // postDisabled,
      getPostImage,
      logout,
      handleClick,
      handleClickFinish,
      info,
    };
  },
  data() {
    return {
    video: 1,
    slide: 1,
    clicked: false
    }
  },

  methods: {
    handleSwipe  ({ ...newInfo }) {
       console.log('event:', newInfo);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if(newInfo.direction === 'right' && this.video === 1){
        this.slide = 2;
        this.video = 2;
        } else if(newInfo.direction === 'right' && this.video === 2){
        this.slide = 3;
        this.video = 3;
        }else if(newInfo.direction === 'left' && this.video === 2 ){
        this.slide = 1;
        this.video = 1;
        }else if(newInfo.direction === 'left' && this.video === 3 ){
        this.slide = 2;
        this.video = 2;
        }
        // native Javascript event
        return;
      },
    currentSlide(value) {
    this.clicked = true;
    console.log(value)
        if(value == 1){
        this.video = 1;
        this.slide =1;
        } else if(value == 2){
        this.video = 2;
        this.slide = 2;
        }else if(value == 3){
        this.video = 3;
        this.slide = 3;
        }
          return;
      }

    }
};
</script>

<style lang="scss" scoped>

.second {
  font-size: 1.3em;
}

.my-card {
  border-radius: 13px;
  border: 1px solid rgba(0, 0, 0, 0.247);
  height: 50%;
  margin: 4%;
}

.check {
  .q-checkbox__bg {
    border-radius: 50%;
  }
}

.mySlidesfade {
margin-bottom: 180px;
overflow: hidden;
}

video {
 width: 200px;
 height: 432px;

}
.text-box{
position: absolute;
width: 634px;
text-align:center;
height: 115px;
left: 403px;

 span{
 font-size: 36px;
 }

 p{
 font-size: 20px;
 font-weight: medium;
 text-align: center;
 }

}


.mobileslide{width:231px;height:463px;margin:auto;}
.slides{width:231px;height:463px;display: flex;margin:auto;}
.mobileslide img{width: inherit;height: inherit;position: absolute;z-index: 99;}


@media(min-width:600px){
.mobileslide{width:231px;height:463px;margin:auto;padding-top: 20px;padding-bottom: 20px}
.slides{width:231px;height:463px;display: flex;margin:auto;}
}

@media(max-width:600px){
video {
 width: 160px;
 height: 380px;
}
.mobileslide{width:200px;height:380px;margin:auto;}
btn.dot {
width: 16px;
height: 16px;
}
.active, btn.dot:hover {
background-color: #e75935;
width: 24px;
height: 16px;
border-radius: 100px;
}
.q-button{
width: 335px;
font-size: 14px;
display: flex;
gap: 10px;
}
.mySlidesfade {
margin-bottom: 120px;
}
.text-box{
position: absolute;
width: 335px;
height: 97px;
left: 20px;
span{
font-size: 20px;
}

p{
font-size: 16px;
font-weight: medium;
}
}

}
/* The dots/bullets/indicators */
.q-button{
font-size: 18px;
font-weight: medium;
text-align: center;
align-items: center;
width: 634px;
display: flex;
gap: 12px;
left: 403px;
a{
color:848484;
text-decoration: none;
}
}
.dot {
  cursor: pointer;
  width: 28px;
  height: 28px;
  margin: 0 2px;
  background-color: lightgray;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;
}

.dotclicked {
  cursor: pointer;
  width: 50px;
  height: 28px;
  border-radius: 100px;
  margin: 0 2px;
  background-color: #e75935;
  display: inline-block;
  transition: background-color 0.6s ease;
}
.dot-class{
display: flex;
justify-content: center;
gap: 10px;
}


.active, .dot:hover {
  background-color: #e75935;
  width: 50px;
  height: 28px;
  border-radius: 100px;
}


</style>
