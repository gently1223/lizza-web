<!-- eslint-disable vue/valid-v-for -->
<template>
  <div class="card-section">
    <div class="product-description">
    <div v-if="numberImages === 1" class="image-section">
      <img :src="getImage" />
    </div>
    <div v-else class="slices-image">
      <q-carousel
      animated
      v-model="slide"
      arrows
      navigation
      infinite
      height="240px"
      >

      <q-carousel-slide v-for="(img, index) in imagesSrc" :name="index" :img-src="img" :v-bind="img" />

    </q-carousel>
    </div>
    <div class="text-h6 text-title">{{ name }}</div>
    <label style="color: green;" v-if="isTest">TEST</label>
    <div class="text-subtitle2 price">
      {{ $n(fromCentsToUnit(price), 'currency') }}
    </div>

    <p>Cant.</p>
    <div class="cart-box">
      <div class="btn-class">
        <q-btn
          flat
          class="btns"
          :disabled="disabledDecrement"
          @click="(decrement)"
          >-</q-btn
        >
        <p
          style="
            font-weight: 500;
            font-size: 20px;
            color: #001e32;
            padding-top: 8px;
            align-items: center;
          "
        >
          {{ counter }}
        </p>
        <q-btn
          flat
          class="btns"
          :disabled="disabledIncrement"
          @click="(increment)"
          >+</q-btn
        >
      </div>
    </div>
    <div class="basket">
      <div class="cart-box">
        <div class="cart-img-box">
          <q-btn
            flat
            style="
              background: white;
              border: none;
              margin-bottom: 10px;
              top: -8px;
            "
          >
            <q-img
              src="images/cart.svg"
              class="cart-img"
              @click="addProductToCar"
            >
            </q-img>
          </q-btn>
        </div>
      </div>
      <q-btn
        class="full-width-btn"
        dense
        color="primary"
        label="Comprar ahora"
        @click="goToPay()"
      ></q-btn>
    </div>

    </div>
    <div class="related-products">
      <q-separator class="separador" color="1px solid #DDDDDD" inset />
    <div class="description"></div>
    <div style="padding: 0px 0px 20px 16px">
      <q-item-label caption>Descripción del producto</q-item-label>
      <div class="text-subtitle2">{{ description }}</div>
    </div>
    <div>
      <q-item-label caption style="padding: 0px 0px 20px 16px">Productos relacionados</q-item-label>
      <div class="justify-center q-mx-md product-area">
        <div
          class="column product-list"
          v-for="product in products"
          :key="product.link_id"
          @click="goToProduct(product.uid as string)">
          <img :src="product.image" class="img-list"/>
          <figcaption class="description-text" style="font-weight: 500; font-size: 14px; line-height: 22px">{{ product.name }}</figcaption>
        </div>
      </div>
        <div class="load">
          <q-btn rounded class="load-btn" @click="catalogo">
            <span class="text-primary text-bold"> Ver cátalogo </span>
          </q-btn>
        </div>
    </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useFormats } from 'src/factories/useFormats';
import { defineComponent, ref, computed } from 'vue';
import { useProductApi } from 'src/factories/useProductApi';
import { useRouter } from 'vue-router';
import { useStore } from 'src/store';
import { useQuasar } from 'quasar';
import { ProductInCart } from './models';
import ConfirmVue from './dialogs/Confirm.vue';

