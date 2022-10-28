<template>
  <q-page class="q-pa-md window-height container-page ">
    <div class="column full-height">
      <p v-if="modeCreateProduct=='instagram'" class="text-area">
        ¡Se {{products.length > 1 ? 'agregaron': 'agregó' }} {{ products.length }} producto exitosamente!
        <!-- {{ products.length ? 'Haz swipe' : '' }} -->
      </p>
      <p v-else class="text-area">
        Producto agregado exitosamente¡
      </p>

    
      <!-- The productlist view component in a swipe view scroll-->
      <!-- <q-scroll-area v-if="modeCreateProduct=='instagram'" class="col" > -->
        <!-- <div v-if="modeCreateProduct=='instagram'"  class="row no-wrap q-px-md">

                <q-btn
        v-if="products.length > 1 && index !==0"
          class="btn-class"
          @click="loadLess()"
         
        >
         <q-img src="images/arrow.svg" class="arrow2"></q-img></q-btn>
      
      <div  class="q-px-md main-container" >
          <q-card class="column card-container" >
            <img   :src="productlist[index].image" class="product_img rounded-borders" />
              
            <div class="text-area-new">
              <q-card-section >
                <div class="text-h6 text-subtitle2">{{ productlist[index].name }}</div>
              </q-card-section>
            <q-card-section horizontal >

              <q-card-section >
                <q-item-label caption class="title">Precio</q-item-label>
                <div class="text-subtitle2">
                  {{ $n(fromCentsToUnit(productlist[index].price), 'currency') }}
                </div>
              </q-card-section>

              <q-card-section >
                <q-item-label caption class="title">Stock</q-item-label>
                <div class="text-subtitle2">
                  {{  productlist[index].stock }}
                </div>
              </q-card-section>

            </q-card-section>
            

              <q-card-section >
                <q-item-label caption class="title">Descripción del producto</q-item-label>
                <div class="text-subtitle2" style="left: 10px;">{{ productlist[index].description }}</div>
              </q-card-section>
              

            </div>
            
          </q-card>
          <q-btn
                rounded
                class="q-py-md q-mt-sm button-new"
                color="primary"
                label="¡Crear mi tienda en línea!"
                @click="handleClick"
              >
          </q-btn>

      </div>
     
        <q-btn
         v-if="(products.length > 1) && (index != products.length - 1) "
          class="btn-class1"
          @click="loadMore()"
         
        >
         <q-img src="images/arrow.svg" class="arrow1"></q-img></q-btn>


          
        </div> -->
        <!-- <q-scroll-observer @scroll="scrollHandler" />
      </q-scroll-area> -->
        <q-btn
        v-if="products.length > 1 && index !==0"
          class="btn-class"
          @click="loadLess()"
         
        >
         <q-img src="images/arrow.svg" class="arrow2"></q-img></q-btn>
      
      <div  class="q-px-md main-container" >
          <!-- <product-view
            class="col-12 q-mx-md"
            v-for="product in productlist"
            :key="product.link_id"
            :price="product.price"
            :stock="product.stock"
            :image="product.image"
            :description="product.description"
            :name="product.name"
            :isActive="product.isActive"
          >
          </product-view> -->

          <q-card class="column card-container"  v-touch-swipe.mouse.right.prevent="this.loadLess"  v-touch-swipe.mouse.left.prevent="this.loadMore" >
            <img   :src="products[index].image" class="product_img rounded-borders" />
              
            <div class="text-area-new">
              <q-card-section >
                <div class="text-h6 text-subtitle2">{{ products[index].name }}</div>
              </q-card-section>
            <q-card-section horizontal >

              <q-card-section >
                <q-item-label caption class="title">Precio</q-item-label>
                <div class="text-subtitle2">
                  {{ $n(fromCentsToUnit(products[index].price), 'currency') }}
                </div>
              </q-card-section>

              <q-card-section >
                <q-item-label caption class="title">Stock</q-item-label>
                <div class="text-subtitle2">
                  {{  products[index].stock }}
                </div>
              </q-card-section>

            </q-card-section>
            

              <q-card-section >
                <q-item-label caption class="title">Descripción del producto</q-item-label>
                <div class="text-subtitle2" style="left: 10px;">{{ products[index].description }}</div>
              </q-card-section>
              

            </div>
            
          </q-card>
          <q-btn
                rounded
                class="q-py-md q-mt-sm button-new"
                color="primary"
                label="¡Crear mi tienda en línea!"
                @click="handleClick"
              >
          </q-btn>

      </div>
     
        <q-btn
         v-if="(products.length > 1) && (index != products.length - 1) "
          class="btn-class1"
          @click="loadMore()"
         
        >
         <q-img src="images/arrow.svg" class="arrow1"></q-img></q-btn>
      
       
      </div>
  </q-page>
