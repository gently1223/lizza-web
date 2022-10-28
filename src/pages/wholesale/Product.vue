<template>
  <q-page>
    <q-toolbar class="shadow-1">
      <q-btn flat round color="primary" icon="arrow_back" to="/" />
      <q-toolbar-title class="text-center">
        <div v-if="formProducts.length" style="max-width: 150px">
          <q-img src="icons/lizza_logo_sign_in.svg" />
        </div>
        <span v-else class="text-primary text-bold">
          Detalles de producto
        </span>
      </q-toolbar-title>
      <q-btn
        v-if="!formProducts.length"
        flat
        round
        color="primary"
        icon="delete"
        @click="deleteProduct"
      />
    </q-toolbar>

    <div class="row justify-center q-my-md">
      <div class="col-12 col-sm-8 col-md-6">
        <span class="q-ml-md"
          >{{ products.length }} de {{ formProducts.length }} productos
          agregados</span
        >
        <q-linear-progress :value="progress" class="q-my-md" />
        <div class="text-center">
          <img class="product_img rounded-borders" :src="product.image" />
        </div>

        <q-separator class="separador" color="orange" inset />

        <div class="q-px-md column">
          <div class="text-bold">{{ product.name }}</div>
          <!-- Shop info price -->
          <div class="text-bold text-grey">Precio de tienda</div>
          <div class="text-bold">
            {{ $n(fromCentsToUnit(product.price), 'currency') }}
          </div>
          <!-- Sell price input -->
          <div class="text-bold text-grey">Precio de reventa</div>
          <div style="max-width: 100px">
            <q-input
              rounded
              outlined
              dense
              placeholder="$0"
              :label="$n(sell_price || 0, 'currency')"
              v-model="sell_price"
              type="number"
            />
          </div>
          <p>{{ product.description }}</p>

          <q-btn
            rounded
            class="q-py-md"
            color="primary"
            label="Agregar a mi catálogo"
            @click="handleClick"
            :disable="!sell_price"
          >
          </q-btn>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import {  useQuasar } from 'quasar';
// import { usePostForm } from 'src/factories/usePostForm';
// import { useStripe } from 'src/factories/useStripe';
// import { useStorageApi } from 'src/factories/useStorageApi';
import { defineComponent, onMounted, computed, ref } from 'vue';
import { useRouter } from 'vue-router';
// import { analytics } from 'boot/firebase';
// import { Product } from 'src/components/models';
// import { useAuthApi } from 'src/factories/useAuthApi';
import { useProductForm } from 'src/factories/useProductForm';
import { useFormats } from 'src/factories/useFormats';
import { useStripe } from 'src/factories/useStripe';
import { useProductApi } from 'src/factories/useProductApi';
import { Product } from 'src/components/models';
import Loader from 'src/components/Loader.vue';

export default defineComponent({
  components: {
      // eslint-disable-next-line vue/no-unused-components
      Loader
    },
  setup() {
    const $q = useQuasar();
    const sell_price = ref<number>();
    const {
      products,
      formProducts,
      nextProduct,
      product: productForm,
    } = useProductForm();
    const { createInhousePaymentLink } = useStripe();
    const { product: productSelected } = useProductApi();
    const product = ref<Product>({ ...productForm.value });

    // const { uploadImg, convertToBlob } = useStorageApi();
    // const { userId } = useAuthApi();
    const router = useRouter();
    const { fromCentsToUnit } = useFormats();
    const deleteProduct = () => {
      console.log('delete');
    };
    const handleClick = async () => {
      $q.loading.show({
        spinner: Loader,
        spinnerColor: 'orange',
        spinnerSize: 140,
        backgroundColor: 'white',
        message: 'Generando producto',
        messageColor: 'white',
      });
      //Set default price
      if (!sell_price.value) sell_price.value = 0;
      //Assign sell price value to product
      product.value.sell_price = sell_price.value * 100;
      // console.log(product.value);

      //create product and link with price_id and product_id of our product
      const result = product.value.uid
        ? await createInhousePaymentLink(
            product.value.uid,
            product.value.sell_price
          )
        : { success: false };
      // const result = { success: true };
      if (result.success) {
        console.log('productsValues',product.value);
        //Add product to form
        products.value.push({
          ...product.value,
        });

        // analytics.logEvent('catalogue_product_created');
        if (!nextProduct()) {
          //Clear price
          sell_price.value = undefined;
          await router.push({ path: '/wholesale' });
        } else {
          console.log({ ...product.value });

          sell_price.value = product.value.sell_price
            ? product.value.sell_price / 100
            : undefined;
        }
      } else {
        //TODO handle error, minimun amount and stuff
        // analytics.logEvent('catalogue_product_created_failed', {
        //   message: result.value,
        // });
        console.log('error');
        $q.dialog({
          title: 'ERROR',
          message: 'Contacte con soporte',
        }).onOk(() => {
          console.log('error');
        });
      }

      $q.loading.hide();
    };
    const progress = computed(() => {
      return products.value.length / formProducts.value.length;
    });
    onMounted(() => {
      //If form products selected then start the flow
      if (formProducts.value.length) {
        nextProduct();
        console.log({ ...product.value });
      } else {
        //if not product forms then try yo get the product selected
        product.value = { ...productSelected.value };
      }
      sell_price.value = product.value.sell_price
        ? product.value.sell_price / 100
        : undefined;
    });
    return {
      formProducts,
      progress,
      product,
      products,
      sell_price,
      productSelected,
      handleClick,
      deleteProduct,
      fromCentsToUnit,
    };
  },
});
</script>

<style lang="scss" scoped>
.separador {
  color: #e75935;
  margin-bottom: 1em;
}
.div_cabecera {
  text-align: center;
  margin-top: 1em;
  margin-bottom: 2em;
}

.cabecera_icon {
  width: 2em;
  height: 2em;
  position: absolute;
  left: 0em;
  margin-left: 1em;
}

.titulo {
  margin-bottom: 2em;
  color: #e75935;
}
.cabecera {
  color: #e75935;
}

.precio_label {
  position: static;
  left: 7.84%;
  right: 17.65%;
  top: 0%;
  bottom: 0%;

  margin-bottom: 1em;

  font-family: Manrope;
  font-style: normal;
  font-weight: 800;
  font-size: 12px;
  line-height: 16px;

  color: #a3b4bc;
}

.sell_btn {
  background: #e75935;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  width: 25em;
  height: 4em;
  margin-top: 2em;
  margin-bottom: 2em;
  left: 1em;
  right: 1em;
}

.box_precio {
  margin-top: 2em;
}

.box_nombre {
  margin-top: 2em;
}

.box_descripcion {
  margin-top: 2em;
}

.product_img {
  width: 100%;
}
</style>
