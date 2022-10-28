<template>
  <q-page class="q-pa-md container-page">
    <q-btn flat round color="primary" icon="arrow_back" to="/" position="top-left" :offset="[6, 6]"  style="z-index: 1" v-if="!showDimensions"/>
    <q-btn flat round color="secondary" icon="arrow_back" @click="firstpart" position="top-left" :offset="[6, 6]"  style="z-index: 1" v-if="showDimensions"/>
    <p class="text-primary text-bold text-center" style="margin-top: -30px;">Detalles de producto</p>
    <div class="row justify-center">
      <div class="col-12 col-sm-8 col-md-6">
        <span v-if="modeCreateProduct == 'instagram'"
          >{{ products.length }} de {{ posts.length }} productos agregados</span
        >
        <q-linear-progress v-if="modeCreateProduct == 'instagram'" :value="progress" class="q-my-md" />
        <div v-show="!showDimensions">
          <div>
            <div v-if="modeCreateProduct == 'instagram'">
              <img
                crossorigin="anonymous"
                ref="image"
                class="product_img rounded-borders"
                :src="getPostImage(post)"
                alt="img_anonymous"/>
            </div>
            <div v-else class="q-mb-md">
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
            <q-card class="general-information form">
              <p class="title">Información General</p>
              <div class="q-pa-md">
                <!-- nombre -->
                <q-input
                  class="q-mb-md"
                  rounded
                  outlined
                  label="Nombre del Producto"
                  v-model="product.name"
                />
                <!-- descripción -->
                <q-input
                  class="q-mb-md"
                  rounded
                  outlined
                  label="Descripción"
                  type="textarea"
                  v-model="product.description"
                />
                <!-- precio -->
                <q-input
                  rounded
                  :input-style="{ textAlign: 'center', fontSize: '22px' }"
                  outlined
                  placeholder="$0"
                  label="Precio"
                  v-model="product.price"
                  type="number"
                  min="0"
                  :rules="[ val => val >= 1 || '$ no puede ser 0']"
                />
                <!-- stock -->
                <q-input
                  rounded
                  :input-style="{ textAlign: 'center', fontSize: '22px' }"
                  outlined
                  label="Stock disponible"
                  placeholder="1"
                  min="1"
                  :disabled="deshabilitado"
                  v-model="product.stock"
                  type="number"
                  :rules="[ val => val >= 1 || 'Debe ser mayor a 1']"
                />
                <!-- activo -->
                <q-toggle
                v-model="product.isActive"
                label="Producto activo"
              />
              </div>
            </q-card>
            <div class="q-mt-md submit-btn">
              <q-btn
                rounded
                class="q-py-md submit-btn"
                color="primary"
                label="Siguiente"
                @click="showDimensionsProduct"
                :disable="!product.price || !product.name || !product.stock"
              >
              </q-btn>
            </div>
          </div>
        </div>
        <div v-if="showDimensions" class="product-dimensions">
          <q-form @submit="createProduct" class="q-gutter-md q-mt-sm q-pa-md">
            <q-card class="form">
              <div class="header">
                <p class="title">Datos para envíos</p>
                <q-avatar size="20px">
                  <img src="icons/help_outline.svg" @click="alert = true"/>
                </q-avatar>
                <!-- <q-btn round color="white" icon="question_mark" size="8px"/> -->
              </div>
              <p class="subtitle">Dimensiones en centimetros</p>
              <div class="dimensions">
                <q-input
                    rounded outlined
                    type="number"
                    v-model="product.dimensions.length"
                    label="Largo"
                    class="q-mb-sm dimension"
                    lazy-rules
                    no-error-icon
                    :rules="[ val => val && val.length > 0 || 'Este campo es obligatorio']"
                  />
                <q-input
                  rounded outlined
                  type="number"
                  v-model="product.dimensions.height"
                  label="Alto"
                  class="q-mb-sm dimension"
                  lazy-rules
                  no-error-icon
                  :rules="[ val => val && val.length > 0 || 'Este campo es obligatorio']"
                />
                <q-input
                  rounded outlined
                  type="number"
                  v-model="product.dimensions.width"
                  label="Ancho"
                  class="q-mb-sm dimension"
                  lazy-rules
                  no-error-icon
                  :rules="[ val => val && val.length > 0 || 'Este campo es obligatorio']"
                />
              </div>
              <p class="subtitle">Peso en kilos</p>
              <q-input
                  rounded outlined
                  type="number"
                  step="0.1"
                  v-model="product.dimensions.weight"
                  label="Peso"
                  reverse-fill-mask
                  class="q-mb-sm"
                  lazy-rules
                  no-error-icon
                  :rules="[ val => val && val.length > 0 || 'Este campo es obligatorio']"
                />
              <q-input
                rounded outlined
                v-model="product.aditional_data"
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
                :disable="!product.dimensions.length || !product.dimensions.height || !product.dimensions.weight || !product.dimensions.width "
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
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import {  useQuasar } from 'quasar';
import { usePostForm } from 'src/factories/usePostForm';
import { useStripe } from 'src/factories/useStripe';
import { useStorageApi } from 'src/factories/useStorageApi';
import { defineComponent, onMounted, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'src/store';
import { analytics } from 'boot/firebase';
import { Product } from 'src/components/models';
import { useAuthApi } from 'src/factories/useAuthApi';
import Loader from 'src/components/Loader.vue';

export default defineComponent({

  setup() {
    //Para subir. Enseguida lo quitamos.
    const deshabilitado = computed(()=>{
      return false;
    });
    const $q = useQuasar();
    const { nextPost, post, posts, getPostImage, products } = usePostForm();
    const { createPaymentLink, createPaymentLinkEmail } = useStripe();
    const { uploadImg, convertToBlob, uploadImgString } = useStorageApi();
    const { userId } = useAuthApi();
    const router = useRouter();
    const store = useStore()
    let showDimensions = ref(false)
    let alert = ref(false);
    const image = ref<HTMLImageElement>(),
    product = ref<Product>({
      name: '',
      url: '',
      image: '',
      payments: 0,
      stock: 1,
      isActive: true,
      dimensions: {
        height: 0,
        width: 0,
        length: 0,
        weight: 0,
      },
      aditional_data: ''
    });
    let srcImgAddProduct = 'images/add-image.svg';
    let srcImgProduct1 = ref(srcImgAddProduct);
    let srcImgProduct2 = ref(srcImgAddProduct);
    let srcImgProduct3 = ref(srcImgAddProduct);
    let currentImage = ref(1);
    let showCloseImage1 = ref(false)
    let showCloseImage2 = ref(false)
    let showCloseImage3 = ref(false)
    let srcImagesProducts = ref(['', '', '']);
    let countImages = ref(0);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
    const modeCreateProduct = computed<string>( () => store.getters['createProduct/currentMode']);
    console.log('modeCreateProduct leído: ', modeCreateProduct.value)
    console.log('Tamaño: ', modeCreateProduct.value.length);

    products.value = [];

    const progress = computed(() => {
      return products.value.length / posts.value.length;
    });

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

    const insertimages = async (userId: string, srcImagesProductsFinal: string[]) => {
      const finalimages: string[] = [];
      for (let index = 0; index < srcImagesProductsFinal.length; index++) {
        if(srcImagesProductsFinal[index] !== '') {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const url = await uploadImgString(userId, srcImagesProductsFinal[index]);
          console.log('Url retornada al guardar la imagen:', url);
          finalimages.push(url);
        }
      }
      let newstr = '';
      finalimages.forEach(element => newstr += element + '|');
      return newstr;
    }

    const createProduct = async () => {
      //Show loading
      $q.loading.show({
        spinner: Loader,
        spinnerColor: 'orange',
        spinnerSize: 140,
        backgroundColor: 'white',
        message: 'Generando producto',
        messageColor: 'white',
      });
      //Create image and save url
      console.log(image.value);
      //Convert image to blob and upload to firebase
      if(modeCreateProduct.value === 'instagram') {
        if (image.value) {
          const blob = await convertToBlob(image.value);
          if (blob) {
            const url = await uploadImg(userId.value, blob);
            product.value.image = url;
          }
        }
      }else {
        const porfa = await insertimages(userId.value, srcImagesProducts.value);
        console.log('srcFinal: ', porfa);
        product.value.image = porfa;
      }

      console.log('ProductsValue',product.value);
      //Set default price
      if (!product.value.price) product.value.price = 0;
      //create product link
      const result = await createPaymentLink(
        product.value.name,
        product.value.description || '',
        product.value.price * 100,
        product.value.image || '',
        product.value.stock || 1,
        product.value.isActive,
        product.value.dimensions
      );
      if (result.success) {
        console.log('productsValues',product.value);
        //Add product to form
        products.value.push({
          ...product.value,
          link_id: result.value,
          price: product.value.price * 100,
          stock: product.value.stock,
          isActive: product.value.isActive
        });
        //Clear models
        product.value = {
          name: '',
          url: '',
          image: '',
          payments: 0,
          stock: 1,
          isActive: true,
          dimensions: {
            height: 0,
            width: 0,
            length: 0,
            weight: 0,
          },
          aditional_data: ''
        };
        analytics.logEvent('product_created');
        //Check next post
        if(modeCreateProduct.value === 'instagram') {
          if (!nextPost()) {
            await router.push({ path: '/products' });
          }
        }else{
          await router.push({ path: '/products' });
        }
      } else {
        //TODO handle error, minimun amount and stuff
        analytics.logEvent('product_created_failed', { message: result.value });
        console.log('resultValue',result.value);
      }
      showDimensions.value = false;
      $q.loading.hide();
    }

    const firstpart = () => {
      showDimensions.value = false;
    }

    onMounted(() => {
      nextPost();
    });

    return {
      deshabilitado,
      showDimensionsProduct,
      getPostImage,
      post,
      posts,
      firstpart,
      progress,
      product,
      products,
      image,
      showDimensions,
      createProduct,
      alert,
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
  .separador {
    color: #e75935;
    margin-bottom: 1em;
  }
  .div_cabecera {
    text-align: center;
    margin-top: 1em;
    margin-bottom: 2em;
  }
  .container-page{
    max-height: 100vh;
    overflow-y: scroll;
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
  .box_nombre {
    margin-top: 2em;
  }
  .box_descripcion {
    margin-top: 2em;
  }
  .productimg{
    width: 335px;
    height: 335px;
    margin-bottom: 2em;
    border-radius: 16px;
  }
  .product_img {
    width: 335px;
    height: 335px;
    margin-bottom: 2em;
    border-radius: 16px;
  }
  .product-step{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 50px;
  }
  .submit-btn{
  text-transform: capitalize;
  display:flex;
  flex-direction:row;
  left:120px;
  justify-content:center;
  width: 403.85px;
  color: white;
  }
  .container-fotos{
    display: flex;
    justify-content:space-between;
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
  @media(max-width:600px){
  .product-step{
  flex-direction: column;
  }
  .box_precio {
    margin-top: 2em;
    padding: 10px;
    gap: 10px;
    width: 311px;
    height: 70px;

  }

  .box_nombre {
    margin-top: 2em;
  }

  .box_descripcion {
    margin-top: 2em;
  }
  .product_img {
   width: 100%;
   height: 335px;
    margin-bottom: 2em;
  }
  .product-step{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 50px;
  }
  .submit-btn{

  left:20px;
  width: 300px;
  color: white;
  }
  }


  </style>
