<template>
  <q-page>
    <q-toolbar class="shadow-1">
      <q-toolbar-title class="text-center">
        <span v-if="products[0]" style="margin-left: 50px;" class="text-primary text-bold">
          @{{ products[0].username }}
        </span>
      </q-toolbar-title>
      <div class="icons" style="display: flex; justify-content: space-around; width:10%; margin-right: 40px">
         <q-btn  @click="onClickShow()" unelevated rounded>
        <img src="images/carrito-grey4.svg" style="withposition: static; top: 17px;" class="cart-img" alt=“image_cart” >
        <span id="cart_menu_num" data-action="cart-can" class="badge rounded-circle">{{ countAmounts }}</span>
         </q-btn>
      </div>
    </q-toolbar>

    <div class="socialmedia" v-if="products[0]">
      <div class="socialapps" :style="whatsapp">
        <a :href="whatsappLink" target="_blank">
          <img src="/images/WA_logo.svg" class="socialimg" alt=“image_whatsapp” />
        </a>
        <div class="photo-name">Whatsapp</div>
      </div>
      
      <div class="socialapps" :style="insta">
        <a :href="instaLink" target="_blank">
          <img src="/images/Instagram_logo.svg" class="socialimg" alt=“image_insta” />
        </a>
        <div class="photo-name">Instagram</div>
      </div>

      <div class="socialapps" :style="tiktok" id="nav-ask">
        <a :href="tiktokLink" target="_blank">
          <img src="/images/TikTok_Logo.svg" class="socialimg" alt=“image_tiktok” />
        </a>
        <div class="photo-name">Tik Tok</div>
      </div>

      <div class="socialapps" id="nav-ask" :style="facebook" >
        <a :href="facebookLink" target="_blank">
          <img src="/images/Fb_logo.svg" class="socialimg" alt=“image_facebook” />
        </a>
        <div class="photo-name">Facebook</div>

      </div>
    </div>
    <div class="product-area-items">
      <div class="product-list">
        <product-list
          v-for="product in products"
          :key="product.link_id"
          :image="product.image" rounded-borders
          :isTest="isTestProduct(product)"
        >

          <template #body>
            <div class="row text-left" >
              <div class="col-12">
                <span class="title-text" @click="showProduct(product.uid)">{{ product.name }}</span>
              </div>
              <div class="product-items col-12">
                <q-item-label class="product-price text-grey text-bold">{{
                  $n(fromCentsToUnit(product.price), 'currency')
                }}</q-item-label>
              </div>
              <div class="col-12">
                <div class="buttons">
                  <q-btn
                    class="cart-button"
                    unelevated
                    rounded
                    text-color="#e75935"
                    color="white"
                    @click="addProductToCart(product.uid)">
                    <img src="images/cart.svg" alt=“image_cart”></q-btn>
                  <q-btn
                    class="full-width"
                    unelevated
                    rounded
                    color="primary"
                    label="Comprar ahora"
                    @click="goToPay(product.uid)"
                  ></q-btn>
                </div>
              </div>
            </div>
          </template>
        </product-list>
      </div>
    </div>


    <div class="sidebar-main" :class="isOpened ? 'open' : ''">
    <div class="sidebar">
      <div class="close-icon">
        <a href="javascript:" @click="isOpened = !isOpened">
          <img src="sidebar/close.svg" alt=“image_close” />
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
                <img :src="productItem.image" class="img-list-carrito" alt=“image_products_cart”/>
                <div class="text" style="display: flex; flex-direction: column;justify-content: center;padding-left: 10px;  max-width: 20vw;">
                  <span style="font-weight: bold;font-size: 14px;line-height: 18px; color: #9e9e9e"> {{ productItem.name }}</span>
                  <span style="font-weight: 600;font-size: 14px;line-height: 18px; !important" > {{$n(fromCentsToUnit(parseInt(`${productItem.price}`)),'currency')}}</span>
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
          class="q-py-xs"
          color="primary"
          label="Procesar la compra"
          style="text-transform:none"
          @click="showShippingData"
            >
      </q-btn>
      <br />
       <div class="close-icon-mobile">
        <a href="javascript:" @click="isOpened = !isOpened">
          <img src="sidebar/Vector.svg" alt=“image_Vector” />
        </a>
       </div>
    </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import {useQuasar } from 'quasar';