</template>

<script lang="ts">
import { useFormats } from 'src/factories/useFormats';
import { defineComponent, computed, onMounted, ref } from 'vue';
import { usePostForm } from 'src/factories/usePostForm';
//import InfoPopupVue from 'src/components/dialogs/InfoPopup.vue';
//import ProductPopupVue from 'src/components/dialogs/ProductPopup.vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { useStore } from 'src/store';



// import { scroll } from 'quasar'
export default defineComponent({
  // components: {
  //   ProductView
  // },
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const store = useStore()
    const { fromCentsToUnit } = useFormats();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
    const modeCreateProduct = computed( () => store.getters['createProduct/currentMode']);
    //Get recent products created from form or stripe
     const { products } = usePostForm();
    console.log("products are : ", products);
    //  onMounted( () => {
      
    //   $q.dialog({
    //    component: ProductPopupVue,
    //     componentProps: {
    //       message: 'Parece que faltan datos a completar en este producto y no se puede compartir.',
    //       title: '¡Oh no! 👀',
    //     }
    // });

    //  });
    const handleClick = async () => {
      //show dialog explaining what to do next
      /*$q.dialog({
        component: InfoPopupVue,
      });*/
      await router.push('/');
    };
    
    

//     const productlist = [{
//   "username": "vendeenlineamexico",
//   "url": "https://buy.stripe.com/7sIfZ96IDcHt2jKbKI",
//   "image": "images/header.png",
//   "description": "product item 1",
//   "uid": "h78U5bNkLlV8sAsghpOD",
//   "link_id": "h78U5bNkLlV8sAsghpOD",
//   "price": 40000,
//   "stock": 3,
//   "id": 1,
//   "isActive": true,
//   "date": {
//     "seconds": 1651657168,
//     "nanoseconds": 988000000
//   },
//   "name": "rere"
// },
// {
//   "username": "vendeenlineamexico",
//   "url": "https://buy.stripe.com/7sIfZ96IDcHt2jKbKI",
//   "image": "images/arrow.svg",
//   "description": "product item 2",
//   "uid": "h78U5bNkLlV8sAsghpOD",
//   "link_id": "h78U5bNkLlV8sAsghpOD",
//   "price": 40000,
//   "stock": 3,
//   "id": 1,
//   "isActive": true,
//   "date": {
//     "seconds": 1651657168,
//     "nanoseconds": 988000000
//   },
//   "name": "rere"
// },
// {
//   "username": "vendeenlineamexico",
//   "url": "https://buy.stripe.com/7sIfZ96IDcHt2jKbKI",
//   "image": "images/cancel.svg",
//   "description": "product item 3",
//   "uid": "h78U5bNkLlV8sAsghpOD",
//   "link_id": "h78U5bNkLlV8sAsghpOD",
//   "price": 40000,
//   "stock": 3,
//   "id": 1,
//   "isActive": true,
//   "date": {
//     "seconds": 1651657168,
//     "nanoseconds": 988000000
//   },
//   "name": "rere"
// }
// ]
    return {
      products,
      handleClick,
      modeCreateProduct,
      slide: ref(1),
      fromCentsToUnit,
    };
  },

  data() {
    return {
       index: 0
     
    };
  },
  methods: {
    loadMore() {
      this.index = this.index + 1;
    },
     loadLess() {
      this.index = this.index - 1;
    }
  },

});
</script>

