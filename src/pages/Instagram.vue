<template>
  <q-page class="q-pa-md instagram">
    <div class="absolute-center">
     <div class="shopping-cart">
      <img src="images/GIF_shoppingcart.gif"/>
      </div>
      <h2>¡Ya casi!</h2>
      <div>
      <h3>
        Conecta tu cuenta de Instagram para empezar a convertir tus posts en productos
      </h3>
      </div>
      <q-btn
        @click="loginWithInstagram"
        size="md"
        class="insta-btn text-white"
        icon="mdi-instagram"
        label="Ingresa con Instagram"
      >
      </q-btn>
      <footer>
        <a href="https://lizzapp.com" target="_blank">
        <img class="bottom-logo" src="icons/lizza_logo_orange.svg">
        </a>
      </footer>
    </div>

    <q-page-sticky position="top-right" :offset="[18, 18]">
      <q-btn round color="primary" icon="power_settings_new" @click="logout" />
    </q-page-sticky>



  </q-page>

</template>

<script>
import { useAuthApi } from 'src/factories/useAuthApi';

export default {
  setup() {
    const { loginWithInstagram, logout } = useAuthApi();

    return {
      loginWithInstagram,
      logout,
    };
  },
};
</script>

<style lang="scss" scoped>

h2 {
font-weight: 600;
font-size: 48px;
text-align: center;
color: #001E32;
}
h3 {
font-weight: 400;
font-size: 28px;
text-align: center;
color: #848484;
}
img {
width: 180px;
height: 193px;
justify-content: center;
align-items: center;
}
.insta-btn {
  background: linear-gradient(
    90deg,
    #df9440 -0.5%,
    #9f399e 46.32%,
    #6027d6 100.5%
  );
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  width: 396px;
  height:63px;
  font-size: 20px;

}

.absolute-center {
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin-top: 1px;
}

.bottom-logo{
height: 24px;
width:108px;
margin-top: 170px;
}

@media(max-width:600px){
h2 {
font-weight: 600;
font-size: 36px;
text-align: center;
color: #001E32;
margin-bottom: 12px;
}
h3 {
font-weight: 400;
font-size: 20px;
line-height: 28px;
text-align: center;
color: #848484;
}
img {
width: 112px;
height: 120px;
justify-content: center;
align-items: center;
margin-bottom: 48px;
}
.insta-btn {
  background: linear-gradient(
    90deg,
    #df9440 -0.5%,
    #9f399e 46.32%,
    #6027d6 100.5%
  );
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  width: 312px;
  height:50px;
  font-size:16px;
}

.absolute-center {
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin-top: 150px;
padding: 0 20px 0 20px;
}

.bottom-logo{
height: 13px;
width:60px;
margin-top: 120px;
}
}
</style>
