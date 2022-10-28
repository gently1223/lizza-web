<template>
  <q-page class="general-container">
    <div class="header">
      <span class="logo-box">
        <a href="https://lizzapp.com" target="_blank">
          <img class="logo" alt="Lizza logo" src="icons/lizza.png" />
        </a>
      </span>
    </div>
    <div class="main-container">
      <main class="main">
        <p class="main-text">Crea tu primer producto como tú prefieras</p>

        <div class="main-buttons">
          <q-btn
          class="q-pt-md q-pb-md"
          text-color="grey"
          rounded
          no-caps
          size="md"
          align="left"
          @click="toCreateProductFromInstagram"
          style="
              background: white;
              border: none;
              "
          >
            <q-img
              src="images/Instagram_logo.svg"
              class="instagram-img"
            >
            </q-img>
            Seleccionar post de Instagram
          </q-btn>
          <q-btn
          class="q-pt-md q-pb-md"
          text-color="grey"
          rounded
          no-caps
          size="md"
          align="left"
          @click="toCreateProductFromToPhone"
          style="
              background: white;
              border: none;
              "
          >
            <q-img
              src="images/iconoir_upload.svg"
              class="instagram-img"
            >
            </q-img>
            Crear desde tu celular
          </q-btn>

        </div>
        <!-- <q-btn
          class="q-pt-md q-pb-md"
          text-color="grey"
          rounded
          no-caps
          size="md"
          align="left"
          @click="pruebalogin"
          style="
              background: white;
              border: none;
              "
          >Prueba login Instagram
          </q-btn> -->
          <!-- <q-btn
          class="q-pt-md q-pb-md"
          text-color="grey"
          rounded
          no-caps
          size="md"
          align="left"
          @click="logout"
          style="
              background: white;
              border: none;
              "
          >Logout
          </q-btn> -->
      </main>
    </div>
    <footer class="footer">
      <p class="footer_to-store">
        <a class="textLink" href="/" style="text-decoration:none ">
          Saltar. Ir directo a Mi Tienda
        </a>
      </p>
    </footer>
  </q-page>
</template>

<script lang="ts">

import { useRouter } from 'vue-router';
import { useStore } from 'src/store';
import { analytics } from 'boot/firebase';
import { useAuthApi } from 'src/factories/useAuthApi';
import { useUserApi } from 'src/factories/useUserApi';

import Loader from 'src/components/Loader.vue';

export default {
  components: {
      // eslint-disable-next-line vue/no-unused-components
      Loader
    },
  setup() {
    const router = useRouter();
    const store = useStore();

    const { loginWithInstagram, userId } = useAuthApi();
    const { getInstagramToken, logoutInstagram} = useUserApi();

    const toCreateProductFromInstagram = async () => {
      analytics.logEvent('fb_instagram_click');
      console.log('click pruebalogin');
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const token = await getInstagramToken(userId.value);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if(token?.igtoken === ''){
        await loginWithInstagram();
      }else{
        await router.push('/posts');
      }
    }

    const logout = async () =>{
      await logoutInstagram();
    }
    const toCreateProductFromToPhone = async () => {
      store.commit('createProduct/addMode', 'phone');
      await router.push('/product');
    }
    const redirect = async() => {
      await router.push('/').catch(() => console.log('Regresando'));
    }

    return {
      toCreateProductFromInstagram,
      toCreateProductFromToPhone,
      redirect,
      logout,
    };
  },
};
</script>

<style scoped>

  .general-container {
    max-height: 99vh;
    display: grid;
    grid-template-rows: 120px 300px 1fr;
  }
  .textLink{
    color: #E75935;
    cursor: pointer;
  }
  .header {
    background: #e75935;
    text-align: center;
    margin-bottom: 40px;
    padding-top: 50px;
  }

  .logo {
    height: 16px;
    width: 72px;
  }

  .logo-box {
    width: 30%;
  }

  .main-container {
    padding: 1px;
  }

  .main {
    padding: 10px 15px;
    text-align: center;
  }

  .main-text {
    font-size: 19px;
    font-weight:bold;
    margin-bottom: 30px;
    padding: 5px 50px;
  }

  .main-buttons {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .footer {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: end;
    padding-bottom: 25px;
  }

  .footer_to-store {
    color: grey;
    text-decoration: underline;
    font-size: 0.8rem;
  }

  .instagram-img {
  width: 25px;
  height: 25px;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
}
  @media screen and (min-width: 900px) {
  .general-container {
    padding: 30px 15%;
  }

  .main-text {
    font-size: 30px;
  }

}


</style>