export default defineComponent({
  props: {
    closeModal: {
      type: Function,
      default: () => ({}),
    },
    price: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    productLink: {
      type: String,
      default: '',
    },
    stock: {
      type: Number,
      default: 0,
    },
    url: {
      type: String,
      default: '',
    },
    link_id: {
      type: String,
      default: '',
    },
    originalProduct: {
      type: Object,
    },
    username: {
      type: String,
    },
    isTest: {
      type: Boolean,
      default: false,
    },
    dimensions: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {
        height: 0,
        width: 0,
        length: 0,
        weight: 0,
        aditional_data: ''
      }
    }
  },

  setup(props) {
    const { fromCentsToUnit } = useFormats();
    const { products } = useProductApi();
    const { product } = useProductApi();
    const router = useRouter();
    console.log('productss:', products);
    products.value.forEach((element, index) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const imagesFromPRoduct = element.image as string;
      const myimages = imagesFromPRoduct.split('|');
      console.log('La imagen a agregar es myimages 167: --> ', myimages[0]);
      products.value[index].image = myimages[0];
    });
    const store = useStore();
    const $q = useQuasar();

    const productlist = [
      { name: 'hello', image: 'sidebar/close.svg' },
      { name: 'hello', image: 'sidebar/close.svg' },
    ];

    const counter = ref(1);
    const increment = () => {
      counter.value++;
    };
    const decrement = () => {
      counter.value--;
    };
    const disabledDecrement = computed(() => {
      return counter.value == 1;
    });

    const disabledIncrement = computed(() => {
      return counter.value == props.stock;
      // TODO: Constultar info desde BDD
    });

    const onClickClientShow = async () => {
      await router.push('/clientinfo');
    };

    const addProductToCar = () => {
      //Para cuando regrese esta tarde, Dios mediante: 'Asegurarme de que el uid se esté enviando'
      //const productSelected = products.value.find( (item) => item.link_id === linkId);
      const test = {...props.originalProduct}
      const productToCart: ProductInCart = {
        ...props.originalProduct,
        url: props.url,
        name: props.name,
        amount: counter.value,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        dimensions: test.dimensions
      };
      store.commit('shoppingCart/updateProduct', productToCart);

      $q.notify({
        color: 'green-4',
        textColor: 'white',
        message: 'Producto incluido en el carrito',
      });
    };

    const catalogo = async () => {
      await router.push(`/${props.username as string}`);
    };

    const goToPay = () => {
      $q.dialog({
        component: ConfirmVue,
        componentProps: {
          title: '¿Está seguro desea realizar el pago?',
        },
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      }).onOk(async () => {
        //window.location.href = url;
        addProductToCar();
        //await router.push('/datos-envio')
        await showShippingData();
      });
    }

    const showShippingData = async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const routerPart = product.value.uid;
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      const uXFromViewRoute = `/link/${routerPart}`
      store.commit('shoppingData/setuXFromViewRoute', uXFromViewRoute);
      await router.push('/datos-envio');
    }

    const getimages = (value: string) => {
      let srcImages = '';
      if(value[value.length-1] === '|'){
        srcImages = value.slice(0, value.length-1);
      }else{
          srcImages = value;
      }
      const myimages = srcImages.split('|');
      myimages.forEach(val => console.log(val, myimages.length))
      return myimages
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const getImage = computed(()=>{
      console.log('My image is: ', props.image);
      return getimages(props.image)[0];
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const imagesSrc = computed(()=>{
      return getimages(props.image);
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const numberImages = computed(()=>{
      return getimages(props.image).length;
    });
    const goToProduct = async (uuid: string) => {
      console.log(`Vamos ir a: /link/${uuid}`);
      await router.push(`/link/${uuid}`);
    }
    return {
      goToProduct,
      fromCentsToUnit,
      products,
      productlist,
      product,
      onClickClientShow,
      increment,
      decrement,
      disabledDecrement,
      disabledIncrement,
      counter,
      addProductToCar,
      catalogo,
      goToPay,
      getimages,
      getImage,
      imagesSrc,
      numberImages,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      slide: ref(1),
      showShippingData
    };
  },
  data() {
    return {
      length: 3,
      show: false,
      isOpened: false,
    };
  },
  methods: {
    updateQuantity() {
      console.log('');
    },
    removeFromCart() {
      console.log('');
    },
    // eslint-disable-next-line vue/no-dupe-keys
    addProductToCar() {
      this.show = true;
      this.isOpened = true;
    },

    addToCart() {
      console.log('');
    },
  },
});
</script>

<style lang="scss" scoped>
.card-section {
  margin: 0px 0px 100px 0px;
  display: block;
  // border: 3px solid green;
}

.image-section {
  width: 40%;
}

img {
  width: 335px;
  height: 335px;
  filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25));
  border-radius: 20px;
}
.related-products{
  display: block;
  // flex-direction: column;
  // justify-content: space-between;
  margin: 0px 0px 60px 0px;
  width: 100%;
  // border: 3px solid yellow;
}

