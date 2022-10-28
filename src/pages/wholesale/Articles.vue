<template>
  <q-page class="q-mx-md">
    <p class="text-h5 text-center">
      Elige los productos que quieres vender, en 2 minutos tendrás tu catálogo
      ready sin inversión
    </p>
    <!-- TODO filter component -->
    <div class="row q-gutter-md justify-center">
      <q-card
        class="col-5"
        v-for="product in inhouseProducts"
        :key="product.uid"
      >
        <q-img class="image" :src="product.image" />
        <div class="absolute-right q-ma-xs">
          <q-checkbox
            keep-color
            color="primary"
            v-model="formProducts"
            :val="product"
            checked-icon="check_circle"
            unchecked-icon="radio_button_unchecked"
          />
        </div>
        <q-separator inset />
        <q-card-section>
          <div class="text-bold text-caption">{{ product.name }}</div>
          <div class="text-caption">
            <span class="text-grey">Precio:</span
            >{{ $n(fromCentsToUnit(product.price), 'currency') }}
          </div>
          <div class="text-caption">
            <span class="text-grey">Vender en:</span
            >{{ $n(fromCentsToUnit(product.sell_price), 'currency') }}
          </div>
        </q-card-section>
      </q-card>
    </div>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        rounded
        color="primary"
        icon-right="arrow_forward"
        :label="ctaLabel"
        @click="handleClick"
        :disable="!formProducts.length"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useProductForm } from 'src/factories/useProductForm';
import { useAuthApi } from 'src/factories/useAuthApi';
import { useQuasar } from 'quasar';
// import { analytics } from 'boot/firebase';
import { useProductApi } from 'src/factories/useProductApi';
import { useFormats } from 'src/factories/useFormats';
import Loader from 'src/components/Loader.vue';

export default {
  components: {
      // eslint-disable-next-line vue/no-unused-components
      Loader
    },
  setup() {
    const $q = useQuasar();
    const $router = useRouter();
    const { formProducts, clean } = useProductForm();
    const { logout, userId } = useAuthApi();
    const { fromCentsToUnit } = useFormats();
    const { inhouseProducts, getInhouseProducts, listenCatalogueProducts } =
      useProductApi();
    // user.value.displayName
    onMounted(async () => {
      listenCatalogueProducts(userId.value);
      clean();
      $q.loading.show({
        spinner: Loader,
        spinnerColor: 'orange',
        spinnerSize: 140,
        backgroundColor: 'white',
        message: 'Buscando posibles productos',
        messageColor: 'white',
      });
      await getInhouseProducts();
      // await getCatalogue(userId);
      $q.loading.hide();
    });
    // const postDisabled = (value) => {
    //   return formPosts.value.length > 0 && !formPosts.value.includes(value);
    // };
    const handleClick = async () => {
      // analytics.logEvent('catalogue_product_selected');
      await $router.push('/wholesale/product');
    };

    const ctaLabel = computed(() => {
      return `${formProducts.value.length} productos`;
    });
    return {
      formProducts,
      inhouseProducts,
      ctaLabel,
      logout,
      handleClick,
      fromCentsToUnit,
    };
  },
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
</style>
