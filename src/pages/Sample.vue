<template>
  <q-page class="q-pt-md">
    <q-page-sticky position="top-right" :offset="[5, 5]" style="z-index: 1">

    </q-page-sticky>

    <div class="row text-center justify-center">
      <div class="col-12 col-sm-8 col-md-6">
        <!-- User profile name and image if posible -->
        <q-avatar size="100px">
          <img src="icons/insta-logo.png" />
        </q-avatar>
        <h4 v-if="user">@{{ user.username }}</h4>
        <!-- Link to articles/posts view -->
        <div class="row q-gutter-md">
          <div class="col">
            <q-btn
              no-caps
              stack
              flat
              icon="add"
              color="primary"
              class="full-width full-height shadow-1"
              to="/posts"
            >
              <span>Crea nuevo producto</span>
            </q-btn>
          </div>
          <div class="col">
            <q-btn
              stack
              no-caps
              flat
              icon="share"
              color="primary"
              class="full-width full-height shadow-1"
              @click="handleShare"
            >
              <span class="text-caption">Compartir</span>
            </q-btn>
          </div>
        </div>

        <q-separator class="q-my-md" />
        <p class="text-h4">Mis productos</p>
        <!-- List of card links -->
        <div @click.stop="doThis">
        <product-card
          class="cursor-pointer"
          v-for="product in productlist"
          :key="product.link_id"
          :price="product.price || 0"
          :image="product.image || ''"
          :name="product.name"
          :sales="product.payments"
          :productLink="getProductLink(product)"
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
      <Pwa-Menu></Pwa-Menu>
  </div>
</template>

<script lang="ts">
import HamburguerMenu from 'src/components/HamburguerMenu.vue';
import PwaMenu from 'src/components/PwaMenu.vue';
import { Product } from 'src/components/models';
import ProductCard from 'src/components/ProductCard.vue';
import { useAuthApi } from 'src/factories/useAuthApi';
import { useFormats } from 'src/factories/useFormats';
import { usePostForm } from 'src/factories/usePostForm';
import { useProductApi } from 'src/factories/useProductApi';
import { usePaymentsApi } from 'src/factories/usePaymentsApi';
import { useUserApi } from 'src/factories/useUserApi';
import { defineComponent, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import ShareActionsVue from 'src/components/dialogs/ShareActions.vue';
import popupInactivoVue from 'src/components/dialogs/popupInactivo.vue';
import AlertPersonalDataVue from 'src/components/dialogs/AlertPersonalData.vue';

export default defineComponent({
   props: {
    dimensions: {
      type: Number,
      required: true,
    }
   },
  components: { ProductCard, PwaMenu },
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const { products, selectProduct, getProductLink, isTestProduct } =
      useProductApi();
    const { userId } = useAuthApi();
    const { clean } = usePostForm();
    const { toDateString } = useFormats();
    const { listenPayments } = usePaymentsApi();
    const { user } = useUserApi();
    const handleSelectProduct = async (product: Product) => {
      console.log(product);
      selectProduct(product);
      await router.push('/detail');
    };
    const productlist = [{
  'username': 'vendeenlineamexico',
  'url': 'https://buy.stripe.com/7sIfZ96IDcHt2jKbKI',
  'image': 'https://firebasestorage.googleapis.com/v0/b/lizza-s-pocs.appspot.com/o/instagram-4873625682684686%2F1651657165788%2Fproduct.png?alt=media&amp;token=4288fefc-1f28-46ff-8ef5-a2bc29e4ae10',
  'description': 'ddd',
  'uid': 'h78U5bNkLlV8sAsghpOD',
  'price': 40000,
  'date': {
    'seconds': 1651657168,
    'nanoseconds': 988000000
  },
  'name': 'rere'
}]
    const handleShare = () => {
      const crypt = btoa(userId.value);

      $q.dialog({
        component: ShareActionsVue,
        componentProps: {
          link: 'https://lizza.app/products/' + crypt,
          title: 'Comparte tu catalogo',
        },
      });
    };
     const popupInactivoP = () => {
      $q.dialog({
        component: popupInactivoVue,
        componentProps: {
          message: 'Este producto no se puede compartir porque se encuentra inactivo. Para activarlo ve a la edición del producto',
          title: 'Producto Inactivo',
        },
      });
    };
    const popupdatos = () => {
      $q.dialog({
          component: AlertPersonalDataVue,
          componentProps: {
            title: '¡Sólo un paso más! 👀',
            message: 'Agrega tus datos de contacto y de envío para poder vender en linea y gestionar tus envíos. '
          },
        }).onOk((result) => {
          router.push('/settings').catch((e) => console.log('Vamos! = ', result));
        });
    }
    onMounted(() => {
      //Clean posts selected
      clean();
      console.log(userId.value);
      //Listen payments
      listenPayments(userId.value);
    });
    return {
      handleSelectProduct,
      getProductLink,
      toDateString,
      handleShare,
      isTestProduct,
      products,
      user,
      productlist,
      popupInactivoP,
      popupdatos
    };
  },
});
</script>

<style lang="scss" scoped></style>