.product-description {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0px 0px 40px 0px;
  width: 100%;
  // border: 3px solid blue;
}

.text-title {
  font-weight: 500;
  font-size: 32px;
  line-height: 44px;
  letter-spacing: 0.1px;
  color: #001e32;
}

.title-carrito {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 800;
  font-size: 32px;
  line-height: 44px;
  color: #e75935;
}
.description-text{
  display: block;
  max-width:100px;
  overflow:hidden;
}
.my-card {
  display: flex;
  flex-direction: column;
  align-items: space-between;
  padding: 26px 20px;
  gap: 20px;
  width: 485px;
  height: 92px;
  background: #ffffff;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
}
.card-carrito {
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
}
.btn {
  text-decoration: capitalize;
  width: 100%;
}
.price {
  font-weight: 800;
  font-size: 36px;
  line-height: 49px;
  color: #001e32;
}

.cart-box {
  padding: 8px;
  gap: 4px;
  width: 100px;
  height: 55px;
  background: #ffffff;
  box-shadow: 0px 2px 13px rgba(0, 0, 0, 0.1);
  border-radius: 110px;
  margin-bottom: 14px;
}

.basket {
  display: flex;
  flex-direction: row;
}

.btn {
  width: 190px;
  padding-left: 10px;
}

.btns {
  background: white;
  border: none;
  margin-bottom: 0px;
  font-size: 18px;
  color: grey;
  top: -8px;
}

.full-width-btn {
  padding: 8px;
  gap: 4px;
  width: 250px;
  height: 55px;
  background: #e75935;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
  border-radius: 100px;
  text-transform: capitalize;
}

.description {
  padding-bottom: 20px;
}

.text-subtitle2 {
  font-weight: 600;
  font-size: 22px;
  line-height: 30px;
  color: #001e32;
}

.btn-class {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: none;
  padding-bottom: 20px;
}

.cart-img {
  width: 20px;
  height: 16px;
  align-items: center;
  justify-content: center;
}

.cart-img-box {
  display: flex;
  justify-content: center;
  padding-top: 10px;
}

.img-list {
  width: 100px;
  height: 100px;
}
.img-list-carrito {
  width: 80px;
  height: 80px;
}
.product-list {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 16px 20px 0px 0px;
}

.product-list-carrito {
  display: flex;
  justify-content: space-between;
  align-items: space-between;
  width: 100%;
}

