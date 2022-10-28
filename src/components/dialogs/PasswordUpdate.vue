<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" persistent>
    <q-card
      class="share-actions-card q-ma-md q-pa-md q-pt-xl relative-position"
    >
    <q-item-label class="text-title" style="text-center">{{ title }}</q-item-label>
   <q-item-label  class="text-description" style="justify-content: center;">
      {{ message }}
    </q-item-label>
    <br />
     <q-btn
        unelevated rounded
        class="full-width"
        label="Volver a ingresar"
        padding="16px"
        color="primary"
        text-color="white"
        @click="vamos"
        no-caps>
    </q-btn>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useDialogPluginComponent } from 'quasar';

export default defineComponent({
  props: {
    title: {
      type: String,
      default: 'EXITOSO',
    },
      message: {
      type: String,
      default: 'Esto es un mensaje!',
    },
  },
  emits: [
    // REQUIRED; need to specify some events that your
    // component will emit through useDialogPluginComponent()
    ...useDialogPluginComponent.emits,
  ],
  setup() {
    // REQUIRED; must be called inside of setup()
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
      useDialogPluginComponent();

    const vamos = () => {
      onDialogOK();
    };
    return {
      dialogRef,
      onDialogHide,
      onDialogOK,
      onDialogCancel,
      vamos
    };
  },
});
</script>

<style lang="scss" scoped>
  .text-title{
    font-size: 1.7rem;
    font-weight: 900;
    line-height: 2rem;
    letter-spacing: normal;
    color: #e75935;
    text-align: center;
    margin-bottom: 10px;
    margin-top: -15px;
    font-family: 'Manrope';
  }
  .text-description{
    font-size: 1.0rem;
    font-weight: 400;
    line-height: 2rem;
    letter-spacing: normal;
    margin-bottom: 10px;
    text-align: center;
    font-family: 'Manrope';
  }
  .q-card{
    max-height: calc(100vh - 48px);
    margin: 12px;
    border-radius: 20px;
  }
  .btns {
    background: white;
    border:none;
    margin-bottom: 0px;
    font-size: 15px;
    color: grey;
    top: -8px;
    width: 100%;
  }
</style>
