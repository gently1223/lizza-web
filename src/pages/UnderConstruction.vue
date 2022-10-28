<template>
  <div class="text-center q-pa-md row flex-center">
    <div class="col-12 col-sm-5 col-md-3">
      <q-avatar size="200px">
        <q-img
          src="https://media.giphy.com/media/9Y5BbDSkSTiY8/giphy.gif"
          height="200px"
          width="200px"
        />
      </q-avatar>

      <div class="text-h4 q-my-md">En construcción</div>
      <div class="">
        ¡Esta functionalidad estará lista muy prontol Te invitamos a ingressar con tu cuenta de Facebook para vender en linea <span style="color:black; font-weight:bold;">sin rollos.</span>
      </div>
      <br/>
      <br/>
       <q-btn
          @click="handleLogin"
          size="md"
          class="facebook-btn text-white fb-size"
          icon="mdi-facebook"
          to="/login"
          label="Ingresa con Facebook"
        />

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthApi } from 'src/factories/useAuthApi';
import { analytics } from 'boot/firebase';
import Loader from 'src/components/Loader.vue';

export default defineComponent({
    components: {
      // eslint-disable-next-line vue/no-unused-components
      Loader
    },
  name: 'ErrorFacebook',
  setup() {


    const { loginWithFacebook } = useAuthApi();
    const router = useRouter();

    const handleLogin = async () => {
      analytics.logEvent('facebook_login_telephone');
      const authResponse = await loginWithFacebook();
      if (authResponse && authResponse.accessToken) {
        // await router.push('/');
        //Link insta account
        // loginWithInstagram();
        analytics.logEvent('fb_login_response', { success: true });

        await router.push('/insta');
      } else {
        analytics.logEvent('fb_login_response', { success: false });
        await router.push('/error/facebook');
      }
    };

    return {
      handleLogin,
    };
  }
});
</script>

<style lang="scss" scoped>
@media (max-width: 600px) {
  .fb-size {
    width: 314px !important;
    height: 50px !important;
    background-color: #4267b2 !important;
    border-radius: 14px;
    font-size: 12px !important;
    text-transform: none;
  }
}

@media (min-width: 600px) {
  .fb-size {
    width: 396px !important;
    height: 63px !important;
    background-color: #4267b2 !important;
    border-radius: 14px;
    font-size: 16px !important;
    text-transform: none;
  }
}

 </style>
