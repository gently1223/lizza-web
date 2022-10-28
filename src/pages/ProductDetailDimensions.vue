<template>
  <q-page class="container-page">
    <q-toolbar class="shadow-1">
      <q-btn flat round color="primary" icon="arrow_back" to="/detail" />
      <q-toolbar-title class="text-center">
        <span class="text-primary text-bold"> Detalles de producto </span>
      </q-toolbar-title>
    </q-toolbar>
    <div>
      <q-form
            @submit="onSubmit"
            class="q-gutter-md q-mt-sm q-pa-md"
          >
            <q-card class="form">
              <div class="header">
                <p class="title">Datos para envíos</p>
                <q-avatar size="20px">
                  <img src="icons/help_outline.svg" @click="alert = true"/>
                </q-avatar>
                <!-- <q-btn round color="white" icon="question_mark" size="8px"/> -->
              </div>
              <p class="subtitle">Dimensiones en centimetros</p>
              <div class="dimensions">
                <q-input
                    rounded outlined
                    type="number"
                    v-model="productDimensionsForm.length"
                    label="Largo"
                    class="q-mb-sm dimension"
                    lazy-rules
                    no-error-icon
                    :rules="[ val => val && val.length > 0 || 'Este campo es obligatorio']"
                  />
                <q-input
                  rounded outlined
                  type="number"
                  v-model="productDimensionsForm.length"
                  label="Alto"
                  class="q-mb-sm dimension"
                  lazy-rules
                  no-error-icon
                  :rules="[ val => val && val.length > 0 || 'Este campo es obligatorio']"
                />
                <q-input
                  rounded outlined
                  type="number"
                  v-model="productDimensionsForm.length"
                  label="Ancho"
                  class="q-mb-sm dimension"
                  lazy-rules
                  no-error-icon
                  :rules="[ val => val && val.length > 0 || 'Este campo es obligatorio']"
                />
              </div>
              <p class="subtitle">Peso en kilos</p>
              <q-input
                  rounded outlined
                  type="number"
                  step="0.1"
                  v-model="productDimensionsForm.weight"
                  label="Largo"
                  class="q-mb-sm"
                  lazy-rules
                  no-error-icon
                  :rules="[ val => val && val.length > 0 || 'Este campo es obligatorio']"
                />
              <q-input
                rounded outlined
                v-model="productDimensionsForm.AditionalDetails"
                label="Detalles adicionales"
                class="q-mb-sm"
                lazy-rules
                no-error-icon
              />
            </q-card>

            <div>
              <q-btn
                label="Listo!"
                type="submit"
                padding="12px 8px"
                size="1rem"
                unelevated rounded
                :color="getColor"
                :text-color="getTextColor"
                class="full-width"
                no-caps/>
            </div>
      </q-form>
    </div>
  </q-page>
  <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">Especificaciones para envíos</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Estos campos son esenciales para poder gestionar el envío de tus productos. Considera el empaque final en el cual se enviará el producto.
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';

export default defineComponent({

  setup() {
    let productDimensionsForm = ref({
      length: 0, height: 0, width: 0, weight: 0, AditionalDetails: ''
    });
    const onSubmit = () => {console.log('')}

    const isValidForm = true;

    const getColor = computed(()=>{
      return isValidForm ? 'primary' : 'grey-3'
    })
    const getTextColor = computed(()=>{
      return isValidForm ? 'white' : 'grey-5'
    })


    return {
      onSubmit,
      productDimensionsForm,
      getColor,
      getTextColor,
      alert: ref(false)
    };
  },
});
</script>

<style lang="scss" scoped>
//mobile
@media screen and (max-width: 800px) {
  .dimensions {
    display: flex;
    justify-content: space-between;
    gap: 5px;
  }
  .dimension {
    width: 30%;
    margin-right: 5px;
  }
}

.form {
  padding: 20px;
}
.header {
  display: flex;
  justify-content: space-between;
  padding-right: 10px;
}
.title {
  font-weight: bold;
}
.subtitle {
  color: rgba(169, 164, 164, 0.82);
  font-weight: bold;
}

.img-question {
  color: red;
}
</style>
