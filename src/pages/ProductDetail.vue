<template>
  <q-page class="container-page">
    <q-toolbar class="shadow-1">
      <q-btn flat round color="primary" icon="arrow_back" to="/" v-if="!showDimensions"/>
      <q-btn flat round color="secondary" icon="arrow_back" @click="firstpart" v-if="showDimensions"/>
      <q-toolbar-title class="text-center">
        <span class="text-primary text-bold"> Detalles de producto </span>
      </q-toolbar-title>
      <q-btn
        v-if="editing"
        flat
        round
        color="primary"
        icon="delete"
        @click="handleDelete"
      />
      <q-btn
        v-else
        flat
        round
        color="primary"
        icon="edit"
        @click="editing = true"
      />
    </q-toolbar>
    <div class="row justify-center q-pa-md">
      <div class="col-12 col-sm-7">
        <!-- The product view component -->
        <product-summary
          v-if="product && !editing"
          :price="product.price"
          :image="product.image"
          :description="product.description"
          :name="product.name"
          :isActive="product.isActive"
        >
          <template #ctas>
            <!-- <q-btn
              rounded
              flat
              class="q-py-md q-ma-md"
              color="primary"
              @click="handleShare"
            >
              <span>Compartir liga de pago</span>
            </q-btn> -->

            <!-- <q-btn
              class="q-ma-sm"
              label="Listo!"
              type="submit"
              padding="12px 8px"
              size="1rem"
              unelevated rounded
              :color="getColor"
              :text-color="getTextColor"
              no-caps
              @click="goToDimensionsProduct"/> -->

          </template>
        </product-summary>
        <q-card v-else-if="productForm" class="column">
          <div v-show="!showDimensions">
            <img v-if="modeCreateProduct == 'instagram'" ref="image" class="rounded-borders image-section insta" :src="productForm.image" />
            <div v-if="modeCreateProduct == 'photo'" class="q-mb-md">
              <q-card class="form">
                <p class="title">Fotos</p>
                <div class="container-fotos">
                  <div class="container-fotos_foto">
                    <q-img
                      :src="srcImgProduct1"
                      class="add-img"
                      @click="uploadImage1"
                    />
                    <img v-if="showCloseImage1" src="icons/button-close.svg" alt="close" class="close-img" @click="removeImage1">
                  </div>
                  <div class="container-fotos_foto">
                    <q-img
                      :src="srcImgProduct2"
                      class="add-img"
                      @click="uploadImage2"
                    />
                    <img v-if="showCloseImage2" src="icons/button-close.svg" alt="close" class="close-img" @click="removeImage2">
                  </div>
                  <div class="container-fotos_foto">
                    <q-img
                      :src="srcImgProduct3"
                      class="add-img"
                      @click="uploadImage3"
                    />
                    <img v-if="showCloseImage3" src="icons/button-close.svg" alt="close" class="close-img" @click="removeImage3">
                  </div>
                </div>
                <div class="prueba-fileapi">
                  <input type="file" id="gallery" accept="image/*" @change="previewImage($event.target.files)" style="display:none">
                  <input type="file" id="photo" capture accept="image/*" @change="previewImage($event.target.files)" style="display:none">
                </div>
              </q-card>
            </div>
            <div class="q-pa-md column">
              <q-input
                rounded
                :input-style="{ textAlign: 'center', fontSize: '22px' }"
                class="q-mb-md"
                outlined
                label="Precio"
                v-model="productForm.price"
                type="number"
              />

              <!-- <p class="text-center text-bold text-grey">Precio</p> -->

              <q-input
                class="q-mb-md"
                rounded
                outlined
                label="Nombre del Producto"
                v-model="productForm.name"
              />

              <q-input
                class="q-mb-md"
                rounded
                outlined
                label="Descripción"
                type="textarea"
                v-model="productForm.description"
              />

              <q-toggle
                v-model="productForm.isActive"
                label="Producto activo"
              />
              <!-- <q-radio v-model="group" val="false" label="Producto activo" type="toggle"/> -->

              <q-btn
                rounded
                class="q-py-md"
                color="primary"
                label="Siguiente"
                @click="showDimensionsProduct"
                :disable="!productForm.price || !productForm.name"
              >
              </q-btn>
            </div>
          </div>
          <div v-if="showDimensions" class="product-dimensions">
            <q-form @submit="updateProduct" class="q-gutter-md q-mt-sm q-pa-md">
              <q-card class="form">
                <div class="header">
                  <p class="title">Datos para envíos</p>
                  <q-avatar size="20px">
                    <img src="icons/help_outline.svg" @click="alert = true"/>
                  </q-avatar>
                </div>
                <p class="subtitle">Dimensiones en centimetros</p>
                <div class="dimensions">
                  <q-input
                      rounded outlined
                      type="number"
                      v-model="productForm.dimensions.length"
                      label="Largo"
                      class="q-mb-sm dimension"
                      lazy-rules
                      no-error-icon
                      :rules="[ val => val && val.length > 0 || 'Este campo es obligatorio']"
                    />
                  <q-input
                    rounded outlined
                    type="number"
                    v-model="productForm.dimensions.height"
                    label="Alto"
                    class="q-mb-sm dimension"
                    lazy-rules
                    no-error-icon
                    :rules="[ val => val && val.length > 0 || 'Este campo es obligatorio']"
                  />
                  <q-input
                    rounded outlined
                    type="number"
                    v-model="productForm.dimensions.width"
                    label="Ancho"
                    class="q-mb-sm dimension"
                    lazy-rules
                    no-error-icon
                    :rules="[ val => val && val.length > 0 || 'Este campo es obligatorio']"
                  />
                </div>
                <p class="subtitle">Peso en kilos</p>
                <q-input
                    type="number"
                    step="0.1"
                    rounded outlined
                    v-model="productForm.dimensions.weight"
                    label="Peso"
                    class="q-mb-sm"
                    lazy-rules
                    no-error-icon
                    :rules="[ val => val && val.length > 0 || 'Este campo es obligatorio']"
                  />
                <q-input
                  rounded outlined
                  v-model="productForm.aditional_data"
                  label="Detalles adicionales"
                  class="q-mb-sm"
                  lazy-rules
                  no-error-icon
                />
              </q-card>
              <div>
                <q-btn
                  label="Listo!"
                  type="submit"
                  padding="12px 8px"
                  size="1rem"
                  unelevated rounded
                  color="primary"
                  text-color="white"
                  class="full-width"
                  :disable="false"
                  no-caps/>
              </div>
            </q-form>
            <q-dialog v-model="alert">
              <q-card>
                <q-card-section>
                  <div class="text-h6">Especificaciones para envíos</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  Estos campos son esenciales para poder gestionar el envío de tus productos. Considera el empaque final en el cual se enviará el producto.
                </q-card-section>

                <q-card-actions align="right">
                  <q-btn flat label="OK" color="primary" v-close-popup />
                </q-card-actions>
              </q-card>
            </q-dialog>
          </div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import { useQuasar } from 'quasar';
