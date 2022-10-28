<!-- eslint-disable vue/no-mutating-props -->
<!-- eslint-disable vue/valid-v-for -->
<template>
  <q-card class="column">
    <img  v-if="numberImages === 1" :src="getImage" class="product_img rounded-borders" />
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

    <q-card-section>
      <div class="text-h6">{{ name }}</div>
    </q-card-section>

    <q-card-section>
      <q-item-label caption>Precio</q-item-label>
      <div class="text-subtitle2">
        {{ $n(fromCentsToUnit(price), 'currency') }}
      </div>
    </q-card-section>

    <q-card-section>
      <q-item-label caption>Stock</q-item-label>
      <div class="text-subtitle2">
        {{  stock }}
      </div>
    </q-card-section>

    <q-card-section>
      <q-item-label caption>Descripción del producto</q-item-label>
      <div class="text-subtitle2">{{ description }}</div>
    </q-card-section>

    <!-- <q-card-section v-if="productLink">
      <q-item-label caption>Liga de pago</q-item-label>
      <div class="text-subtitle2 text-primary">{{ productLink }}</div> -->
    <!-- TODO copy to clipboard -->
    <!-- </q-card-section> -->

    <q-toggle
      v-model="isProductActive"
      label="Producto activo"
    />

    <slot name="ctas"> </slot>
  </q-card>
</template>

<script lang="ts">
import { useFormats } from 'src/factories/useFormats';
import { defineComponent, computed, ref } from 'vue';

export default defineComponent({
  props: {
    price: {
      type: Number,
      required: true,
    },
    stock: {
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
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const { fromCentsToUnit } = useFormats();
    const isProductActive = ref(props.isActive);

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

    console.log('Propiedad isActive - ProdutSummary: ', props.isActive)



    return {
      fromCentsToUnit,
      getImage,
      numberImages,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      slide: ref(1),
      imagesSrc,
      isProductActive
    };
  },
});
</script>

<style lang="scss" scoped>

  .product_img {
    width: 335px;
    height: 335px;
    margin-bottom: 2em;
    border-radius: 16px;
  }
  @media(max-width:600px){
    .product_img {
    width: 100%;
    height: 335px;
      margin-bottom: 2em;
    }
  }
</style>
