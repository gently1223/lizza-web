<template>
    <q-toolbar class="shadow-1">
      <q-btn flat round color="grey" icon="arrow_back" to="/datos-envio" />
      <q-toolbar-title class="text-center">
        <span class="text-primary text-bold">Resumen del pedido</span>
      </q-toolbar-title>
      <div class="icons" style="display: flex; justify-content: space-around; width:10%; margin-right: 40px">
      </div>
    </q-toolbar>


       <div class="sidebar">
       <div  class="justify-center"  v-if="productList.length === 0">
        <p>No hay productos añadidos al carrito</p>
      </div>
      <div v-else class="justify-center product-area">
      <div class="row product-list-carrito" v-for="productItem in productList" :key="productItem.link_id">
        <div class="hello" style="display: flex; flex-direction: row;padding-bottom: 20px">
                <img :src="productItem.image" class="img-list-carrito" alt="img_carrito"/>
                <div class="text" style="display: flex; flex-direction: column;justify-content: center;padding-left: 10px; max-width: 33vw">
                  <span style="font-weight: 600;font-size: 14px;line-height: 18px; color: rgb(141 141 141) !important"> {{ productItem.name }}</span>
                  <span style="font-weight: 600;font-size: 14px;line-height: 18px;" > {{$n(fromCentsToUnit(parseInt(`${productItem.price}`)),'currency')}}</span>
                </div>
        </div>

       <div class="cart-box">
          <div class="cart-img-box">
        <div class="btn-class">
            <p class="cant_number">{{"x"+productItem.amount}}</p>
        </div>
        </div>
        </div>

      </div>
      </div>
      <q-card class="my-card q-ma-xs q-pa-sm" >
        <div class="card-carrito-main">
          <div class="card-carrito">
              <q-item-label caption>Productos</q-item-label>
              <q-item-label >{{countAmounts}}</q-item-label>
          </div>
          <div class="card-carrito">
            <q-item-label class="text-caption" caption>Total de productos</q-item-label>
            <q-item-label class="text-caption_products" >{{$n(fromCentsToUnit(parseInt(`${totalProductsMoney}`)),'currency')}}</q-item-label>
          </div>
            <div class="card-carrito">
            <q-item-label class="text-caption" caption>Envío</q-item-label>
            <q-item-label class="text-caption_products">${{shipment_price}}</q-item-label>
          </div>
              <div >
              <q-separator class="separador" color="1px solid #DDDDDD" inset />
              </div>
          <br />

            <div class="card-carrito">
            <q-item-label class="text-caption" caption>Total</q-item-label>
            <q-item-label class="text-caption_products">{{ $n(fromCentsToUnit(((totalProductsMoney/100) + shipment_price) * 100), 'currency')}}</q-item-label>
          </div>
        </div>
      </q-card>
          <br />
       <div >
              <q-item-label style=" justify-content: center;" caption>¿Quieres cambiar algo en tu pedido?
                <a class="textLink" @click="redirect" style="text-decoration:none "><strong>Regresa a la tienda aqui.</strong></a>
              </q-item-label>
          </div>
          <br />
        <q-btn
          rounded
          color="primary"
          label="Proceder al pago"
          style="text-transform:none"
          @click="onClickClientShow"
            >
      </q-btn>
        </div>

</template>

<script lang="ts">
import {useQuasar } from 'quasar';
import ProductList from 'src/components/ProductList.vue';
import { useArcusApi } from 'src/factories/useArcusApi';
import { useAuthApi } from 'src/factories/useAuthApi';
import { useFormats } from 'src/factories/useFormats';
import { useProductApi } from 'src/factories/useProductApi';
import { computed, defineComponent, onMounted} from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'src/store';
import { useStripe } from 'src/factories/useStripe';
import { ProductInCart } from 'src/components/models';
import { useUserApi } from 'src/factories/useUserApi';
import Loader from 'src/components/Loader.vue';
import ConfirmVue from 'src/components/dialogs/Confirm.vue';
import AlertVue from 'src/components/dialogs/Alert.vue';


