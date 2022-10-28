<template>
    <q-toolbar class="shadow">
      <q-btn flat round style="top: -8px; color: #98ABB4" icon="arrow_back" @click="redirect" />
      <q-toolbar-title class="text-center">
      <p class="text-primary text-bold" style="font-size: 14px; margin-left: 10px">Selecciona productos</p>
      </q-toolbar-title>
      <q-btn flat style="color: #98ABB4; text-transform: capitalize; top: -8px" label="Saltar" @click="saltar" />
    </q-toolbar>
      <p class="text-primary second">
        <strong> ¡Tu Instagram está lleno de productos muy cool! </strong>
      </p>

    <div class="textarea">
    <p style="color: #AAAAAA; text-align: center; margin: 0px 50px 25px 50px;">
      Selecciona los productos que quieres vender y en 1 minuto estará lista tu tienda en línea.
    </p>
    </div>
    <q-separator inset />
     <br />
    <div class="product-list ">
      <q-card
        class="my-card col-xs-12 col-sm-6 col-md-4"
        v-for="post in posts"
        :key="post.id"
      >
      <div class="product-card">
        <div>
            <img class="image" :src="getPostImage(post)" alt=“image_getPost”/>
        </div>
        <div class="absolute-right q-ma-xs" >
          <q-checkbox
            checked-icon="check_circle"
            unchecked-icon="radio_button_unchecked"
            class="check"
            keep-color
            color="orange"
            v-model="formPosts"
            :val="post"
          />
        </div>

          <!-- <div class="row justify-between">
            <div>
              <q-icon name="favorite_border" style="padding-left: 4px"/>
              <span>{{ post.likes }}</span>
            </div>
            <div>
              <q-icon size="12px" name="img:icons/comments.svg" style="padding-right: 4px" />
              <span >{{ post.comments }}</span>
            </div>
          </div> -->

        <q-separator inset />
         <div class="post-text">
          {{ post.caption }}
        </div>
        </div>
      </q-card>

    </div>
    <div v-if="paging && paging.next" class="q-pa-md">
      <q-btn
        rounded
        color="primary"
        label="Cargar más"
        @click="loadMore()"
      />


    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <!-- place QPageScroller at end of page -->
      <q-page-scroller duration="500" :scroll-offset="150" :offset="[35, 18]" style="color: #E75935;" >
        <q-btn fab icon="keyboard_arrow_up" />
      </q-page-scroller>
      <q-btn
        round
        color="primary"
        icon="arrow_back"
        class="rotate-180"
        :disable="!formPosts.length || formPosts.length === 0"
        @click="handleClick"
      />
      </q-page-sticky>
</template>

<script>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useInstaApi } from 'src/factories/useInstaApi';
import { usePostForm } from 'src/factories/usePostForm';
import { useAuthApi } from 'src/factories/useAuthApi';
import { useQuasar } from 'quasar';
import { useStore } from 'src/store';
import { analytics } from 'boot/firebase';
import { useProductApi } from 'src/factories/useProductApi';
import HamburguerMenu from 'src/components/HamburguerMenu.vue';
import Loader from 'src/components/Loader.vue';

export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { HamburguerMenu, Loader },
  setup() {
    const $q = useQuasar();
    const $router = useRouter();
    const store = useStore();
    const { getPosts, posts, paging, getNextPosts } = useInstaApi();
    const { posts: formPosts, getPostImage, clean } = usePostForm();
    const { logout, user } = useAuthApi();
    const { products } = useProductApi();
    // user.value.displayName
    onMounted(async () => {
      clean();
      $q.loading.show({
        spinner: Loader,
        spinnerColor: 'orange',
        spinnerSize: 140,
        backgroundColor: 'white',
        message: 'Buscando posibles productos',
        messageColor: 'white',
      });
      await getPosts();
      $q.loading.hide();
    });
    const handleClick = async () => {
      // Do not continue if no posts are selected.
      if (!posts.value || posts.value.length === 0) {
        return;
      }

      analytics.logEvent('product_selected');
      store.commit('createProduct/addMode', 'instagram');
      await $router.push('/product');
    };

    const redirect = async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, quotes
      await $router.push(`/create-product-options`);
   };
    const saltar = async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, quotes
      await $router.push(`/`);
   };
    const loadMore = async () => {
      if (paging.value) {
        console.log(paging.value.next);
        $q.loading.show({
          spinner: Loader,
          spinnerColor: 'orange',
          spinnerSize: 140,
          backgroundColor: 'white',
          message: 'Buscando posibles productos',
          messageColor: 'white',
        });
        await getNextPosts(paging.value.next);
        $q.loading.hide();
      }
    };
    return {
      posts,
      formPosts,
      user,
      products,
      paging,
      // postDisabled,
      getPostImage,
      logout,
      handleClick,
      loadMore,
      redirect,
      saltar
    };
  },
};
</script>

<style lang="scss" scoped>
.shadow {
  width: 100%;
  height: 80px;
  left: 0px;
  top: 0px;
}
.second {
  font-size: 1.7em;
  text-align: center;
}

.check {
  border-radius:100px;
  .q-checkbox__bg {
    border-radius: 50%;
  }
}

.textarea {
display: flex;justify-content:center; font-weight: 600;font-size: 14px;line-height: 18px;color: #848484;padding-top: 20px;
}
.post-text{
width: 172px;height: 28px;overflow: hidden;color: rgba(0, 30, 50, 0.6);text-overflow: ellipsis; margin: auto;font-size: 10px;
}

.product-area {
display: flex;
justify-content: space-evenly;
flex-direction: row;
padding: 0px;
}

.product-list {
display: flex;
width: 670px;
flex-direction: row;
margin: auto;
flex-wrap: wrap;
justify-content: space-evenly;
padding: 0px;
}

.my-card {
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
margin-bottom: 24px;
width: 196px;
height: 239px;
background: #FFFFFF;
box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
border-radius: 12px;
}
.product-card {
display: flex;
flex-direction: column;
}
.image{
object-fit: cover;
width: 196px;
height: 157px;
left: -0.5px;
}



@media(max-width:600px){

.textarea {
height: 36px;
font-weight: 600;
font-size: 14px;
align-items:center;
line-height: 18px;
margin-bottom:30px;
}
.post-text{
width: 131.5px;
height: 22px;
font-size: 8px;
}

.product-area {
display: flex;
justify-content: space-evenly;
flex-direction: row;
flex-wrap: wrap;
padding: 0px;
}

.product-list {
display: flex;
width: 335px;
flex-direction: row;
margin: auto;
flex-wrap: wrap;
justify-content: space-between;
padding: 0px;
}

.my-card {
width: 155.5px;
height: 199px;
}
.product-card {
display: flex;
flex-direction: column;
}


.image{
object-fit: cover;
width: 154.5px;
height: 125px;
}



}
</style>
