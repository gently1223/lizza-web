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

      <div class="text-h4 q-my-md">¡Oh oh!</div>
      <div class="">
        No hemos podido sincronizar tu cuenta, recuerda iniciar sesión en
        Facebook a través de navegador, aunque estés conectado con tu app.
      </div>

      <q-btn
        rounded
        class="q-py-sm q-ma-md"
        unelevated
        color="primary"
        to="/login"
        label="Intentar de nuevo"
        no-caps
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ErrorFacebook',
});
</script>