export default defineComponent({
  // eslint-disable-next-line vue/no-unused-components
  components: { ProductList, Loader },
  setup() {

    //Get route link id
    const router = useRouter();
    const $q = useQuasar();
    const { payee_id } = useArcusApi();
    const { loginAnonym, isLoggedIn } = useAuthApi();
    const { listenProducts, products } = useProductApi();
    const { getInstagramUserName } = useUserApi();
    const { fromCentsToUnit } = useFormats();
    const { createPaymentLinkCart, createPriceShipmentLink } = useStripe();
    const store = useStore();
    console.log(store);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
    const countAmounts = computed( () => store.getters['shoppingCart/countAmounts']);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const showProduct = async (uid: string | undefined) => {
      if(uid !== undefined) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        await router.push(`/link/${uid}`);
      }
    };
    const redirect = async() => {
        await router.push(`/products/${username}`).catch(() => console.log('Regresando'));
    }
    const onClickClientShow = async () => {
      $q.loading.show({
        spinner: Loader,
        spinnerColor: 'orange',
        spinnerSize: 140,
        backgroundColor: 'white',
        message: 'Creando Link de Pago',
        messageColor: 'white',
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
      const myshipmentid = computed( () => store.getters['shoppingData/quotationShipmentId']);


      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
      const shipment_price = computed(() => store.getters['shoppingData/priceShipment']);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
      const quotationShipmentId =  computed( () => store.getters['shoppingData/quotationShipmentId']);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
      const rateShipmentId = computed( () => store.getters['shoppingData/rateShipmentId']);




      //TODO: Continuar el proceso del pago del envio
      //------------------------ CREAR COMPRA ------------------------------------
      const my_purchase_body = {
        'shipments': [
          myshipmentid.value
        ],
        'payment': {
          'provider': 'wallet'
        }
      }
      console.log('my_purchase_body line 127 on orderSummary es', my_purchase_body)



      // const my_purchase = await purchase(my_purchase_body);
      // if(my_purchase.success === false){
      //   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      //   const my_message =  JSON.parse(JSON.stringify(my_purchase.value));
      //   $q.dialog({
      //     component: AlertVue,
      //     componentProps: {
      //       // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      //       title: my_message.data.errors,
      //     },
      //   }).onOk((result) => {
      //     console.log('ok', result);
      //   });
      // }
      // console.log('🚀 ~ file: Link.vue ~ line 414 ~ onclickPrueba ~ my_purchase', my_purchase)
      //-----------------------------------------------------------------------------------------------

      // TODO: CONTINUAR CON EL PROCESO DEL CARRITO QUE YA ESTABA ANTERIORMENTE
      const data = productList.value;
      let store_name = '';

      const line_items = data.map((item) => {
        store_name = item.username as string;
        return {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          price_id: item.price_id,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          quantity: String(item.amount),
        };
      });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      console.log('Enviando_______: ', ((shipment_price.value as number)*100 as unknown as string), ' _ ', quotationShipmentId.value, ' _ ', rateShipmentId.value);
      const price_id_envio_stripe = await createPriceShipmentLink(((shipment_price.value as number)*100 as unknown as string), quotationShipmentId.value, rateShipmentId.value);
      line_items.push(
        {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          price_id: price_id_envio_stripe.value,
          quantity: '1',
        }
      );
      console.log('data to generate link cart is = ', line_items);
      const link = await createPaymentLinkCart(line_items, myshipmentid.value, store_name);
      const final_link = link.value;
      let pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
      if(!!pattern.test(final_link)){
        window.location.href = String(final_link)
      }else{
        $q.dialog({
          component: AlertVue,
          componentProps: {
            title: 'Hubo un error al crear el link de pago :(',
          },
        }).onOk((result) => {
          console.log('ok', result);
        });
      }
      $q.loading.hide();
    };
    //

    //Login anonym on mounted
    onMounted(async () => {

      if (!isLoggedIn()) {
        await loginAnonym();
      }
      //Retrieve public link info(stripe url, price, image, date..)
      const p = router.currentRoute.value.params.id.toString();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const mydata = await getInstagramUserName(p);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const decrypt = mydata?.id as string;
      console.log(p, decrypt);
      payee_id.value = p;
      //0tJnMYcpIQJ6m5vEct0H
      //Get products from catalogue
      listenProducts(decrypt);
      console.log('Productos: ', products)
      //   Signout only if not an insta user
      //   if (!user.value?.displayName) {
      //     await auth().signOut();
      //   }
    });

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
    const productList = computed<ProductInCart[]>( () => store.getters['shoppingCart/products']);
     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
    const amountById =  computed( (uid: string | undefined) => store.getters['shoppingCart/amountById'](uid));
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
    const username = productList.value[0].username as string;
    console.log('🚀 ~ El nombre del vendedor es: ', username);


    const goToPay = (url: string) => {
      $q.dialog({
        component: ConfirmVue,
        componentProps: {
          title: '¿Está seguro desea realizar el pago?',
        },
      }).onOk(() => {
        window.location.href = url;
      });
    }

    return {
      products,
      fromCentsToUnit,
      productList,
      onClickClientShow,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
      totalProducts:  computed( () => store.getters['shoppingCart/countProducts']),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
      totalProductsMoney:  computed( () => store.getters['shoppingCart/totalProductsMoney']),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
      shipment_price: computed( () => store.getters['shoppingData/priceShipment']),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
      quotationShipmentId: computed( () => store.getters['shoppingData/quotationShipmentId']),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
      rateShipmentId: computed( () => store.getters['shoppingData/rateShipmentId']),
      amountById,
      showProduct,
      goToPay,
      redirect,
      countAmounts

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
  },
  addToCart() {
       console.log('');
  }
  }
});
</script>

<style lang="scss" scoped>
.shadow-1 {
  width: 100%;
  height: 80px;
  left: 0px;
  margin-bottom: 10px;
  top: 0px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
}
.cart-img-box {
  display: flex;
  justify-content: center;
  padding-top: 10px;
  width: 100%;
}
.img-list-carrito{
width: 80px;
height: 80px;
}
.sidebar {
  display: flex;
  flex-direction: column;
  width: 100%;
  background: #ffffff;
  z-index: 99;
  transition: all 0.5s ease;
  border-top-left-radius: 60px;
  border-bottom-left-radius: 60px;
  padding: 30px;
  position: relative;
  left: 0px;
}
.card-carrito {
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
}
.cant_number{
    font-weight: 600;
    font-family: Manrope;
    font-size: 16px;
    color: #001E32;
    align-items: center;
}


.btns {
background: white;
border:none;
margin-bottom: 0px;
font-size: 18px;
color: grey;
top: -8px;
}
  .product-items {
  width: 179px;
  font-weight: 500;
  font-size: 18px;
  line-height: 16px;
  color: #848484;
  flex: none;
  order: 0;
  flex-grow: 1;
  margin-top: 10px;
  margin-bottom: 15px;

}
.my-card{
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15);
}
  .product-area {
  justify-content: space-evenly;
  flex-direction: column;
  align-items: flex-start;
  // padding: 5px 15px;
  //height: 1000px;
  top: 40px;
  max-height: 100vh;
  overflow-y: auto;
  max-width: 100vw;
  margin-bottom: 20px;
}
.cart-box {
  padding: 8px 18px;
  gap: 24px;
  width: 120px;
  height: 48px;

}
.q-separator{
  margin-left: 0px;
  margin-right: 0px;
}
  .product-list {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: flex-start;

  //max-height: 70vh;
}
.textLink{
  color: #E75935;
  cursor: pointer;
}
.product-list-carrito {
display: flex;
justify-content:space-between;
align-items: space-between;
width: 100%;
}

@media (max-width: 600px) {
.sidebar {
  position: relative;
  display: flex;
  flex-direction: column;
  position: fixed;
  background: #ffffff;
  z-index: 99;
  transition: all 0.5s ease;
  height: 83vh;
  border-top-left-radius: 60px;
  border-bottom-left-radius: 60px;
  padding: 30px;
}
  .product-list {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
  //max-height: 70vh;
  }
  .cant_number{
    font-weight: 600;
    font-family: Manrope;
    font-size: 16px;
    color: #001E32;
    align-items: center;
    margin: 0px 0px 0px 80px;

  }
  .text-caption_products{
    font-family: 'Manrope';
    font-style: normal;
    font-weight: 700;
    color: #001E32;
    font-size: 12px;
  }

 .product-area {
    overflow-y: auto;
  }
}

@media (max-width: 640px) {

  .title-carrito{
  font-size: 20px;
  line-height: 20px;
  }

  .img-list-carrito{
    width: 60px;
    height: 60px;
    }

}


</style>

