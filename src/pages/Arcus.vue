<template>
  <q-page class="">
    <q-toolbar class="shadow-1">
      <q-btn flat round color="primary" icon="arrow_back" to="/products" />
      <q-toolbar-title class="text-center">
        <span class="text-primary text-bold"> Pago en tienda </span>
      </q-toolbar-title>
    </q-toolbar>
    <div class="row justify-center q-mt-md">
      <div class="col-11 col-md-6">
        <div class="q-ma-xs">
          <q-avatar
            class="shadow-1"
            size="md"
            color="white"
            text-color="primary"
            >1</q-avatar
          >
          Dirígete a la tienda más cercana y en caja solicita hacer un depósito
          mediante <b>Arcuspay</b>.
        </div>
        <div class="q-ma-xs">
          <q-avatar
            class="shadow-1"
            size="md"
            color="white"
            text-color="primary"
            >2</q-avatar
          >
          Enseña en caja tu código QR.
        </div>
        <div class="q-ma-xs">
          <q-avatar
            class="shadow-1"
            size="md"
            color="white"
            text-color="primary"
            >3</q-avatar
          >
          Entrega el efectivo, solicita tu recibo y envía una foto a
          contacto@lizzapp.com.
        </div>

        <div class="column flex-center">
          <canvas id="canvas"></canvas>
          <p>{{ code }}</p>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { useArcusApi } from 'src/factories/useArcusApi';
import { defineComponent, onMounted, ref, watch } from 'vue';
import qrcode from 'qrcode';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: {},
  setup() {
    const router = useRouter();
    const { code, payment_reference, payee_id } = useArcusApi();
    const hasQr = ref(false);
    console.log(code.value);
    const genQr = async () => {
      console.log(code.value);
      await qrcode.toCanvas(document.getElementById('canvas'), code.value, {
        width: 350,
      });
      hasQr.value = true;
    };
    onMounted(async () => {
      const p = router.currentRoute.value.params.id.toString();
      const decrypt = atob(p);
      console.log(p, decrypt);
      payee_id.value = p;
      await genQr();
    });
    // watch(payment_reference, (v) => {
    //   if (v) {
    //     hasQr.value = false;
    //   }
    // });
    return { code, payment_reference, hasQr, genQr };
  },
});
</script>

<style lang="scss" scoped></style>
