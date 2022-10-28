<template>
  <q-layout>
    <q-page-container class="page-container">
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { api } from 'boot/axios';
import { auth } from 'boot/firebase';
export default defineComponent({
  name: 'App',
  setup() {
    //Set api auth headers
    api.interceptors.request.use(async (config) => {
      console.log('entering interceptor');
      const token = await auth().currentUser?.getIdToken();
      console.log(token);
      if (token) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    });
    return {};
  },
});
</script>
<style lang="scss" scoped>
</style>
