<!-- eslint-disable vue/valid-v-for -->
<!-- eslint-disable @typescript-eslint/no-unsafe-member-access -->
<template>
  <q-page class="container-page">
    <q-toolbar class="shadow-1">
      <div class="header-bar">
        <q-btn flat round color="grey" icon="arrow_back" @click="redirect" />
        <q-toolbar-title class="text-center">
          <span v-if="product" class="text-primary text-bold">
            @{{ product.username }}
          </span>
        </q-toolbar-title>
        <div class="icons" style="display: flex; justify-content: space-around; width:10%; margin-right: 40px">
          <q-btn  @click="() => onClickShow()" round>
            <q-img src="images/cart.svg" class="cart-img">  </q-img>
            <span id="cart_menu_num" data-action="cart-can" class="badge rounded-circle">{{ countAmounts }}</span>
          </q-btn>
        </div>
      </div>
    </q-toolbar>
    <div class="row justify-center q-pa-md product-area">
      <div class="col-12 col-sm-7">
        <!-- The product view component -->
        <product-description
          v-if="product && !editing"
          :price="product.price"
          :image="product.image"
          :description="product.description"
          :name="product.name"
          :stock="product.stock"
          :url="product.url"
          :link_id="product.link_id"
          :originalProduct="product"
          :dimensions="product.dimensions"
          @show-cart="onClickShow"
          :username="product.username"
        >
          <template #ctas>
            <q-btn
              rounded
              flat
              class="q-py-md q-ma-md"
              color="primary"
              @click="handleShare"
            >
              <span>Compartir liga de pago</span>
            </q-btn>
          </template>
        </product-description>
        <q-card v-else-if="productForm" class="column">
          <img v-if="numberImages === 1" ref="image" class="rounded-borders" :src="getImage" />
          <div v-else class="slices-image">
            <q-carousel
            animated
            v-model="slide"
            arrows
            navigation
            infinite
            height="120px"
            >

            // eslint-disable-next-line vue/valid-v-for
            <q-carousel-slide v-for="(img, index) in imagesSrc" :name="index" :img-src="img" :v-bind="img" />

            </q-carousel>
          </div>
          <div class="q-pa-md column">
            <q-input
              rounded
              :input-style="{ textAlign: 'center', fontSize: '22px' }"
              outlined
              placeholder="$0"
              v-model="productForm.price"
              type="number"
            />
            <p class="text-center text-bold text-grey">Precio</p>
            <q-input
              class="q-mb-md"
              rounded
              outlined
              label="Nombre del Producto"
              v-model="productForm.name"
            />
            <q-input
              class="q-mb-md"
              rounded
              outlined
              label="Descripción"
              type="textarea"
              v-model="productForm.description"
            />
            <q-btn
              rounded
              class="q-py-md"
              color="primary"
              label="Guardar cambios"
              @click="handleSave"
              :disable="!productForm.price || !productForm.name"
            >
            </q-btn>
          </div>
        </q-card>
      </div>
    </div>
     <div class="sidebar-main" :class="isOpened ? 'open' : ''">
    <div class="sidebar">
      <div class="close-icon">
        <a href="javascript:" @click="isOpened = !isOpened">
          <img src="sidebar/close.svg" />
        </a>
      </div>
      <br/>
      <div class="text-h6 title-carrito" color="#E75935">Mi Carrito</div>
      <br />
      <q-separator class="separador" color="1px solid #DDDDDD" inset />
      <br />
      <div v-if="productList.length === 0">
        <p class="no_products text-h6">No hay productos añadidos al carrito</p>
      </div>
      <div v-else class="justify-center product-area">
      <br />
      <div class="row product-list-carrito" v-for="productItem in productList" :key="productItem.link_id">
        <div class="hello" style="display: flex; flex-direction: row;padding-bottom: 20px">
                <img :src="productItem.image" class="img-list-carrito"/>
                <div class="text" style="display: flex; flex-direction: column;justify-content: center;padding-left: 10px;  max-width: 20vw;">
                  <span style="font-weight: bold;font-size: 14px;line-height: 18px; color: #9e9e9e"> {{ productItem.name }}</span>
                  <span style="font-weight: 600;font-size: 14px;line-height: 18px; !important"> {{$n(fromCentsToUnit(parseInt(`${productItem.price}`)),'currency')}}</span>
                </div>
        </div>
        <div class="cart-box">
          <div class="cart-img-box">
        <div class="btn-class">
        <q-btn flat class="btns" @click="() => decrementAmountProductInCart(productItem.uid)">-</q-btn>
            <p style="font-weight: 500;font-size: 20px;color: #001E32;padding-top: 2px;align-items: center">{{productItem.amount}}</p>
        <q-btn flat class="btns" @click="() => incrementAmountProductInCart(productItem.uid)">+</q-btn>
        </div>
        </div>
        </div>
      </div>
      </div>
      <q-card class="my-card q-ma-md q-pa-sm" >
        <div class="card-carrito-main">
          <div class="card-carrito">
              <q-item-label caption>Productos</q-item-label>
              <q-item-label caption>{{countAmounts}}</q-item-label>
          </div>
          <div class="card-carrito">
            <q-item-label class="text-caption">Total de productos</q-item-label>
            <q-item-label class="text-caption">{{$n(fromCentsToUnit(parseInt(`${totalProductsMoney}`)),'currency')}}</q-item-label>
          </div>

        </div>
      </q-card>
      <br />
      <q-btn
          rounded
          class="q-py-md"
          color="primary"
          label="Procesar la compra"
          style="text-transform:none"
          @click="showShippingData"
            >
      </q-btn>
      <br />
       <div class="close-icon-mobile">
        <a href="javascript:" @click="isOpened = !isOpened">
          <img src="sidebar/Vector.svg" />
        </a>
       </div>
    </div>
  </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted} from 'vue';
