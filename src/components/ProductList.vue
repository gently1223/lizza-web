<template>
  <q-card class="my-card q-ma-md q-pa-sm">
    <img :src="getImage" />
    <q-card-section class="my-selection">
      <slot name="body">
        <div class="row text-left">
          <div class="col-12">
            <span class="text-h5">{{ name }}</span>
          </div>
          <label style="color: green;" v-if="isTest">TEST</label>
          <div class="col-4">
            <q-item-label caption>Precio</q-item-label>
            <q-item-label class="text-caption">{{
              $n(fromCentsToUnit(price), 'currency')
            }}</q-item-label>
          </div>

          <div class="col-3">
            <q-item-label caption>Fecha</q-item-label>
            <q-item-label class="text-caption">{{ date }}</q-item-label>
          </div>
          <div class="col-6 col-sm-3">
            <q-item-label caption>Vendidos</q-item-label>
            <q-item-label class="text-caption">{{ sales || '0' }}</q-item-label>
          </div>
        </div>
      </slot>
    </q-card-section>
    <div v-if="isTest" class="absolute-right">
      <q-badge rounded color="green" label="IS TEST" />
    </div>
    <div v-if="userMode" class="absolute-right">
      <div class="column justify-between full-height">
        <q-btn flat round color="primary" icon="edit" @click.stop="goToEdit" />
        <q-btn
          class="product-btn"
          flat
          round
          color="primary"
          icon="share"
          @click.stop="handleShare"
        />
      </div>
    </div>
  </q-card>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { defineComponent, computed } from 'vue';
import ShareActions from './dialogs/ShareActions.vue';
import { useFormats } from 'src/factories/useFormats';
import { useRouter } from 'vue-router';
export default defineComponent({
  props: {
    price: {
      type: Number,
      required: true,
    },
    sales: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    productLink: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    isTest: {
      type: Boolean,
      default: false,
    },
    userMode: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, ctx) {
    const $q = useQuasar();
    const router = useRouter();
    const { fromCentsToUnit } = useFormats();
    const handleShare = () => {
      //open modal to share url
      $q.dialog({
        component: ShareActions,
        componentProps: {
          link: props.productLink,
        },
      });
    };
    const goToEdit = async () => {
      ctx.emit('click');

      //TODO go to product details in edit mode
      await router.push({
        name: 'ProductDetail',
        params: { editMode: 'true' },
      });
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const getImage = computed(()=>{
      const image = getimages(props.image)[0]
      console.log('I will return the link: ', image)
      return image;
    });
    return { handleShare, fromCentsToUnit, goToEdit, getImage };
  },
});
</script>

<style lang="scss" scoped>
.my-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 282px;
  height: 474px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
  border-radius: 16px;
}

img {
  width: 249px;
  height: 249px;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 1;
  margin: 10px;
  filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25));
  border-radius: 20px;
}

.product-btn {
  width: 250px;
  height: 41px;
  left: 0px;
  top: 136px;
  background: #eb6432;
  border-radius: 100px;
}

@media (max-width: 600px) {
  .my-card {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    width: 335px;
    height: 140px;
    top: 12px;
    margin: 20px 0px;
  }

  img {
    width: 108px;
    height: 108px;
    flex: none;
    margin: 10px 0px;
  }
  .product-btn {
    width: 179px;
    height: 32px;
    left: 0px;
    top: 76px;
    align-self: stretch;
    margin: 6px 0px;
  }
}
</style>
