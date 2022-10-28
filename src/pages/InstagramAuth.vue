<template>
  <div></div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';
import { useAuthApi } from 'src/factories/useAuthApi';
import { onMounted } from 'vue';
import { useQuasar } from 'quasar';
import Loader from 'src/components/Loader.vue';

export default {
  components: {
      // eslint-disable-next-line vue/no-unused-components
      Loader
    },
  name: 'InstagramAuth',
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const { conectInstagram } = useAuthApi();
    const { code, state, error } = router.currentRoute.value.query;
    console.log(code, state, error);

    onMounted(async () => {
      $q.loading.show({
        spinner: Loader,
        spinnerColor: 'blue',
        spinnerSize: 140,
        backgroundColor: 'white',
        message: 'Linking account',
        messageColor: 'white',
      });
      if (code && state) {
        // await instagramRedirect(code.toString(), state.toString()); //BEFORE IMPLEMENT NEW LOGIN
        await conectInstagram(code as string, state as string);
        // await router.push('/choice');
        //TODO uncomment to enable choice flow
        await router.push('/posts');
      }
      $q.loading.hide();
    });
  },
};
</script>
