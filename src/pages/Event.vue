<template>
   <q-toolbar class="shadow-1">
        <q-toolbar-title class="text-center">
          <span class="text-primary text-bold">
            Live Selling
          </span>
        </q-toolbar-title>
       
         
    </q-toolbar>
     <div class="menu" @click="() => onClickShow()">
         <HamburguerMenu > </HamburguerMenu>
     </div>

     
        
       <div id="onlive-landing"></div>
            <component :is="'script'">
                (function (w, d, s, o, f, js, fjs) {
                    w.onliveWidgets = w.onliveWidgets || {};
                    w['Onlive-Widget-tv'] = w.onliveWidgets['Onlive-Widget-tv'] = o;
                    w['directLoad'] = true;
                    w[o] =
                        w[o] ||
                        function () {
                            (w[o].q = w[o].q || []).push(arguments);
                        };
                    (js = d.createElement(s)), (fjs = d.getElementsByTagName(s)[0]);
                    js.id = o;
                    js.src = f;
                    js.async = 1;
                    fjs.parentNode.insertBefore(js, fjs);
                })(window, document, 'script', 'onliveWtv', "https://cdn.onlive.site/widget/v2/onlive-widget.js");
                onliveWtv('init', {
                    landing: true,
                    targetElementId: 'onlive-landing',
                    organizationId: "201cd3d1-e6c9-4e3c-b41c-fd7a284fc66d",
                });
            </component>
        


    
    <!-- <q-page class="container">
     
      <div class="text-h6" style="align-items: flex-start;padding-left: 20px;font-weight: 700;font-size: 32px;">Próximo evento</div>
     <div class="q-pa-md">
     <q-card class="my-card">
     
        <div class="cont-avatar">
         <q-avatar class="avatar">
          <img src="images/testing/avatar.svg" />
        </q-avatar>
        <div class="heading" >@danipreciadoc</div>
        </div>
         <div class="text">Conoce las últimas tendencias de la moda para tus outfits veraniegos. Trajes de baño, salidas, vestidos, sombreros y mucho más para que armes tu closet ideal. </div>
     
      <q-card-section>
        <div class=" q-mx-md product-area">
            <div class="column product-list" v-for="product in products"  :key="product.link_id">
                        <img :src="product.image" class="img-list" />       
            </div>
            <div class="column product-list" >
                        <img src="images/testing/image1.svg" class="img-list" /> 
                        <div class="bottom-left">@azulcielito</div>      
            </div>
            <div class="column product-list" >
                        <img src="images/testing/image2.svg" class="img-list" />  
                        <div class="bottom-left">@pau.crochet.mx</div>       
            </div>
            <div class="column product-list" >
                        <img src="images/testing/image3.svg" class="img-list" />   
                        <div class="bottom-left">@garrufamx</div>      
            </div>
          
        </div>
      </q-card-section>
    </q-card>
     <q-separator class="separador" style="margin-top: 40px;" color="1px solid #DDDDDD" inset />
    <div class="container1"> 
        <div>
         <h4 > ¿Quieres ser el próximo?</h4>
         <h6 > Deja tu correo aquí abajo y te contactaremos</h6>
        </div>
          
         <div class="button"  >
             <h6> {{  email }}</h6>
             <q-btn round color="#E75935;" icon="arrow_forward" class="btn-round"  />

            
    </div>
   </div>
  </div>
    </q-page> -->
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import HamburguerMenu from 'src/components/HamburguerMenu.vue';
import { useProductApi } from 'src/factories/useProductApi';
import { useUserApi } from 'src/factories/useUserApi';

const { user } = useUserApi();
const email = user.value?.email;

export default defineComponent({
  components: { HamburguerMenu },
  setup() {
    const router = useRouter();
    const { products } = useProductApi();
    
    console.log('products are:', products)
     const goToSettings = async () => {
      await router.push('/settings');
    }
  
    return {products, email, goToSettings};

  },
  data() {
    return {
    isOpened: false,
    }
  },
  methods: {
  
  onClickShow() {
    this.isOpened = true;
   
  },
  }
  
  
  });

