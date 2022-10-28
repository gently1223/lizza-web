<template>
  <q-card v-if="!toShow" class="my-card q-ma-md q-pa-sm" >
    <q-item  class="item-card">
      <q-item-section avatar class="avatar"  clickable @click="goToEdit">
        <q-avatar rounded size="55px">
          <img :src="getImage" alt="images_prd"/>
        </q-avatar>
      </q-item-section>
      <q-item-section  clickable @click="goToEdit">
        <slot name="body">
          <div class="row text-left">
            <div class="col-12">
              <span class="text-h5">{{ name }}</span>
            </div>
            <div v-if="isTest" class="absolute-right">
              <q-badge rounded color="green" label="IS TEST" />
            </div>
            <div class="items">
            <div class="col-4 price">
              <q-item-label class="price_fecha">Precio</q-item-label>
              <q-item-label class="text-caption">{{
                $n(fromCentsToUnit(price), 'currency')
              }}</q-item-label>
            </div>

            </div>

          </div>
        </slot>
      </q-item-section>
      <div class="absolute-right-share">
      <div class="column justify-between full-height">
       <q-btn
          unelevated
          rounded
          @click.stop="handleShare"
        >
        <img src="icons/button-share.svg" style="withposition: static" class="cart-img" alt=“image_cart” >
      </q-btn>
        <div class="chevron" @click="onClickShow" @click.prevent=" (e) =>  {e.stopPropagation() ; }">
        </div>
      </div>
      </div>
    </q-item>
   </q-card>
   <q-card v-if="toShow" class="my-card q-ma-md q-pa-sm" >
     <div class="onclicked">
              <div class="chevron-regres" @click="onClickNull" @click.prevent=" (e) =>  {e.stopPropagation() ; }">
        </div>
       <q-item class="item-card-clicked">
      <q-item-section avatar class="avatar-clicked"  clickable @click="goToEdit">
        <q-avatar size="55px">
          <img :src="getImage" alt="images_prd" />
        </q-avatar>
      </q-item-section>
      <q-item-section  clickable @click="goToEdit">
        <slot name="body">
          <div class="row text-left">
            <div class="col-12">
              <span class="text-h5">{{ name }}</span>
            </div>
            <div class="items-clicked">
            <div class="col-4 price-clicked">
              <q-item-label class="price_fecha">Precio</q-item-label>
              <q-item-label class="text-caption">{{
                $n(fromCentsToUnit(price), 'currency')
              }}</q-item-label>
            </div>
            </div>

          </div>
        </slot>
      </q-item-section>
    </q-item>
      <div class="absolute-right-share">
      <div class="column justify-between full-height-clicked">
       <q-btn class="btn-class"
          outline
          push
          round
          color="grey-11"
          @click.stop="handleShare"
        >
        <img src="icons/iconoir_share-android-6.svg" style="withposition: static" class="cart-img" alt=“image_cart” >
       </q-btn>
      </div>
      </div>
    <div  class="absolute-right-clicked" >
      <div class="column justify-between full-height-clicked">
        <q-btn class="btn-class"
        outline
        push
        round
        color="grey-11"
        @click.stop="goToEdit" >
        <img src="icons/iconoir_edit-pencil.svg" style="withposition: static" class="cart-img" alt=“image_cart” >
        </q-btn>
      <q-btn
        round
        color="red-5"
        @click="handleDelete"
        >
        <img src="icons/Vector.svg" style="withposition: static" class="cart-img" alt=“image_cart” >
      </q-btn>
       </div>
     </div>
    </div>
  </q-card>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { defineComponent, ref, computed } from 'vue';
