<template>
  <q-dialog
    ref="dialogRef"
    seamless
    position="bottom"
    transition-show="slide-up"
    transition-hide="slide-down"
    @hide="onDialogHide"
  >
    <!-- <q-tooltip v-model="copied">Link copiado</q-tooltip> -->
    <q-card v-touch-swipe.mouse.down="handleSwipe" @click="handleSwipe">
      <div class="row justify-center">
        <div class="col-3">
          <q-separator class="q-py-xs q-my-md" />
        </div>
      </div>
      <q-card-section>
        <div class="text-h5 text-center text-primary">
          Y ahora compártelo en stories...
        </div>
      </q-card-section>

      <q-card-section>
        <div class="row">
          <div class="col-5 text-center">
            <img src="icons/inf-modal-1.png" />
          </div>
          <div class="col column justify-center">
            <div>
              Copia la <span class="text-primary">liga de tu tienda</span> para que tus clientes puedan acceder
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row">
          <div class="col column justify-center">
            <div>
              Agrégala en tu bio de Instagram y crea historias etiquetando a <span class="text-primary">@lizza.mexico</span>
            </div>
          </div>
          <div class="col-5 text-center">
            <img src="icons/inf-modal-2.png" />
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row">
          <div class="col-5 text-center">
            <img src="icons/inf-modal-3.png" />
          </div>
          <div class="col column justify-center">
            <div>
              ¡Listo! Ahora tus clientes podrán comprar tus productos en línea para que
              <span class="text-primary">vendas más</span>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useDialogPluginComponent } from 'quasar';

export default defineComponent({
  props: {},
  emits: [
    // REQUIRED; need to specify some events that your
    // component will emit through useDialogPluginComponent()
    ...useDialogPluginComponent.emits,
  ],
  setup() {
    // REQUIRED; must be called inside of setup()
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
      useDialogPluginComponent();
    const handleSwipe = () => {
      dialogRef.value?.hide();
    };
    return {
      dialogRef,
      onDialogHide,
      onDialogOK,
      onDialogCancel,
      handleSwipe,
    };
  },
});
</script>

<style lang="scss" scoped></style>
