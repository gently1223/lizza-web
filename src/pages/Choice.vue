<template>
  <q-page class="text-center q-ma-md">
    <div class="text-h5 text-bold">
      Te dije, ¿no? <span class="text-primary">Lizza</span> es para ti, seas
      como seas, tan solo elige tu opción
    </div>

    <img src="icons/guy.png" />

    <q-separator class="q-my-md" />

    <q-card class="cursor-pointer q-my-md" @click="goToSeller">
      <q-card-section>
        <div class="text-h6">
          Ya tengo mis productos anunciados en Instagram
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row q-gutter-sm">
          <div class="col">
            <q-img src="icons/example_pic1.png" />
          </div>
          <div class="col">
            <q-img src="icons/example_pic2.png" />
          </div>
          <div class="col">
            <q-img src="icons/example_pic3.png" />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card class="cursor-pointer q-my-md" @click="goToWholesale">
      <q-card-section>
        <div class="text-h6">Busco productos chidos para vender en redes</div>
      </q-card-section>
      <q-card-section>
        <div class="row q-gutter-sm">
          <div class="col">
            <q-img src="icons/example_pic4.png" />
          </div>
          <div class="col">
            <q-img src="icons/example_pic5.png" />
          </div>
          <div class="col">
            <q-img src="icons/example_pic6.png" />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthApi } from 'src/factories/useAuthApi';
// import { useQuasar } from 'quasar';
// import { analytics } from 'boot/firebase';
import { useUserApi } from 'src/factories/useUserApi';

export default {
  setup() {
    // const $q = useQuasar();
    const router = useRouter();
    const { udpateUser, getUser } = useUserApi();
    const { userId } = useAuthApi();

    const goToWholesale = async () => {
      //Update user type
      await udpateUser({ type: 'wholesale' });
      await router.push('/wholesale');
    };
    const goToSeller = async () => {
      //Update user type
      await udpateUser({ type: 'seller' });
      await router.push('/');
    };
    onMounted(async () => {
      await getUser(userId.value);
    });
    return { goToWholesale, goToSeller };
  },
};
</script>

<style lang="scss" scoped>
.custom-shape {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  transform: rotate(180deg);
}

.custom-shape svg {
  position: relative;
  display: block;
  width: calc(148% + 1.3px);
  height: 87px;
}

.custom-shape .shape-fill {
  fill: #ffffff;
}
.cabecera_img {
  position: relative;
  max-height: 60vh;
  height: 70vw;
  background-image: url(/login.png);
  background-size: cover;
}

.facebook-btn {
  background: #3b5998;
  color: #fff;

  &:hover {
    color: #fff;
    opacity: 0.8;
  }
}
</style>