.product-area {
  flex-wrap: wrap;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: flex-start;
}
.load {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.load-btn {
  width: 360px;
  height: 60px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  border-radius: 100px;
}

@media (max-width: 600px) {
  .card-section {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .description-text{
  display: block;
  text-overflow: ellipsis;
  max-width: 11ch;
  overflow: hidden;
}
/* Invisible texto */
figcaption {
  display:none;
  transition: all .5s;
}
/* Visible texto */
figure:hover > figcaption {
  display:block;
  transition: all .5s;
}
  .related-products{
    display: flex;
    flex-direction: column;
    // justify-content: space-around;
    margin: 0px 0px 0px 0px;
    width: 100%;
  }

  .product-description {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin: 0px 0px 0px 0px;
    width: 100%;
  }

  .cart-box {
    padding: 8px 18px;
    gap: 24px;
    width: 120px;
    height: 48px;
  }

  .basket {
    display: flex;
    flex-direction: row;
    gap: 10px;
    // justify-content: space-between;
  }

  .btn {
    width: 190px;
    padding-left: 10px;
  }

  .full-width-btn {
    padding: 8px;
    gap: 4px;
    width: 171px;
    height: 48px;
  }

  .description {
    padding-bottom: 20px;
    margin-top: 10px;
  }

  .text-subtitle2 {
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;
  }

  .img-list {
    width: 86px;
    height: 86px;
  }

  .product-list {
    padding: 16px 20px 0px 0px;
  }
  .load{
    width: 45%;
    display: flex;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;
    }

  .load-btn {
    width: 360px;
    height: 60px;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
    border-radius: 100px;
    margin-bottom: 20px;
  }
}
// =================================================================

.sidebar {
  position: relative;
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 565px;
  background: #ffffff;
  z-index: 99;
  transition: all 0.5s ease;
  height: 100vh;
  border-top-left-radius: 60px;
  border-bottom-left-radius: 60px;
  padding: 30px;
}
.sidebar-main {
  background-color: rgba(0, 0, 0, 0.15);
  width: 100%;
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  transform: scale(0);
}
.sidebar-main.open {
  transform: scale(1);
}
.menu-icon {
  position: absolute;
  top: 35px;
  right: 60px;
}
.menu-icon img {
  filter: invert(23%) sepia(7%) saturate(12%) hue-rotate(354deg) brightness(92%)
    contrast(84%);
  transition: all 0.4s ease;
}
.menu-icon img:hover {
  filter: invert(41%) sepia(53%) saturate(2676%) hue-rotate(343deg)
    brightness(97%) contrast(86%);
}
.sidebar .nav-list {
  margin: 0;
  padding: 30px 0 0 0;
}
.sidebar .nav-list span + span li {
  margin-top: 30px;
  display: block;
}
.sidebar li {
  position: relative;
  list-style: none;
}
.sidebar li.divider {
  border-top: 1px solid #dddddd;
}
.sidebar li a {
  display: flex;
  width: 100%;
  align-items: center;
  text-decoration: none;
  transition: all 0.4s ease;
}
.sidebar li a img {
  filter: invert(11%) sepia(10%) saturate(6667%) hue-rotate(171deg)
    brightness(96%) contrast(105%);
  transition: all 0.4s ease;
  width: 24px;
  height: 24px;
}
.sidebar li a span {
  transition: all 0.4s ease;
  color: #001e32;
  padding-left: 15px;
  font-size: 16px;
  font-weight: 500;
}
.sidebar li a:hover img {
  filter: invert(50%) sepia(12%) saturate(4013%) hue-rotate(329deg)
    brightness(90%) contrast(101%);
}
.sidebar li a:hover span {
  color: var(--q-primary);
}
.sidebar-main .sidebar .my-scroll {
  height: 100vh;
  overflow-y: auto;
}
@media (max-width: 991px) {
  .menu-icon img {
    width: 26px;
  }
  .menu-icon {
    top: 30px;
    right: 30px;
  }
}
@media (min-width: 641px) {
  .sidebar {
    right: -320px;
    top: 0;
  }
  .sidebar-main.open .sidebar {
    right: 0;
  }
  .close-icon {
    width: 36px;
    height: 36px;
  }
  .close-icon a {
    position: relative;
    height: 36px;
    width: 36px;
    background-color: #ffffff;
    box-shadow: 0 0 10px 0 rgb(0 0 0 / 20%);
    display: block;
    border-radius: 30px;
    padding: 10px;
    transition: all 0.4s ease;
  }
  c .close-icon a:hover {
    background-color: var(--q-primary);
  }
  .close-icon a img {
    position: absolute;
    filter: invert(78%) sepia(1%) saturate(0%) hue-rotate(143deg)
      brightness(88%) contrast(88%);
    height: 16px;
    width: 16px;
    transition: all 0.4s ease;
  }
  .close-icon a:hover img {
    filter: invert(100%) sepia(8%) saturate(0%) hue-rotate(123deg)
      brightness(100%) contrast(101%);
  }
}
@media (max-width: 640px) {
  .sidebar-main .sidebar {
    width: 100%;
    border-bottom-left-radius: 0;
    border-top-right-radius: 60px;
    height: 600px;
    bottom: -400px;
  }
  .sidebar-main.open .sidebar {
    bottom: 0;
  }
  .close-icon a img {
    display: none;
  }
  .close-icon a {
    width: 60%;
    height: 6px;
    display: block;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 30px;
    margin: 0 auto;
  }
}
</style>