import ShareActions from './dialogs/ShareActions.vue';
import { useFormats } from 'src/factories/useFormats';
import { useProductApi } from 'src/factories/useProductApi';
import { useAuthApi } from 'src/factories/useAuthApi';
import popupProductsVue from 'src/components/dialogs/popupProducts.vue';
import { useRouter } from 'vue-router';
import ConfirmVue from 'src/components/dialogs/Confirm.vue';
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
    editMode: {
      type: Boolean,
      default: false,
    },
    uid:{
      type: String,
      required: true,
    },
    dimensions: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default:{
        height: 0,
        width: 0,
        length: 0,
        weight: 0,
        aditional_data: ''
      }
    },
  },

  setup(props, ctx) {
    const { product, deleteUserProduct} = useProductApi();
    const info = ref(null);
    const $q = useQuasar();
    const router = useRouter();
    const { userId } = useAuthApi();
    const editing = ref(props.editMode);
    const { fromCentsToUnit } = useFormats();
    const handleShare = () => {
      if(props.dimensions.height <= 0 ||props.dimensions.width <= 0 || props.dimensions.length <= 0 || props.dimensions.weight <= 0 ){
      $q.dialog({
        component: popupProductsVue,
        componentProps: {
          message: 'Parece que faltan datos a completar en este producto y no se puede compartir.',
          title: '¡Oh no! 👀',
        },
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      }).onOk(async () => {
        await goToEdit();
          // router.push('/detail').catch((e) => console.log('Vamos! = ', result));
        });

    }else {
      //open modal to share url
      $q.dialog({
        component: ShareActions,
        componentProps: {
          link: props.productLink,
        },
      });
    }
  }

  const handleClick = () => {
    console.log('clicked')
  }

  const handleDelete = () => {
      $q.dialog({
        component: ConfirmVue,
        componentProps: {
          title: '¿Deseas eliminar este producto de tu catálogo?',
      },
      }).onOk((result) => {
        console.log('clicked ok, delete', result);
        if (props.uid) {
          deleteUserProduct(userId.value, props.uid)
            .then(() => {
              editing.value = false;
               $q.notify({
               color: 'deep-orange',
               textColor: 'white',
               message: 'Producto eliminado con éxito'
            })
              router.push('/').catch((e) => console.log(e));
            })
            .catch((a) => {
              console.log(a);
            });
           }
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
      myimages.forEach(val => console.log(val, myimages.length))
      return myimages
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const getImage = computed(()=>{
      const image = getimages(props.image)[0]
      console.log('I will return the link: ', image)
      return image;
    });

    const goToEdit = async () => {
      ctx.emit('click');
      console.log('Vamos a mandar => ', {imageProduct: getImage.value as unknown as string});
      //TODO go to product details in edit mode
      await router.push({
        name: 'ProductDetail',
        params: { editMode: 'true', imageProduct: getImage.value as unknown as string },
      });
    };
    return { getImage, handleShare, fromCentsToUnit, goToEdit, handleDelete, info, handleClick };
  },

  data() {
    return {
    swiped: false,
    toShow: false,
    }
  },

  methods: {
    handleSwipe  ({ ...newInfo }) {
       console.log('event:', newInfo);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if(newInfo.direction === 'right' ){
        this.swiped = true;
        }
      },
    onClickShow() {
      this.toShow = true;
    },
    onClickNull() {
      this.toShow = false;
    },
  }
});
</script>

<style lang="scss" scoped>

.full-height {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
}
.text-h5{
  width: 179px;
  height: 16px;
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 900;
  font-size: 14px;
  line-height: 16px;
  color: #001E32;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
  position: relative;
  top: -5px;
}
.price_fecha{
  width: 30px;
  height: 12px;
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  color: #AAAAAA;
  flex: none;
  order: 0;
  flex-grow: 0;
}
.text-caption{
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  color: #434343;
}
.btn-class{
  background: #FFFFFF;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
}
.my-card {
  height: auto;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.188);
  border-radius: 16px;
}
.onclicked {
  display: flex;
  justify-content: center;
  align-items: center;
}
.avatar {
  margin-right: 20px;
}
.items {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-right: 200px;
  width:100%;
}
.absolute-right-clicked {
  position: relative;
  display: flex;
  align-items: center;
  flex-direction:row;
  justify-content: space-evenly;
  width: 230px;
}
.absolute-right-share {
  margin-top: 10px;
}
.items-clicked {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-right: 100px;
  width:100%;
}
.full-height-clicked {
  display: flex;
  align-items: center;
  flex-direction:row;
  justify-content: space-evenly;
  width: 100%;
}
.item-card-clicked {
  width: 450px;
  border-right: 1px solid lightgray;
  margin-right: 30px;
}
.chevron {
  display: inline-block;
  border-right: 4px solid lightgray;
  border-bottom: 4px solid lightgray;
  width: 20px !important; height: 20px !important;
  transform: rotate(-45deg);
  cursor: pointer;
}
.chevron-regres {
  display: inline-block;
  border-right: 4px solid lightgray;
  border-bottom: 4px solid lightgray;
  width: 20px !important; height: 20px !important;
  transform: rotate(-220deg);
  cursor: pointer;
}

@media(max-width:600px){

  .item-card-clicked {
    width: 60%;
    border-right: 1px solid lightgray;
  }
  .avatar-clicked  {
    display: none;
  }
  .price-clicked  {
    display: none;
  }
  .avatar {
    margin-right: 0px;
  }
  .items {
    margin-right: 4px;
    width:100%;
  }
  .items-clicked {
    margin-right: 4px;
    width:100%;
  }
  .absolute-right-share {
    margin-top: 4px;
  }
  .absolute-right-clicked {
    display: flex;
    flex-direction:row;
    justify-content: space-evenly;
    align-items: center;
  }
  .price_fecha{
    width: 30px;
    height: 12px;
    font-family: 'Manrope';
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 12px;
    color: #AAAAAA;
    flex: none;
    order: 0;
    flex-grow: 0;
  }
  .text-h5{
    width: 179px;
    height: 16px;
    font-family: 'Manrope';
    font-style: normal;
    font-weight: 900;
    font-size: 14px;
    line-height: 16px;
    color: #001E32;
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
    position: relative;
    top: -5px;
  }
  .chevron {
    border-right: 3px solid lightgray;
    border-bottom: 3px solid lightgray;
    width: 16px;
    height: 16px;
    max-height: 8px;
    max-width: 8px;
  }
  .chevron-regres {
    border-right: 3px solid lightgray;
    border-bottom: 3px solid lightgray;
    width: 16px;
    height: 16px;
    max-height: 8px;
    max-width: 8px;
  }
  .my-card{
    height: auto;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.188);
    border-radius: 16px;
  }
}

</style>