import { useProductApi } from 'src/factories/useProductApi';
import ProductSummary from 'src/components/ProductSummary.vue';
import ShareActions from 'src/components/dialogs/ShareActions.vue';
import { useAuthApi } from 'src/factories/useAuthApi';
import { useFormats } from 'src/factories/useFormats';
import { Product } from 'src/components/models';
import ConfirmVue from 'src/components/dialogs/Confirm.vue';
import { useRouter } from 'vue-router';
import Loader from 'src/components/Loader.vue';
import { useStorageApi } from 'src/factories/useStorageApi';

export default defineComponent({
  // eslint-disable-next-line vue/no-unused-components
  components: { ProductSummary, Loader },
  props: {
    editMode: {
      type: Boolean,
      default: false,
    },
    imageProduct: {
      type: String
    }
  },
  setup(props) {
    const { product, getProductLink, udpateUserProduct, deleteUserProduct } =
      useProductApi();
    const router = useRouter();
    const { userId } = useAuthApi();
    const { fromCentsToUnit } = useFormats();
    const { uploadImgString } = useStorageApi();
    const $q = useQuasar();
    let group = ref([false]);
    const editing = ref(props.editMode);
    let showDimensions = ref(false)
    let alert = ref(false)
    let modeCreateProduct = ref('photo');
    let currentImage = ref(1);
    let srcImgAddProduct = 'images/add-image.svg';
    let srcImgProduct1 = ref(srcImgAddProduct);
    let srcImgProduct2 = ref(srcImgAddProduct);
    let srcImgProduct3 = ref(srcImgAddProduct);
    let showCloseImage1 = ref(true)
    let showCloseImage2 = ref(true)
    let showCloseImage3 = ref(true)
    let countImages = ref(0);
    modeCreateProduct.value = product.value.image?.includes('|') ? 'photo' : 'instagram';
    let srcImagesProducts = ref(['', '', '']);

    const isValidForm = true;

    const getColor = computed(()=>{
      return isValidForm ? 'primary' : 'grey-3'
    });
    const getTextColor = computed(()=>{
      return isValidForm ? 'white' : 'grey-5'
    });

    let productForm = ref<Product>();
    const originalPrice = product.value?.price;
    const handleShare = () => {
      //open modal to share url
      $q.dialog({
        component: ShareActions,
        componentProps: {
          link: getProductLink(product.value),
        },
      });
    };
    const handleDelete = () => {
      $q.dialog({
        component: ConfirmVue,
        componentProps: {
          title: '¿Deseas eliminar este producto de tu catálogo?',
        },
      }).onOk((result) => {
        console.log('clicked ok, delete', result);
        if (product.value.uid) {
          deleteUserProduct(userId.value, product.value.uid)
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

    const showDimensionsProduct = () => {
      showDimensions.value = true;
    };
    const uploadImage1 = () => {
      if(showCloseImage1.value) return

      currentImage.value = 1;
      showActionSheet();
    }
    const uploadImage2 = () => {
      if(showCloseImage2.value) return

      currentImage.value = 2;
      showActionSheet();
    }
    const uploadImage3 = () => {
      if(showCloseImage3.value) return

      currentImage.value = 3;
      showActionSheet();
    }

    const removeImage1 = () => {
      srcImgProduct1.value = srcImgAddProduct;
      showCloseImage1.value = false;
      countImages.value -= 1;
      srcImagesProducts.value[0] = '';
    }
    const removeImage2 = () => {
      srcImgProduct2.value = srcImgAddProduct;
      showCloseImage2.value = false;
      countImages.value -= 1;
      srcImagesProducts.value[1] = '';
    }
    const removeImage3 = () => {
      srcImgProduct3.value = srcImgAddProduct;
      showCloseImage3.value = false;
      countImages.value -= 1;
      srcImagesProducts.value[2] = '';
    }

    const previewImage = (files: FileList) => {
      const file = files.item(0);
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        //const urlImgStringBase64 = reader?.result.toString();
        if(reader.result) {
          switch (currentImage.value) {
            case 1:
              srcImgProduct1.value = reader.result.toString();
              showCloseImage1.value = true;
              srcImagesProducts.value[0] = srcImgProduct1.value;
              break;
            case 2:
              srcImgProduct2.value = reader.result.toString();
              showCloseImage2.value = true;
              srcImagesProducts.value[1] = srcImgProduct2.value;
              break;
            default:
              srcImgProduct3.value = reader.result.toString();
              showCloseImage3.value = true;
              srcImagesProducts.value[2] = srcImgProduct3.value;;
              break;
          }
          countImages.value += 1;
        }
      }, false);

      if (file) {
        reader.readAsDataURL(file);
      }
    };

    const showActionSheet = () => {
      $q.bottomSheet({
        message: 'Escoge una opción',
        grid: true,
        actions: [
          {
            label: 'Subir de galería',
            img: 'icons/button-image.svg',
            id: 'gallery',

          },
          {
            label: 'Tomar una foto',
            img: 'icons/button-camara.svg',
            id: 'photo',

          }
        ]
      }).onOk(({id}) => {
        console.log('Action chosen:', id)
        doClickOnInputFile(id);

      }).onCancel(() => {
        // console.log('Dismissed')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    }

    const doClickOnInputFile = (id: string) => {
      document.getElementById(id)?.click();
    }

    const fillProductForm = () => {
      console.log('here product value', product.value);
      if(modeCreateProduct.value =='instagram') {
      productForm.value = {
        name: product.value.name,
        url: product.value.url,
        image: product.value.image,
        price: fromCentsToUnit(product.value.price),
        description: product.value.description,
        isActive: product.value.isActive,
        dimensions: {
          length: product.value.dimensions.length,
          height: product.value.dimensions.height,
          width: product.value.dimensions.width,
          weight: product.value.dimensions.weight
        },
        aditional_data: product.value.aditional_data ? product.value.aditional_data: '',
      };
      }else{
        const myimg = getimages(product.value.image as string);
        console.log('myimg: ', myimg);
        productForm.value = {
          name: product.value.name,
          url: product.value.url,
          price: fromCentsToUnit(product.value.price),
          description: product.value.description,
          isActive: product.value.isActive,
          dimensions: {
            length: product.value.dimensions.length,
            height: product.value.dimensions.height,
            width: product.value.dimensions.width,
            weight: product.value.dimensions.weight
          },
          aditional_data: product.value.aditional_data ? product.value.aditional_data: '',
        };

        srcImgProduct1.value = myimg[0];
        srcImgProduct2.value = myimg[1];
        srcImgProduct3.value = myimg[2];
        srcImagesProducts.value[0] = myimg[0];
        srcImagesProducts.value[1] = myimg[1];
        srcImagesProducts.value[2] = myimg[2];

      }
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
    };

    const updateProduct = async () => {
      //Show loading
      $q.loading.show({
        spinner: Loader,
        spinnerColor: 'orange',
        spinnerSize: 140,
        backgroundColor: 'white',
        message: 'Actualizando producto',
        messageColor: 'white',
      });
      if (productForm.value) {
        //turn price back to units
        console.log('hola');
        if (!productForm.value.price) productForm.value.price = 0;
        console.log('Antes multiplicar - El precio original es: ', originalPrice, ' y el modificado es: ', productForm.value.price);
        productForm.value.price = productForm.value.price * 100;
        console.log(productForm.value.price);

        if(modeCreateProduct.value == 'photo') {
          const porfa = await insertimages(userId.value, srcImagesProducts.value);
          productForm.value.image = porfa;
        }

        await udpateUserProduct(userId.value, {
          ...productForm.value,
          uid: product.value.uid,
        });
        fillProductForm();
      }
      await router.push('/');
      showDimensions.value = false;
      $q.loading.hide();
    }

    const insertimages = async (userId: string, srcImagesProductsFinal: string[]) => {
      console.log('insertimages - srcImagesProductsFinal:', srcImagesProductsFinal);
      const finalimages: string[] = [];
      for (let index = 0; index < srcImagesProductsFinal.length; index++) {
        if(srcImagesProductsFinal[index] !== undefined) {
          if(srcImagesProductsFinal[index].trim().length > 0) {
            console.log('Entró aunque es vacía');
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const url = await uploadImgString(userId, srcImagesProductsFinal[index]);
            console.log('Url retornada al guardar la imagen:', url);
            finalimages.push(url);
          }
        }
      }
      var newstr = '';
      console.log('insertimages - finalimages:', finalimages);
      finalimages.forEach(element => newstr += element + '|');
      return newstr;
    }
    const firstpart = () => {
      showDimensions.value = false;
    }

    onMounted(() => {
      $q.loading.show({
        spinner: Loader,
        spinnerColor: 'orange',
        spinnerSize: 140,
        backgroundColor: 'white',
        message: 'Actualizando producto',
        messageColor: 'white',
      });
      fillProductForm();
      $q.loading.hide();
    });
    return {
      firstpart,
      editing,
      product,
      productForm,
      handleShare,
      handleDelete,
      showDimensionsProduct,
      group,
      getColor,
      getTextColor,
      showDimensions,
      alert,
      updateProduct,
      modeCreateProduct,
      uploadImage1,
      uploadImage2,
      uploadImage3,
      previewImage,
      srcImgProduct1,
      srcImgProduct2,
      srcImgProduct3,
      showActionSheet,
      doClickOnInputFile,
      showCloseImage1,
      showCloseImage2,
      showCloseImage3,
      removeImage1,
      removeImage2,
      removeImage3,
      countImages
    };
  },
});
</script>

<style lang="scss" scoped>
.container-fotos{
  display: flex;
  justify-content:space-between;
}
.image-section {
  width: 40%;
  display: block;
  margin: 0 auto;
}

.insta {
  width: 335px;
  height: 335px;
  filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25));
  border-radius: 20px;
}
.add-img{
  width: 70px;
  height: 70px;
}
.close-img {
  width: 22px;
  position: relative;
  bottom: 15px;
  right: 22px;
}
//Dimensions
  //mobile
  @media screen and (max-width: 800px) {
    .dimensions {
      display: flex;
      justify-content: space-between;
      gap: 5px;
    }
    .dimension {
      width: 30%;
      margin-right: 5px;
    }
  }
  .form {
    padding: 20px;
  }
  .header {
    display: flex;
    justify-content: space-between;
    padding-right: 10px;
  }
  .title {
    font-weight: bold;
  }
  .subtitle {
    color: rgba(169, 164, 164, 0.82);
    font-weight: bold;
  }

  .img-question {
    color: red;
  }
.boton {
  border-radius: 11px;
  width: 100%;
  margin-top: 1.1em;
}
.container-page{
  max-height: 100vh;
  overflow-y: scroll;
}
.compartir {
  padding: 1.1em;
}
.pagina {
  background: rgb(252, 225, 185);
  justify-content: center;
  text-align: center;
}
.link {
  padding: -2em;
  border: 6px solid rgb(240, 200, 23);
  color: orange;
  box-shadow: none;
  &:before {
    box-shadow: none;
  }
}
#iconCopy {
  width: 30px;
  height: 30px;
}
.border-input {
  color: $primary;
}
</style>
