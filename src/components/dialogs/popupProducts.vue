<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" persistent>
    <q-card
      class="share-actions-card q-ma-md q-pa-md q-pt-xl relative-position"
    >
     <q-item-label class="text-title" style="text-center; color: #E75935"> {{title}}</q-item-label>

     <q-item-label  class="text-description" style="justify-content: center;">{{message}}
     </q-item-label>
 <br />
        <q-btn
          rounded
          class="btns"
          color="primary"
          label="Completar datos"
          style="text-transform:none"
          @click="vamosProduct"
            >
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
      default: 'Seguro?',
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

    const vamosProduct = () => {
      onDialogOK();
    };
       return {
      dialogRef,
      onDialogHide,
      onDialogOK,
      onDialogCancel,
      vamosProduct
    };
  },
});
</script>

<style lang="scss" scoped>

.text-title{
    font-size: 1.7rem;
    font-weight: 410;
    line-height: 2rem;
    letter-spacing: normal;
    color: #E75935;
    text-align: center;
    margin-bottom: 10px;
    margin-top: -15px;
}
.text-description{
    font-size: 1.0rem;
    font-weight: 400;
    line-height: 2rem;
    letter-spacing: normal;
    margin-bottom: 10px;

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