<style lang="scss" scoped>

.container-page{
    max-height: 100vh;
    overflow-y: scroll;
    overflow-x: hidden;
    left: -10px;

    
  }
.full-height {
  display: flex;
  align-items: center;
}


.text-area {
  position: absolute;
  width: 644px;
  height: 45px;
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 600;
  font-size: 32px;
  line-height: 45px;
  text-align: center;
  color: #E75935;
  text-transform: none;
  text-align: center;
}

// new css

 .product_img {
     position: absolute;
    width: 484px;
    height: 481.61px;
    filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25));
     border-radius: 16px 0px 0px 16px !important;
  }

  .main-container {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;

  }
 
  .card-container {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 38.4px;
    width: 950px;
    height: 481.61px;
    background: #FFFFFF;
    box-shadow: 0px 0px 12.8px rgba(0, 0, 0, 0.16);
    border-radius: 25.6px;
    margin-top: 100px ;

  }
  .text-area-new {
    position: absolute;
    width: 45%;
    height: 100%;
    display: flex;
    flex-wrap: break-word;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding-top: 100px;
    overflow: hidden;
    left: 52%;
}
 .stock {
  display: flex;
  flex-direction: row;
 
 }
 .space {
  left: -40% !important;
 }
 .space-stock {
  right:10% !important;
 }
//  .space1 {
//   left: -55% !important;
//  }
 .text-subtitle2 {
    font-weight: 600;
    font-size: 25.6px;
    line-height: 35px;
    color: #001E32;
    overflow: hidden;
    word-wrap: break-word;
    font-family: 'Manrope';
    font-style: normal;
 }
 .title {
    font-weight: 500;
    font-size: 19.2px;
    line-height: 26px;
    color: #AAAAAA;
    font-family: 'Manrope';
    font-style: normal;
 }
 .button-new {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 25.6px;
    width: 395.8px;
    height: 82.2px;
    background: #E75935;
    border-radius: 100px;
    text-transform: none;
    font-weight: 700;
    font-size: 22.4px;
    line-height: 31px;
    margin-top: 40px;
    text-decoration: none;
    text-transform: none;
}

.btn-class {
position: absolute;
width: 60px;
height: 60px;
left: 100px;
top: 328px; 
background: #FFFFFF;
box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
border-radius: 1000px;
transform: rotate(-90deg);
}
.btn-class1 {
position: absolute;
width: 60px;
height: 60px;
right: 100px;
top: 328px; 
background: #FFFFFF;
box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
border-radius: 1000px;
transform: rotate(-90deg);
}

.arrow1 {
 position: absolute;
 width: 24px;
 height:24px;
transform: rotate(90deg);
}
.arrow2 {
 position: absolute;
 width: 24px;
 height:24px;
transform: rotate(-90deg);
}

.price-container{
  display: flex;
  justify-content: right;
  
}
 @media(max-width:600px){
    .product_img {
    width: 335px;
    height: 335px;
    top: 0px;
    left: 0px;
    border-radius: 16px 16px 0px 0px !important;
    }
    .card-container {
        width: 335px;
        height: 578px;
        flex-direction: column;
    }
    .text-area {
font-size: 20px;
 
}
     .text-area-new {
    position: absolute;
    display: flex;
    padding-top: 0px;
    width: 100%;
    left: 0px;
    top: 60%;

}
.button-new {
  padding: 16px;
  gap: 10px;
  width: 303px;
  height: 51px;
}

 .text-subtitle2 {
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
 }
 .title {
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
 }
.btn-class {
display: none;
}
.btn-class1 {
display: none;
}
  }

</style>



