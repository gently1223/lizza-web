<template>
  <q-page class="q-pt-md container-page">
    <q-page-sticky position="top-right" :offset="[5, 5]" style="z-index: 1">
    </q-page-sticky>

    <div class="row text-center justify-center">
      <div class="col-12 col-sm-8 col-md-6">
        <!-- User profile name and image if posible -->
        <q-avatar size="100px">
          <img src="icons/insta-logo.png" alt="img_logo" />
        </q-avatar>
        <div class="row text-center justify-center">
          <span class="title_name" v-if="user"
            ><b>{{ user.username }}</b></span
          >
        </div>
        <br />
        <!-- Link to articles/posts view -->
        <div style="margin-top: 12px" class="row q-gutter-md">
          <div style="margin: 0px 0px 0px 32px" class="col">
            <q-btn
              no-caps
              stack
              flat
              color="primary"
              class="full-height shadow-1"
              to="/create-product-options"
            >
              <img
                src="icons/iconoir_add-circled-outline-3.svg"
                style="withposition: static"
                class="cart-img"
                alt="“image_cart”"
              />
              <span class="text-caption" style="size: 10px"
                >Agregar producto nuevo</span
              >
            </q-btn>
          </div>
          <div style="margin: 0px 20px 0px 0px" class="col">
            <q-btn
              stack
              no-caps
              flat
              color="primary"
              class="full-height shadow-1"
              @click="handleShare"
            >
              <img
                src="icons/iconoir_share-android-6.svg"
                style="withposition: static"
                class="cart-img"
                alt="“image_cart”"
              />
              <span class="text-caption" style="size: 10px"
                >Compartir tienda</span
              >
            </q-btn>
          </div>
        </div>
        <q-separator style="margin: 20px" class="q-my-md" />
        <p class="text-h4">Mis productos</p>
        <!-- List of card links -->
        <div @click.stop="doThis">
          <product-card
            v-for="product in products"
            :key="product.link_id"
            :price="product.price || 0"
            :image="product.image || ''"
            :name="product.name"
            :sales="product.payments"
            :uid="product.uid"
            :dimensions="product.dimensions"
            :date="toDateString(product.date)"
            :productLink="getProductLinkHome(user?.username, product)"
            :isTest="isTestProduct(product)"
            @click="handleSelectProduct(product)"
            user-mode
          >
          </product-card>
        </div>
      </div>
    </div>
  </q-page>
  <div>
    <Hamburguer-Menu></Hamburguer-Menu>
  </div>
</template>

<script lang="ts">
import HamburguerMenu from 'src/components/HamburguerMenu.vue';
import AlertPersonalDataVue from 'src/components/dialogs/AlertPersonalData.vue';
import ProductCard from 'src/components/ProductCard.vue';
import { Product } from 'src/components/models';
import { useAuthApi } from 'src/factories/useAuthApi';
import { useFormats } from 'src/factories/useFormats';
import { usePostForm } from 'src/factories/usePostForm';
import { useProductApi } from 'src/factories/useProductApi';
import { usePaymentsApi } from 'src/factories/usePaymentsApi';
import { useUserApi } from 'src/factories/useUserApi';
import { defineComponent, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useStore } from 'src/store';
import ShareActionsVue from 'src/components/dialogs/ShareActions.vue';
import Loader from 'src/components/Loader.vue';
import { String } from 'lodash';
import ProductPopupVue from 'src/components/dialogs/ProductPopup.vue';


