<template>
  <q-card class="my-card q-ma-md">
    <q-item>
      <q-item-section avatar>
        <q-avatar size="55px">
          <img :src="image" />
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <div class="row text-left">
          <div class="col-12">
            <span class="text-h4">{{ name }}</span>
          </div>
          <div class="col-4">
            <q-item-label caption>Precio</q-item-label>
            <q-item-label class="text-caption">{{
              $n(fromCentsToUnit(price), 'currency')
            }}</q-item-label>
          </div>

          <div class="col-3">
            <q-item-label caption>Comprado por</q-item-label>
            <q-item-label class="text-caption">{{ buyer }}</q-item-label>
          </div>
          <div class="col text-right"></div>
        </div>
      </q-item-section>
    </q-item>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useFormats } from 'src/factories/useFormats';
export default defineComponent({
  props: {
    price: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },
    buyer: {
      type: String,
      required: true,
    },
  },
  setup() {
    // const $q = useQuasar();
    const { fromCentsToUnit } = useFormats();

    return { fromCentsToUnit };
  },
});
</script>

<style lang="scss" scoped></style>
