<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" persistent>
    <!-- <q-tooltip v-model="copied">Link copiado</q-tooltip> -->
    <q-card>
      <q-card-section class="row items-center">
        <span class="q-ml-sm"> {{ title }}</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="primary" v-close-popup />
        <q-btn flat label="OK" color="primary" @click="onDialogOK" />
      </q-card-actions>
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

    return {
      dialogRef,
      onDialogHide,
      onDialogOK,
      onDialogCancel,
    };
  },
});
</script>

<style lang="scss" scoped></style>