import { useQuasar } from 'quasar';
import { useProductApi } from 'src/factories/useProductApi';
import ProductDescription from 'src/components/ProductDescription.vue';
import Seller from 'src/pages/Seller.vue';
import ShareActions from 'src/components/dialogs/ShareActions.vue';
import { useAuthApi } from 'src/factories/useAuthApi';
import { useFormats } from 'src/factories/useFormats';
import { useStripe } from 'src/factories/useStripe';
import { useShipments } from 'src/factories/useShipments';
import { Product, ProductInCart } from 'src/components/models';
import ConfirmVue from 'src/components/dialogs/Confirm.vue';
import { useRouter } from 'vue-router';
import { auth } from 'boot/firebase';
import { useStore } from 'src/store';
import ProductList from 'src/components/ProductList.vue';
import Loader from 'src/components/Loader.vue';
import { useUserApi } from 'src/factories/useUserApi';

export default defineComponent({
  // eslint-disable-next-line vue/no-unused-components
  components: { ProductDescription, Seller, ProductList, Loader },
  props: {
    editMode: {
      type: Boolean,
      default: false,
    }
  },

  setup(props) {
    const store = useStore();
    const { createPaymentLinkCart } = useStripe();
    const { createDirection, createCotizacion, getRates, getRateCarrier, updateShipment, purchase } = useShipments();
    console.log('getters:', store.getters);

    const {
      product,
      getProductLink,
      udpateUserProduct,
      deleteUserProduct,
      getProductDetail,
      getPrivateeProductDetail,
    } = useProductApi();

    const { loginAnonym, isLoggedIn, user } = useAuthApi();
    const router = useRouter();
    const { userId } = useAuthApi();
    const { getInstagramUserName } = useUserApi();
    const { fromCentsToUnit } = useFormats();
    const $q = useQuasar();
    const editing = ref(props.editMode);
    let productForm = ref<Product>();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
    const countProducts = computed( () => store.getters['shoppingCart/countProducts']);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
    const countAmounts = computed( () => store.getters['shoppingCart/countAmounts']);

    const redirect = async () => {
      if (!isLoggedIn()) {
      await loginAnonym();
      }
      const p = router.currentRoute.value.params.link_id.toString();
      const prod = await getProductDetail(p);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const directUrl = prod.username
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      await router.push(`/${directUrl}`);
   };
    const handleShare = () => {
      //open modal to share url
      $q.dialog({
        component: ShareActions,
        componentProps: {
          link: getProductLink(product.value),
        },
      });
    };
    const handleDelete = () => {
      $q.dialog({
        component: ConfirmVue,
        componentProps: {
          title: '¿Deseas eliminar este producto de tu catálogo?',
        },
      }).onOk((result) => {
        console.log('clicked ok, delete', result);
        if (product.value.uid) {
          deleteUserProduct(userId.value, product.value.uid)
            .then(() => {
              editing.value = false;
              router.push('/').catch((e) => console.log(e));
            })
            .catch((a) => {
              console.log(a);
            });
        }
      });
    };

    const handleSave = async () => {
      editing.value = false;
      if (productForm.value) {
        //turn price back to units
        if (!productForm.value.price) productForm.value.price = 0;
        productForm.value.price = productForm.value.price * 100;
        console.log('products price',productForm.value.price);
        await udpateUserProduct(userId.value, {
          ...productForm.value,
          uid: product.value.uid,
        });
        fillProductForm();
      }
    };

    const fillProductForm = () => {
      console.log('here product value', product.value);
      productForm.value = {
        name: product.value.name,
        url: product.value.url,
        image: product.value.image,
        price: fromCentsToUnit(product.value.price),
        description: product.value.description,
        dimensions: {
          length: product.value.dimensions?.length,
          height: product.value.dimensions?.height,
          width: product.value.dimensions?.width,
          weight: product.value.dimensions?.weight
        },
        isActive: false
      };
    };
    const getimages = (value: string) => {
      let srcImages = '';
      if(value[value.length-1] === '|'){
        srcImages = value.slice(0, value.length-1);
      }else{
          srcImages = value;
      }
      const myimages = srcImages.split('|');
      myimages.forEach(val => console.log('get images',val, myimages.length))
      return myimages
    }
    //product.value.image = getimages(product.value.image as string)[0];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const getImage = computed(()=>{
      return getimages(product.value.image as string)[0];
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const imagesSrc = computed(()=>{
      return getimages(product.value.image as string);
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const numberImages = computed(()=>{
      return getimages(product.value.image as string).length;
    });

    onMounted(async () => {
      fillProductForm();
      if (!isLoggedIn()) {
        await loginAnonym();
      }
      //Retrieve public link info(stripe url, price, image, date..)
      const p = router.currentRoute.value.params.link_id.toString();
      console.log('El id del producto recibido en el url es --> ', p);
      // console.log('store:', store);
      //0tJnMYcpIQJ6m5vEct0H
      const prod = await getProductDetail(p);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      // const privProd = await getPrivateeProductDetail(p);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      // const productPrivatePriceId = privProd.data().price_id as string;
      console.log('prod data',prod);
      product.value = prod as Product;

      // product.value.price_id = productPrivatePriceId;
      console.log('productsValue',product.value);
      //Signout only if not an insta user
      if (!user.value?.displayName) {
        await auth().signOut();
      }
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
    const productList = computed<ProductInCart[]>( () => store.getters['shoppingCart/products']);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
    const amountById =  computed( (uid: string | undefined) => store.getters['shoppingCart/amountById'](uid));


    const decrementAmountProductInCart = (uid: string | undefined)=> {
      console.log('Decrement con uid:', uid);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const productSelected: ProductInCart | undefined = productList.value.find((product) => product.uid === uid);
      if(productSelected !== undefined) {
        store.commit('shoppingCart/removeProduct', productSelected);
      }
    };

    const incrementAmountProductInCart = (uid: string | undefined)=> {
      console.log('Increment con uid:', uid)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const productSelected: ProductInCart | undefined = productList.value.find((product) => product.uid === uid);
      if(productSelected !== undefined) {
        store.commit('shoppingCart/addProduct', productSelected);
      }
    };

    const showShippingData = async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const routerPart = product.value.uid;
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      const uXFromViewRoute = `/link/${routerPart}`
      store.commit('shoppingData/setuXFromViewRoute', uXFromViewRoute);
      await router.push('/datos-envio');
    }

    return {
      editing,
      product,
      productForm,
      handleShare,
      handleDelete,
      handleSave,
      userId,
      decrementAmountProductInCart,
      incrementAmountProductInCart,
      productList,
      countProducts,
      countAmounts,
      fromCentsToUnit,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
      totalProducts:  computed( () => store.getters['shoppingCart/countProducts']),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
      totalProductsMoney:  computed( () => store.getters['shoppingCart/totalProductsMoney']),
      amountById,
      showShippingData,
      getImage,
      imagesSrc,
      numberImages,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      slide: ref(1),
      redirect
    };
  },
  data() {
    return {
    length: 3,
    show: false,
    isOpened: false
    }
  },
  methods: {
    removeFromCart() {
      console.log('');
    },
    addToCart() {
      console.log('');
    },
    onClickShow (){
      this.show = true;
      this.isOpened = true;
      console.log('State:', this.$store.state)
    }
  }
});
</script>

<style lang="scss" scoped>
/* Hide scrollbar */
::-webkit-scrollbar {
  display: none;
}
.header-bar {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}

.shadow-1 {
  width: 100%;
  height: 80px;
  left: 0px;
  margin-bottom: 10px;
  top: 0px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  position: relative;
  top: 0;
  z-index: 98px;
}
#cart_menu_num {
  position: absolute;
  top: 0;
  left: 55%;
  background: #E75935;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  color: white;
  padding: 2px;
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


.image-section {
  width: 40%;
}



.product-description {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0px 0px 40px 80px;
  width: 45%;
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
.my-card {
  display: flex;
  flex-direction: column;
  align-items: space-between;
  gap: 20px;
  width: 485px;
  height: 92px;
  background: #ffffff;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);
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
  padding: 5px;
  gap: 4px;
  width: 110px;
  height: 50px;
  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 100px;
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
  font-size: 15px;
  color: grey;
  top: -8px;
}
.full-width {
  padding: 8px;
  gap: 4px;
  width: 90px;
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
    object-fit: none;
}

.img-list-carrito {
  width: 80px;
  height: 80px;
  border-radius: 20px;
}

.product-list-carrito {
  display: flex;
  justify-content: space-between;
  align-items: space-between;
  width: 100%;
}

.close-icon-mobile {
  display: none;
}
 .product-area {
    overflow-y: auto;
    max-height: 100vh;
    max-width: 100vw;
  }

.no_products {
  text-align: center;
  font-weight: bold;
}
@media (max-width: 600px) {

  .cart-img {
    width: 20px;
    height: 16px;
    align-items: center;
    justify-content: center;
  }
}

// -------

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
   .close-icon a:hover {
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
    border-radius: 0px 0px 16px 16px;
    height: 550px;
    top: 0px;
  }
  .title-carrito {
    font-size: 20px;
    line-height: 20px;
  }
  .close-icon {
    display: none;
  }
  .close-icon-mobile {
    display: flex;
    width: 100%;
    left: 40px;
  }

  .close-icon-mobile img {
    display: flex;
    position: absolute;
    align-items: center;
    width: 20px;
    height: 20px;
    transform: rotate(180deg);
    left: 50%;
  }

  .img-list-carrito {
    width: 60px;
    height: 60px;
  }

  .my-card {
    width: 303px;
    height: 76px;
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