import ProductList from 'src/components/ProductList.vue';
import { useArcusApi } from 'src/factories/useArcusApi';
import { useAuthApi } from 'src/factories/useAuthApi';
import { useFormats } from 'src/factories/useFormats';
import { useProductApi } from 'src/factories/useProductApi';
import { computed, defineComponent, onMounted, ref} from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'src/store';
import { ProductInCart } from 'src/components/models';
import { useStripe } from 'src/factories/useStripe';
import Loader from 'src/components/Loader.vue';
import { useUserApi } from 'src/factories/useUserApi';
import ConfirmVue from 'src/components/dialogs/Confirm.vue';

export default defineComponent({
  // eslint-disable-next-line vue/no-unused-components
  components: { ProductList, Loader },
  setup() {

    const { getPrivateeProductDetail, isTestProduct } = useProductApi();
    //Get route link id
    const router = useRouter();
    const $q = useQuasar();
    const { payee_id } = useArcusApi();
    const { loginAnonym, isLoggedIn } = useAuthApi();
    const { listenProducts, products } = useProductApi();
    const { getInstagramUserName, getUserSocials } = useUserApi();
    const { fromCentsToUnit } = useFormats();
    const { userId } = useAuthApi();
    const { createPaymentLinkCart } = useStripe();
    const store = useStore();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
    const countProducts = computed( () => store.getters['shoppingCart/countProducts']);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
    const countAmounts = computed( () => store.getters['shoppingCart/countAmounts']);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    let whatsapp = ref('');
    let whatsappLink = ref('');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    let insta = ref('');
    let instaLink = ref('');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    let tiktok = ref('');
    let tiktokLink = ref('');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    let facebook = ref('');
    let facebookLink = ref('');

    //const countProducts = computed( () => store.getters['shoppingCart/countProducts']);
 // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const addProductToCart = async (uid: string | undefined)=> {

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const privProd = await getPrivateeProductDetail(uid as string);
        const productSelected = products.value.find( (item) => item.uid === uid);
        const imagesFromPRoduct = productSelected?.image as string;
        const myimages = imagesFromPRoduct.split('|');
        console.log('La imagen a agregar es: --> ', myimages[0]);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        productSelected!.image = myimages[0];
        if(productSelected !== undefined) {
          productSelected.price_id = privProd.data().price_id as string;
        }
        store.commit('shoppingCart/addProduct', {...productSelected, amount: 1});

        $q.notify({
          color: 'green-4',
          textColor: 'white',
          message: 'Producto incluido en el carrito'
        })
    };
 // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const showProduct = async (uid: string | undefined) => {
      if(uid !== undefined) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        await router.push(`/link/${uid}`);

      }

    };
    const fillSocialMedia = (socials: {
                                facebook?: string | undefined;
                                tiktok?: string | undefined;
                                whatsapp?: string | undefined;
                            }) => {
      if (socials.whatsapp === '') {
        whatsapp.value = 'display: none;';
      } else {
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        whatsappLink.value = ' https://wa.me/+521' + socials.whatsapp;
      }
      if (socials.tiktok === '') {
        tiktok.value = 'display: none;';
      }else{
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        tiktokLink.value = 'https://www.tiktok.com/@' + socials.tiktok;
      }
      if (socials.facebook === '') {
        facebook.value = 'display: none;';
      } else{
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        facebook.value = 'https://www.facebook.com/' + socials.facebook;
      }
    };
    //Login anonym on mounted
    onMounted(async () => {
      $q.loading.show({
        spinner: Loader,
        spinnerColor: 'orange',
        spinnerSize: 140,
        backgroundColor: 'white',
        message: 'Buscando posibles productos',
        messageColor: 'white',
      });
      if (!isLoggedIn()) {
        await loginAnonym();
      }
      //Retrieve public link info(stripe url, price, image, date..)
      const p = router.currentRoute.value.params.id.toString();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const mydata = await getInstagramUserName(p); //Esto recibe tonylizzapp para obtener instagram-7881809248510956
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const decrypt = mydata?.data().uid as string;
      console.log('decrypt',p, decrypt);
      console.log('myData',mydata);
      payee_id.value = p;
      //0tJnMYcpIQJ6m5vEct0H
      //Get products from catalogue
      listenProducts(decrypt);
      console.log('Productos: ', p)
      //   Signout only if not an insta user
      //   if (!user.value?.displayName) {
      //     await auth().signOut();
      //   }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const userInfo = await getUserSocials(userId.value);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const socials = userInfo?.socials;
      if(socials != undefined){
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        fillSocialMedia(socials);
      }

      instaLink.value = 'https://www.instagram.com/' + p;

      $q.loading.hide();
    });


    const showShippingData = async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const routerPart = products.value[0].username;
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      const uXFromViewRoute = `/products/${routerPart}`
      store.commit('shoppingData/setuXFromViewRoute', uXFromViewRoute);
      await router.push('/datos-envio');
    }
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

    const goToPay = (uid: string | undefined) => {
      $q.dialog({
        component: ConfirmVue,
        componentProps: {
          title: '¿Está seguro desea realizar el pago?',
        },
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      }).onOk(async () => {
        await addProductToCart(uid);
        await showShippingData();
        //await router.push('/datos-envio')
      });
    }

    return {
      isTestProduct,
      products,
      fromCentsToUnit,
      addProductToCart,
      decrementAmountProductInCart,
      incrementAmountProductInCart,
      productList,
      countProducts,
      countAmounts,
      whatsapp,
      whatsappLink,
      insta,
      instaLink,
      facebook,
      facebookLink,
      tiktok,
      tiktokLink,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
      totalProducts:  computed( () => store.getters['shoppingCart/countProducts']),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
      totalProductsMoney:  computed( () => store.getters['shoppingCart/totalProductsMoney']),
      amountById,
      showShippingData,
      showProduct,
      goToPay
    };
  },

 data() {
    return {
    length: 3,
    show: false,
    isOpened: false,
    }
  },
  methods: {
  updateQuantity() {
     console.log('');

    },
  removeFromCart() {
   console.log('');
  },
  onClickShow() {
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
.shadow-1 {
  width: 100%;
  height: 80px;
  left: 0px;
  margin-bottom: 72px;
  top: 0px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  position: relative;
  top: 0;
  z-index: 98px;
}


.title-carrito{
font-family: 'Manrope';
font-style: normal;
font-weight: 800;
font-size: 32px;
line-height: 44px;
color: #e75935;
}

.card-section {
margin: 0px 50px 40px 16px;
display: flex;
width: 760px;
}


.image-section {
  width:40%;
  text-align: center;
}

.text-title{
font-weight: 500;
font-size: 32px;
line-height: 44px;
letter-spacing: 0.1px;
color: #001E32;
}
.product-description {
display: flex;
flex-direction:column;
justify-content: space-between;
margin:0px 0px 40px 80px;
width: 45%;

}

.cart-box {
  padding: 8px 18px;
  gap: 24px;
  width: 120px;
  height: 48px;

}
.socialmedia {
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 10px;
  position: relative;
  top: -50px;
  width: 100%;
  z-index: 98px
}
.product-list-carrito {
display: flex;
justify-content:space-between;
align-items: space-between;
width: 100%;
}
 .close-icon-mobile {
    display: none;
  }
.socialapps {
  width: 72px;
  height: 72px;
  box-shadow: 0px 0px 8px 0px #00000050;
  border-radius: 36px;
}
.socialimg {
  width: 36px;
  margin: 18px;
}
.product-area-items{
  display: flex;
  align-items: center;
  // padding: 5px 15px;
  //height: 1000px;
  top: 40px;
  max-height: 100vh;
  overflow-y: auto;
  // border: 3px solid green;
  justify-content: space-evenly;
  width: 100%;
}
.no_products {
  text-align: center;
  font-weight: bold;
}
.product-area {

  max-height: 75vh;
  overflow-y: auto;
  max-width: 100vw;

}
.product-list {
  display: flex;
  // border: 3px solid blue;
  flex-wrap: wrap;
  justify-content: space-evenly;
  flex-direction: row;
  align-items: auto;
  //max-height: 70vh;
  margin: auto auto 30vh auto;
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
.btn-class {
display: flex;
justify-content: space-between;
align-items: center;
border:none;
padding-bottom:20px;
}
.cart-img {
  align-items: center;
  justify-content: center;
      object-fit: none;
          width: 50px;
    height: 35px;
}

.cart-box {
padding: 8px;
gap: 4px;
width: 110px;
height: 50px;
background: #FFFFFF;
box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
border-radius: 100px;
margin-bottom:14px;
}

.cart-img-box {
display: flex;
justify-content:center;
    object-fit: none;
}
.img-list-carrito{
width: 80px;
height: 80px;
border-radius: 20px;
}

.title-text {
  width: 250px;
  padding-bottom: 40px;
  font-weight: 700;
  font-size: 18px;
  line-height: 20px;
  color: #434343;
}
.product-items {
  width: 179px;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  color: #848484;
  flex: none;
  order: 0;
  flex-grow: 1;
  margin-top: 10px;
  margin-bottom: 15px;
}

.card-carrito {
  display:flex;
  justify-content: space-between;
  padding-bottom: 10px;

}
.btn {
width: 190px;
padding-left: 10px;
}
.btns {
background: white;
border:none;
margin-bottom: 0px;
font-size: 15px;
color: grey;
top: -8px;
}
.full-width {
  width: 250px;
  height: 32px;
  left: 0px;
  background: #eb6432;
  border-radius: 100px;
  text-transform: none;
  FONT-WEIGHT: 100;
  font-family: Manrope;
}
.cart-button {
  width: 50px;
  height: 32px;
  left: 0px;
  border-radius: 100px;
}


.photo-name {
  font-size: 15px;
}
.buttons {
  display: grid;
  grid-template-columns: 30% 70%;
  gap: 5px;
}

@media (max-width: 600px) {
  .shadow-1 {
    height: 64px;
    margin-bottom: 72px;
  }

  .product-list {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    max-height: 100vh;
    max-width: 100vw;
  }
.product-area {
  justify-content: space-evenly;
  flex-direction: column;
  align-items: flex-start;
  // padding: 5px 15px;
  //height: 1000px;
  top: 40px;
  max-height: 97vh;
  max-width: 100vw;
}

  .socialmedia {
    margin-bottom: -23px;
    margin-top: 10px;
  }
  .socialapps {
    width: 56px;
    height: 56px;
    box-shadow: 0px 0px 8px 0px #00000050;
    border-radius: 100px;
  }
  .socialimg {
    width: 27px;
    height: 28px;
    margin: 14px;
  }
  span.title-text {
    width: 179px;
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

  .my-card{
    height: auto;
    margin: 19px 4px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.188);
  }
}

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
  filter: invert(23%) sepia(7%) saturate(12%) hue-rotate(354deg) brightness(92%) contrast(84%);
  transition: all 0.4s ease;
}
.menu-icon img:hover {
  filter: invert(41%) sepia(53%) saturate(2676%) hue-rotate(343deg) brightness(97%) contrast(86%);
}
.sidebar .nav-list {
  margin: 0;
  padding: 30px 0 0 0;
}
.sidebar .nav-list span+span li {
  margin-top: 30px;
  display: block;
}
.sidebar li {
  position: relative;
  list-style: none;
}
.sidebar li.divider {
  border-top: 1px solid #DDDDDD;
}
.sidebar li a {
  display: flex;
  width: 100%;
  align-items: center;
  text-decoration: none;
  transition: all 0.4s ease;
}
.sidebar li a img {
  filter: invert(11%) sepia(10%) saturate(6667%) hue-rotate(171deg) brightness(96%) contrast(105%);
  transition: all 0.4s ease;
  width: 24px;
  height: 24px;
}
.sidebar li a span {
  transition: all 0.4s ease;
  color: #001E32;
  padding-left: 15px;
  font-size: 16px;
  font-weight: 500;
}

.sidebar li a:hover img {
  filter: invert(50%) sepia(12%) saturate(4013%) hue-rotate(329deg) brightness(90%) contrast(101%);
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
    background-color: #FFFFFF;
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
    filter: invert(78%) sepia(1%) saturate(0%) hue-rotate(143deg) brightness(88%) contrast(88%);
    height: 16px;
    width: 16px;
    transition: all 0.4s ease;
  }
  .close-icon a:hover img {
    filter: invert(100%) sepia(8%) saturate(0%) hue-rotate(123deg) brightness(100%) contrast(101%);
  }
}
@media (max-width: 640px) {

  .sidebar-main .sidebar {
    width: 100%;
    border-radius: 0px 0px 16px 16px;
    height: 550px;
    top: 0px;
  }
  .title-carrito{
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
    .close-icon-mobile img{
  display: flex;
  position: absolute;
  align-items: center;
  width: 20px; height: 20px;
  transform: rotate(180deg);
  left: 50%;
  }

  .img-list-carrito{
    width: 60px;
    height: 60px;
    }

  .close-icon-mobile img{
  display: flex;
  position: absolute;
  align-items: center;
  width: 20px; height: 20px;
  transform: rotate(180deg);
  left: 50%;
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
