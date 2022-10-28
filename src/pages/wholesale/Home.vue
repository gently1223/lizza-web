<template>
  <q-page class="q-pa-md">
    <q-page-sticky position="top-right" :offset="[5, 5]">
      <q-btn round color="primary" icon="power_settings_new" @click="logout" />
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
              class="full-width full-height shadow-1 q-mr-md"
              to="/wholesale/articles"
            >
              <span class="text-caption">Agregar nuevos productos</span>
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
              @click="share"
            >
              <span class="text-caption">Compartir</span>
            </q-btn>
          </div>
        </div>
        <q-separator class="q-my-md" />
        <p class="text-h4">Mi catalogo</p>
        <!-- TODO search input -->
        <!--  List of products -->
        <product-card
          class="cursor-pointer"
          v-for="product in products"
          :key="product.link_id"
          :price="product.price"
          :image="product.image"
          @click="handleSelectProduct(product)"
        >
          <template #body>
            <div class="row text-left">
              <div class="col-12">
                <span class="text-bold">{{ product.name }}</span>
              </div>
              <div class="col-6">
                <q-item-label caption>Precio</q-item-label>
                <q-item-label class="text-caption">{{
                  $n(fromCentsToUnit(product.sell_price), 'currency')
                }}</q-item-label>
              </div>

              <div class="col">
                <q-item-label caption>Ganancia</q-item-label>
                <q-item-label class="text-caption">{{
                  $n(fromCentsToUnit(getEarns(product)), 'currency')
                }}</q-item-label>
              </div>
            </div>
          </template>
        </product-card>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import ShareActionsVue from 'src/components/dialogs/ShareActions.vue';
import { Product } from 'src/components/models';
import ProductCard from 'src/components/ProductCard.vue';
import { useAuthApi } from 'src/factories/useAuthApi';
import { useFormats } from 'src/factories/useFormats';
import { useProductApi } from 'src/factories/useProductApi';
import { useProductForm } from 'src/factories/useProductForm';
import { useUserApi } from 'src/factories/useUserApi';
import { defineComponent, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: { ProductCard },
  setup() {
    const router = useRouter();
    const $q = useQuasar();
    const { products, selectProduct, getCatalogueLink } = useProductApi();
    const { userId, logout } = useAuthApi();
    const { clean } = useProductForm();
    const { toDateString, fromCentsToUnit } = useFormats();
    const { user } = useUserApi();
    const handleSelectProduct = async (product: Product) => {
      console.log(product);
      selectProduct(product);
      await router.push('/wholesale/product');
    };
    const share = () => {
      const link = getCatalogueLink(userId.value);
      console.log('todo share modal', link);
      $q.dialog({
        component: ShareActionsVue,
        componentProps: {
          link,
          title: 'Comparte tu catalogo',
        },
      });
    };
    const getEarns = (product: Product) => {
      return product.sell_price && product.price
        ? product.sell_price - product.price
        : 0;
    };
    onMounted(() => {
      //Clean posts selected
      clean();
      console.log(userId.value);
    });
    return {
      handleSelectProduct,
      toDateString,
      share,
      getEarns,
      fromCentsToUnit,
      logout,
      products,
      user,
    };
  },
});
</script>

<style lang="scss" scoped></style>
