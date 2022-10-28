<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
  <q-card>
    <h1>Hola !!!!</h1>
    <h2>Este es un componente de prueba</h2>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et quis est, dolor, voluptatem nisi ducimus eos quae, delectus qui numquam velit tenetur optio ipsam labore.
      Dignissimos odio at beatae labore!z</p>
  </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from 'vue';
import { useDialogPluginComponent } from 'quasar';

export default defineComponent({
  setup() {
    const { dialogRef, onDialogHide} = useDialogPluginComponent();

    return {
      dialogRef,
      onDialogHide,
    };
  }
})
</script>

<style>

</style>