</script>

<style lang="scss" scoped>

html,
body {
    
 overflow: scroll;

}

.shadow-1 {
    position: relative;
    width: 100%;
    height: 80px;
    left: 0px;
    margin-bottom:10px;
    top: 0px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
    
}

.tv-widget {
    margin-top: -60px;
    z-index: -1;
 
}
.widget {
   width: 100%;
    
}
.container{
    display: flex;
    margin: 0 auto;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    gap: 24px;
    width: 866px;
    height: 510px; 
    left: -10px;
    z-index: -1;
     margin-top: -10px;
}
.my-card {
    display: flex;

    align-items: flex-start;
    flex-direction:column;
    width: 866px;
    height: 410px;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    font-weight: 400;
    font-size: 18px;
    line-height: 25px;
    color: #434343;
}
.button {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 20px 32px;
    gap: 10px;
    width: 541px;
    height: 72px;
    box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.15);
    border-radius: 100px;
}
.container1{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.avatar{
    size: 81px;
}
h4{font-weight: 700;font-size: 32px;line-height:0px;color: #001E32;}
h6{font-weight: 500;font-size: 18px;line-height:0px;color: #AAAAAA;}

.btn-round{
    background: #E75935;
}


.product-area {
flex-wrap: wrap;
display: flex;
justify-content: space-evenly !important;
width: 100%;
}

.img-list{
width: 160px;
height: 160px;
}
.product-list {
    position: relative;
    display: flex;
    padding: 20px 92px 0px 25px;
}
.cont-avatar{
    display: flex;
    justify-content:flex-start;
    margin: 20px;
}
.text{
 margin: 10px;
}

.heading{
    padding-left: 30px;
    font-weight: 800;
    font-size: 28px;
    line-height: 38px;
}
.bottom-left {
    position: absolute;
    bottom: 10px;
    left: 22px;
    color: #FFFFFF;
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;
}
@media(max-width:600px){

.shadow-1 {
    height: 64px;
    margin-bottom:10px;
}

.container{
    gap: 12px;
    width: 335px;
    height: 234px;
    margin-top: 80px;
    left: -10px;
}

.tv-widget {
    margin-left: 14px;
    width: 350px;
    height: 400px;
    margin-top: -30px;
    z-index: -1;
   
}
.my-card {
    padding: 16px;
    gap: 12px;
    width: 335px;
    height: 234px;
    border-radius: 16px;
    font-size: 10px;
    
}
.button {
    padding: 8px 16px;
    gap: 10px;
    width: 335px;
    height: 50px;
}
.container1{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content:flex-start;
}
.avatar{
    size: 66px;
}
h4{font-size: 20px;line-height:0px}
h6{font-size: 14px; line-height:0px;}

.img-list{
width: 86px;
height: 86px;
}
.product-list {
padding:0px;
padding-right: 4px;
justify-content:space-between;
flex-direction:row;
}

.product-area {
flex-wrap: wrap;
display: flex;
justify-content:space-between;
flex-direction: row;
margin-top: -10px;
margin-left: -10px;
}

.text {
font-weight: 400;
font-size: 10px;
line-height: 14px;
color: #434343;
margin: 0px;
}
.cont-avatar {
    display: flex;

     margin: 0px;

}

.heading{
    padding-left: 20px;
    font-size: 18px;
    line-height: 25px;
}
.bottom-left {
    left: 3px;
    bottom: 7px;
    font-weight: 700;
    font-size: 10px;
    line-height: 14px;
}
}    


@media(max-width:420px) {
    .tv-widget {
        margin-left: 30px;
    }
    .container{
        margin-top: 30px; 
    }
}
@media(max-width:395px) {
    .tv-widget {
        margin-left: 22.5px;
    }
}
@media(max-width:380px) {
    .tv-widget {
        margin-left: 12px;
    }
    .container{
        margin-top: 30px; 
    }
    
}
@media(max-width:360px) {
    .tv-widget {
        margin-left: 6px;
    }
    .container{
        margin-top: 30px; 
    }
}
</style>
