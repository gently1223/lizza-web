<template>
  <q-page>
    <q-toolbar class="shadow-1">
      <q-toolbar-title class="text-center">
        <span v-if="products[0]" class="text-primary text-bold">
          @{{ products[0].username }}
        </span>
      </q-toolbar-title>
    </q-toolbar>
    <div class="row justify-center q-mx-md">
      <div class="col-12 col-md-5">
        <div class="text-h5">Todos los productos</div>
        <product-card
          v-for="product in products"
          :key="product.link_id"
          :image="product.image"
        >
          <template #body>
            <div class="row text-left">
              <div class="col-12">
                <span class="text-bold">{{ product.name }}</span>
              </div>
              <div class="col-12">
                <q-item-label class="text-grey text-bold">{{
                  $n(fromCentsToUnit(product.sell_price), 'currency')
                }}</q-item-label>
              </div>
              <div class="col-12">
                <q-btn
                  class="full-width"
                  dense
                  color="primary"
                  icon="shopping_basket"
                  label="Comprar"
                  :href="product.url"
                />
              </div>
            </div>
          </template>
        </product-card>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { auth } from 'src/boot/firebase';
import ProductCard from 'src/components/ProductCard.vue';
import { useAuthApi } from 'src/factories/useAuthApi';
import { useFormats } from 'src/factories/useFormats';
import { useProductApi } from 'src/factories/useProductApi';
import { defineComponent, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: { ProductCard },
  setup() {
    //Get route link id
    const router = useRouter();

    const { loginAnonym, isLoggedIn, user } = useAuthApi();
    const { listenCatalogueProducts, products } = useProductApi();
    const { fromCentsToUnit } = useFormats();

    //Login anonym on mounted
    onMounted(async () => {
      if (!isLoggedIn()) {
        await loginAnonym();
      }
      //Retrieve public link info(stripe url, price, image, date..)
      const p = router.currentRoute.value.params.id.toString();
      const decrypt = atob(p);
      console.log(p, decrypt);
      //0tJnMYcpIQJ6m5vEct0H
      //Get products from catalogue
      listenCatalogueProducts(decrypt);
      //Signout only if not an insta user
      if (!user.value?.displayName) {
        await auth().signOut();
      }
    });
    return { products, fromCentsToUnit };
  },
});
</script>

<style lang="scss" scoped></style>