export default defineComponent({
  // eslint-disable-next-line vue/no-unused-components
  components: { ProductCard, HamburguerMenu, Loader },
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const { products, selectProduct, getProductLinkHome, isTestProduct } =
      useProductApi();
    const { userId } = useAuthApi();
    const { clean } = usePostForm();
    const { toDateString } = useFormats();
    const { listenPayments } = usePaymentsApi();
    const store = useStore();
    const { user, getUsername, getUser } = useUserApi();
    const handleSelectProduct = async (product: Product) => {
      console.log('product', product);
      selectProduct(product);
      await router.push('/detail');
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const directionPopoup = (direction: any) => {
      if (
        direction === undefined ||
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        direction.city === '' ||
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        direction.number_out === '' ||
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        direction.postal_code === '' ||
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        direction.state === '' ||
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        direction.street === ''
      ) {
        $q.dialog({
          component: AlertPersonalDataVue,
          componentProps: {
            title: '¡Sólo un paso más! 👀',
            message:
              'Agrega tus datos de contacto y de envío para poder vender en linea y gestionar tus envíos.',
          },
        }).onOk((result) => {
          router
            .push('/settings')
            .catch((e) => console.log('Vamos! = ', result));
        });
        return false;
      }
      return true;
    };

    const handleShare = async () => {
      const crypt = (await getUsername(userId.value)) as string;
      const userInfo = await getUser(userId.value);
      const direction = userInfo?.address;

      const existDirection = directionPopoup(direction);
      if (existDirection) {
        const link_url = window.location.href + crypt;
        $q.dialog({
          component: ShareActionsVue,
          componentProps: {
            link: link_url,
            title: 'Comparte tu catalogo',
          },
        });
      }
    };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
    const productList = computed<Product[]>(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
      () => store.getters['shoppingCart/products']
    );
    onMounted(async () => {
    //   if(Object.keys(products).length === 0) {

    //     $q.dialog({
    //    component: ProductPopupVue,
    //     componentProps: {
    //       message: 'Parece que faltan datos a completar en este producto y no se puede compartir.',
    //       title: '¡Oh no! 👀',
    //     }
    // });
    //   }
      $q.loading.show({
        spinner: Loader,
        spinnerColor: 'orange',
        spinnerSize: 140,
        backgroundColor: 'white',
        message: 'Actualizando datos',
        messageColor: 'white',
      });
      //Clean posts selected
      clean();
      console.log('userId.value:', userId.value);
      console.log('userId:', userId);
      console.log('My products are: <', products, '>');

      //Listen payments
      listenPayments(userId.value);
      const userInfo = await getUser(userId.value);
      const direction = userInfo?.address;
      console.log('My direction is --> ', direction);

      //directionPopoup(direction);
      $q.loading.hide();
    });
    return {
      handleSelectProduct,
      getProductLinkHome,
      toDateString,
      handleShare,
      isTestProduct,
      products,
      user,
      productList,
    };
  },
});
</script>

<style lang="scss" scoped>
.shadow-1 {
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 8px;
  gap: 4px;
  width: 162.5px;
  height: 48px;
  background: #ffffff;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  flex: none;
  order: 0;
  flex-grow: 1;
}

.title_name {
  size: 20px;
  order: 1;
  text-align: center;
  align-items: center;
  color: #001e32;
  flex: none;
  font-family: Manrope;
  font-size: 20px;
  font-style: normal;
  font-weight: 900;
  height: 28px;
  letter-spacing: 0.1px;
  line-height: 28px;
}

.text-h4 {
  width: 139px;
  height: 28px;
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 900;
  font-size: 20px;
  line-height: 28px;
  display: flex;
  align-items: center;
  letter-spacing: 0.1px;
  color: #001e32;
  flex: none;
  order: 0;
  flex-grow: 0;
}

.container-page {
  max-height: 100vh;
  overflow-y: scroll;
}

.card_products {
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.188);
  height: auto;
  cursor: pointer;
}

@media (max-width: 600px) {
  .text-h4 {
    width: 139px;
    height: 28px;
    font-family: 'Manrope';
    font-style: normal;
    font-weight: 900;
    font-size: 20px;
    line-height: 28px;
    display: flex;
    align-items: center;
    letter-spacing: 0.1px;
    color: #001e32;
    flex: none;
    order: 0;
    flex-grow: 0;
    margin-left: 20px;
  }
  .title_name {
    size: 20px;
    color: #001e32;
    height: 28px;
    font-family: 'Manrope';
    font-style: normal;
    font-weight: 900;
    font-size: 20px;
    line-height: 28px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: 0.1px;
    color: #001e32;
    flex: none;
    order: 1;
    flex-grow: 0;
  }
}
</style>
