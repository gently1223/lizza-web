<template>
  <q-page class="general-container">
    <q-toolbar class="shadow-1">
      <div class="header-bar">
        <q-btn flat round color="grey" icon="arrow_back" :to="uXFromViewRoute" />
        <q-toolbar-title class="text-center">
          <span class="text-primary text-bold" style="margin-right: 50px; font-size: 20px;">
            Datos de envío
          </span>
        </q-toolbar-title>
      </div>
    </q-toolbar>
    <div class="form">

            <q-card class="my-card">
              <q-card-section>
                <q-input
                  rounded outlined
                  v-model="shippingDataForm.name"
                  label="Nombre completo"
                  class="q-mb-sm"
                  lazy-rules
                  no-error-icon
                  :rules="[ val => val && val.length > 0 || 'Este campo es obligatorio']"
                />
                <q-input
                  rounded outlined
                  type="number"
                  v-model="shippingDataForm.phone"
                  label="+52  |  Número de teléfono"
                  class="q-mb-sm"
                  no-error-icon
                  :rules="[ val => val && val.length > 0 || 'Este campo es obligatorio', val => val.length === 10 || 'El teléfono debe ser de 10 digitos']"
                />
                <q-input
                  rounded outlined
                  type="email"
                  v-model="shippingDataForm.email"
                  label="Email"
                  class="q-mb-sm"
                  :rules="[
                    val => val && val.length > 0 || 'Este campo es obligatorio',
                    val => val && val.match(regExprEmail) || 'Debe ser un email válido',
                    ]"
                />
                <q-input
                  rounded outlined
                  v-model="shippingDataForm.street"
                  label="Calle y número ext."
                  class="q-mb-sm"
                  no-error-icon
                  :rules="[ val => val && val.length > 0 || 'Este campo es obligatorio']"
                />
                <q-input
                  rounded outlined
                  v-model="shippingDataForm.numberInt"
                  label="Numero int (opcional)"
                  class="numberInt"
                />
                <q-input
                  rounded outlined
                  type="number"
                  v-model="shippingDataForm.zipCode"
                  ref="zipCode"
                  label="Código Postal"
                  class="q-mb-sm"
                  no-error-icon
                  :rules="[ val => val && val.length > 0 || 'Este campo es obligatorio', val => val.length === 5 || 'El código postal debe ser de 5 digitos']"
                  @change="fillColony"
                />
                <template v-if="zipCodeValid">
                  <q-select
                    v-if="asentamientosList.length"
                    rounded outlined
                    v-model="shippingDataForm.colony"
                    class="q-mb-sm"
                    no-error-icon
                    :rules="[ val => val && val.length > 0 || 'Este campo es obligatorio']"
                    label="Colonia"
                    :options="asentamientosList"
                    @update:model-value="createQuote()"
                  />
                  <q-input
                    rounded outlined
                    v-model="shippingDataForm.city"
                    label="Ciudad"
                    class="q-mb-sm"
                    no-error-icon
                    :rules="[ val => val && val.length > 0 || 'Este campo es obligatorio']"
                    @model="autoCompleteCity"
                  />
                  <q-input
                    rounded outlined
                    v-model="shippingDataForm.state"
                    label="Estado"
                    class="q-mb-sm"
                    no-error-icon
                    :rules="[ val => val && val.length > 0 || 'Este campo es obligatorio']"
                  />

                </template>
              </q-card-section>
            </q-card>
            <q-card class="" v-if="quoteCreated">
              <q-card-section>
                  <q-card-title>
                    <strong style="color: #001E32"> Servicio de paquetería</strong>
                  </q-card-title>
                  <q-select
                    rounded outlined
                    v-model="shippingDataForm.packService"
                    class="q-mt-sm"
                    option-value="value"
                    option-label="label"
                    :options="packServiceList"
                    emit-value
                    map-options
                    label="Selecciona el servicio"
                    no-error-icon
                    @update:model-value="selectServicePack()"
                  />
                </q-card-section>
            </q-card>
            <div>
              <q-btn
                class="full-width q-mt-md"
                label="Confirmar pedido"
                padding="12px 8px"
                size="1rem"
                color="primary"
                text-color="white"
                @click="confirmShopping"
                unelevated rounded
                no-caps
                :disable="!shippingDataForm.name || !(shippingDataForm.phone.toString().length === 10) || !(shippingDataForm.email.match(regExprEmail)) || !shippingDataForm.street || !zipCodeValid || !shippingDataForm.colony || !shippingDataForm.city ||  !shippingDataForm.state || !shippingDataForm.packService"/>
            </div>

    </div>
  </q-page>
</template>

<script lang="ts">
import { computed, ref } from 'vue';
import { useQuasar } from 'quasar';
import Loader from 'src/components/Loader.vue';
import AlertVue from 'src/components/dialogs/Alert.vue';
import { useShipments } from 'src/factories/useShipments';
import { useStore } from 'src/store';
import { getColonys } from 'src/factories/useColony';
import { useUserApi } from 'src/factories/useUserApi';
import { useRouter } from 'vue-router';
import { ProductInCart } from 'src/components/models';
import { ServicePackOption } from 'src/models/ServicePackOption';

export default {
    name: 'Forms',
    setup() {
      const $q = useQuasar();
      const store = useStore();
      const router = useRouter();
      const { getInstagramUserName } = useUserApi();
      const { createDirection, createCotizacion, getRateCarrier, updateShipment, } = useShipments();
      const regExprEmail = '^[^@]+@[^@]+\.[a-zA-Z]{2,}$';
      let autoCompleteCity = ref([]);
      let zipCodeValid = ref(false);
      let quoteCreated = ref(false);
      let isValidForm = ref(false);

      let shippingDataForm = ref({
        name: '',
        phone: parseInt(''),
        email: '',
        street: '',
        numberInt: '',
        zipCode: parseInt(''),
        colony: '',
        city: autoCompleteCity,
        state: '',
        packService: ''
      });
      let asentamientosList = ref(['Ingresa el codigo postal'])
      let packServiceList = ref();
      let cotizacion_oid = ref();
      let selected_price_rate = ref();
      const { getColonysArray } = getColonys();

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
      const shippingDataForm2 = computed( () => store.getters['shoppingData/allData'])
       // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
      const countAmounts = computed( () => store.getters['shoppingCart/countAmounts']);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      shippingDataForm.value = {...shippingDataForm2.value};

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
      const uXFromViewRoute = computed( () => store.getters['shoppingData/uXFromViewRoute']);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
      zipCodeValid = computed( () => store.getters['shoppingData/zipCodeValid']);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
      quoteCreated = computed( () => store.getters['shoppingData/quoteCreated']);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
      const packServiceOptions = computed( () => store.getters['shoppingData/packServiceOptions']);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
      const packServiceSelected = computed( () => store.getters['shoppingData/packServiceSelected']);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
      const priceShipment = computed( () => store.getters['shoppingData/priceShipment']);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
      const cotizacionOid = computed( () => store.getters['shoppingData/quotationShipmentId']);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if(packServiceOptions.value.length > 0){
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        packServiceList.value = [...packServiceOptions.value];
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if(packServiceSelected.value.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        shippingDataForm.value.packService = packServiceSelected.value;
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if(priceShipment.value) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        selected_price_rate.value = priceShipment.value;
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if(cotizacionOid.value) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        cotizacion_oid.value = cotizacionOid.value;
        console.log('El nuevo valor de cotizacion_oid es: ', cotizacion_oid.value);
      }

      isValidForm.value = shippingDataForm.value.name.length > 0;

      const fillColony = async () =>{
        try {
          const codigo_postal = shippingDataForm.value.zipCode
          const postCode = await getColonysArray(codigo_postal);
          if(postCode.success) {
            console.log('🚀 ~ file: Link.vue ~ line 136 ~ onclickPrueba ~ postalCode', postCode)
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            console.log('🚀 ~ file: Link.vue ~ line 208 ~ onclickPrueba ~ postalCode.value', postCode.value.response.asentamiento)
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
            asentamientosList.value = [...postCode.value.response.asentamiento];
            console.log('🚀 ~ file: Link.vue ~ line 211 ~ onclickPrueba ~ asentamientosList...', asentamientosList)
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
            shippingDataForm.value.city = postCode.value.response.ciudad;
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
            shippingDataForm.value.state = postCode.value.response.estado;
            zipCodeValid.value = true;
            store.commit('shoppingData/setZipCodeValid', true);
          }else{
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            zipCodeValid.value = false;
            store.commit('shoppingData/setZipCodeValid', false);
            $q.dialog({
                component: AlertVue,
                componentProps: {
                    title:
                        'Error al consultar el Código Postal. Por favor indica uno válido',
                },
            }).onOk((result) => {
                console.log('ok', result);
            });
            return;
          }

        } catch (error) {
          console.log('Error al consultar el Código Postal');
        }


      }

      const createQuote = async () => {
        $q.loading.show({
            spinner: Loader,
            spinnerColor: 'orange',
            spinnerSize: 140,
            backgroundColor: 'white',
            message: 'Generando producto',
            messageColor: 'white',
        });
        try {
            //---------- OBTENER LA INFO DE LAS DIRECCIONES -------------------------


          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
          const productList = computed<ProductInCart[]>( () => store.getters['shoppingCart/products']);
          const username_to_get_direction = productList.value[0].username as string;
          console.log('🚀 ~ El nombre del vendedor es: ', username_to_get_direction);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const mydata = await getInstagramUserName(username_to_get_direction); //Esto recibe tonylizzapp para obtener instagram-7881809248510956
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const directionFromSeller = mydata?.data();
            const dataSellerFromDb = {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              name: directionFromSeller?.username,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
              street: directionFromSeller?.address.street,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
              state: directionFromSeller?.address.state,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
              postal_code: directionFromSeller?.address.postal_code,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
              number_out: directionFromSeller?.address.number_out,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
              number_in: directionFromSeller?.address.number_in,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
              city: directionFromSeller?.address.city,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
              add_ref: directionFromSeller?.address.add_ref,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
              email: directionFromSeller?.email,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
              phone: directionFromSeller?.phone,
            }
            console.log('------> 🚀 ~ file: DatosEnvio.vue ~ line 262 ~ handleClick ~ dataSellerFromDb', dataSellerFromDb)
            const detailsSeller = {
              object_type: 'PURCHASE',
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              name: dataSellerFromDb.name,
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              street: dataSellerFromDb.number_out,
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              street2: dataSellerFromDb.street,
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              reference: dataSellerFromDb.add_ref,
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              zipcode: dataSellerFromDb.postal_code as string,
              alias: 'vendedor',
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              email: dataSellerFromDb.email,
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              phone: dataSellerFromDb.phone,
              cp_rfc: '',
              cp_fiscal_address: '',
              cp_fiscal_name: '',
              _level_1: '11400 (Solo dirección de destino, solo aplica para LATAM)',
            };


            // Create directions from data sent
            const detailsBuyer = {
                object_type: 'PURCHASE',
                name: shippingDataForm.value.name,
                street: shippingDataForm.value.street,
                street2: shippingDataForm.value.colony,
                reference: shippingDataForm.value.numberInt,
                zipcode: String(shippingDataForm.value.zipCode),
                alias: 'destino',
                email: shippingDataForm.value.email,
                phone: shippingDataForm.value.phone,
                cp_rfc: '',
                cp_fiscal_address: '',
                cp_fiscal_name: '',
                _level_1: '11400 (Solo dirección de destino, solo aplica para LATAM)',
            };
            //----------------------------------------------------------------------


            //---------- CREAR DIRECCIONES DE SELLER Y BUYER EN MI ENVIO -------------------------
            const directionSeller = await createDirection(detailsSeller);
            if (directionSeller.success === false) {
                console.log('🚀 ~ file: Link.vue ~ line 349 ~ onclickPrueba ~ directionSeller', directionSeller );
                console.log('El error fue: Generalmente ocurre al enviar un parametro que no pasó la validación. Por ejemplo enviar un CP no válido.');
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                $q.dialog({
                    component: AlertVue,
                    componentProps: {
                        title:
                            'Error en datos del vendedor. Por ejemplo enviar un CP no válido',
                    },
                }).onOk((result) => {
                    console.log('ok', result);
                });
            }
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const directionSeller_json = JSON.parse(
                JSON.stringify(directionSeller.value)
            );
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
            const directionSeller_oid = directionSeller_json.address.object_id;

            const directionBuyer = await createDirection(detailsBuyer);
            if (directionBuyer.success === false) {
                console.log('🚀 ~ file: Link.vue ~ line 369 ~ onclickPrueba ~ directionBuyer', directionBuyer );
                console.log('El error fue: Generalmente ocurre al enviar un parametro que no pasó la validación. Por ejemplo enviar un CP no válido.');
                $q.dialog({
                    component: AlertVue,
                    componentProps: {
                        title:
                            'Error en datos del comprador. Por ejemplo enviar un CP no válido',
                    },
                }).onOk((result) => {
                    console.log('ok', result);
                });
            }
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const directionBuyer_json = JSON.parse(
                JSON.stringify(directionBuyer.value)
            );
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
            const directionBuyer_oid = directionBuyer_json.address.object_id;
            //-----------------------------------------------------------------------------------
            console.log('🚀 ~ file: Link.vue ~ line 310 ~ onclickPrueba ~ direction', directionSeller_oid );
            console.log('🚀 ~ file: Link.vue ~ line 344 ~ onclickPrueba ~ directionBuyer', directionBuyer_oid );

            //---------- CREACION DE COTIZACION CON LOS OBJECT_ID DE CADA DIRECCION -------------------------

            const test = calculateTotalDimensions(productList.value);

            const detailCotizacion = {
                object_purpose: 'QUOTE',
                address_from: directionSeller_oid as string,
                address_to: directionBuyer_oid as string,
                declared_value: 2100, // TODO: ESTO SE OBTIENE DEL TOTAL DEL CARRITO
                weight: test.volumetric, // TODO: ESTO SE OBTIENE DEL TOTAL DEL CARRITO
                length: test.dimensions.length, // TODO: ESTO SE OBTIENE DEL TOTAL DEL CARRITO
                height: test.dimensions.height, // TODO: ESTO SE OBTIENE DEL TOTAL DEL CARRITO
                width: test.dimensions.width, // TODO: ESTO SE OBTIENE DEL TOTAL DEL CARRITO
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                qty: countAmounts.value, // TODO: ESTO SE OBTIENE DEL TOTAL DEL CARRITO
                description: 'Material didactico', // TODO: VER COMO LE PONEMOS AQUI
                product_fiscal_code: 0,
                package_fiscal_code: '',
            };
            console.error('detailCotizacion -> ', detailCotizacion)

            const cotizacion = await createCotizacion(detailCotizacion);
            if (cotizacion.success === false) {
                $q.dialog({
                    component: AlertVue,
                    componentProps: {
                        title: 'Error en creación de cotización de envio',
                    },
                }).onOk((result) => {
                    console.log('ok', result);
                });
            }
            console.log('🚀 ~ file: Link.vue ~ line 440 ~ onclickPrueba ~ cotizacion', cotizacion );
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const cotizacion_json = JSON.parse(JSON.stringify(cotizacion.value));
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
            cotizacion_oid.value = cotizacion_json.shipment.object_id;
            //-----------------------------------------------------------------------------------------------

            //------------------------ OBTENER TARIFAS DE PAQUETERIA -----------------------------------------
            // const myrates = await getRates(cotizacion_oid)              // TODO: Esto obtiene todas las paqueterias para seleccionar
            const myrates = await getRateCarrier(cotizacion_oid.value, 'Redpack'); // TODO: Esto obtiene solo FEDEX, must change later on the requirements
            if (myrates.success === false) {
                $q.dialog({
                    component: AlertVue,
                    componentProps: {
                        title: 'Error en obtener tarifas de paqueteria',
                    },
                }).onOk((result) => {
                    console.log('ok', result);
                });
            }
            console.log('🚀 ~ file: Link.vue ~ line 453 ~ onclickPrueba ~ myrates', myrates );

            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const myrates_json = JSON.parse(JSON.stringify(myrates.value));

            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-explicit-any, @typescript-eslint/restrict-template-expressions
            const myrates_json_names: ServicePackOption[] = myrates_json.results.map( (item: any) => {
              return {
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-member-access
                label: `${item.provider} - ${item.duration_terms} - ${item.amount}`,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                value: item.object_id,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                totalPrice: item.amount
              }
            })

            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
            packServiceList.value = [...myrates_json_names];
            store.commit('shoppingData/setPackServiceOptions', [...myrates_json_names]);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
            //myListPacking.value = [...myrates_json_names];
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access

            quoteCreated.value = true;
            store.commit('shoppingData/setQuoteCreated', true);
            // TODO: CONTINUAR CON EL PROCESO DEL CARRITO QUE YA ESTABA ANTERIORMENTE
        } catch (error) {
          quoteCreated.value = false;
          store.commit('shoppingData/setQuoteCreated', false);
          console.log('hubo un error', error);
        }
        $q.loading.hide();
      };

      const calculateTotalDimensions = (productList: ProductInCart[]) => {
          let resultDimensions: (number|any[])[][] = []
          let longestLenght = 0;
          let longestheight = 0;
          let longestwidth = 0;
          let longestweight = 0;
          let declared_value = 0;
          let bigger = {
              declared_value: 0,
              volumetric: 0,
              dimensions: {
                  weight: 0,
                  length: 0,
                  height: 0,
                  width: 0,
              }
          }
          productList.forEach( (product: ProductInCart) => {
              const length = Number(product.dimensions.length);
              if(length > longestLenght) {longestLenght = length }
              const height = Number(product.dimensions.height);
              if(height > longestheight) {longestheight = height }
              const width = Number(product.dimensions.width);
              if(width > longestwidth) {longestwidth = width }
              const weight = Number(product.dimensions.weight) < 1 ? 1 : Number(product.dimensions.weight);
              longestweight += weight
              const volumetric_size = (length *  height * width) / 5000
              declared_value += Number(product.price)
              resultDimensions.push([volumetric_size, [length, height, width]]);
          })
          console.log( longestLenght, longestheight, longestwidth, longestweight)
          console.log( resultDimensions );
          bigger.volumetric = Math.round(((longestweight > bigger.volumetric) ?  longestweight:  bigger.volumetric) * 100 )/ 100;
          bigger.declared_value = declared_value;
          bigger.dimensions = {
              weight: Math.round(longestweight * 100) / 100,
              length: longestLenght,
              height: longestheight,
              width: longestwidth,
          }
          return bigger;
      }

      const selectServicePack = () => {
        console.log('servicio de paquetería escogido: ', shippingDataForm.value.packService)
        store.commit('shoppingData/setPackServiceSelected', shippingDataForm.value.packService);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
        const my_price_rate = packServiceList.value.find((element: any) => element.value == shippingDataForm.value.packService);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        selected_price_rate.value = my_price_rate.totalPrice;
        console.log('El valor a enviar es _____: ', selected_price_rate.value);
      }

      const confirmShopping = async () => {
        const firstFedEx_oid = shippingDataForm.value.packService;
          //-----------------------------------------------------------------------------------------------

          //------------------------ ACTUALIZAR ENVIO CON LA PAQUETERIA ------------------------------------
          const data_updateShipment = {
              object_purpose: 'PURCHASE',
              rate: firstFedEx_oid,
          };
          const updatedShpment = await updateShipment(
              cotizacion_oid.value,
              data_updateShipment
          );
          if (updatedShpment.success === false) {
              $q.dialog({
                  component: AlertVue,
                  componentProps: {
                      title: 'Error en actualizar envio con paqueteria',
                  },
              }).onOk((result) => {
                  console.log('ok', result);
              });
          }
          console.log('🚀 ~ file: Link.vue ~ line 401 ~ onclickPrueba ~ updatedShpment', updatedShpment );
          //-----------------------------------------------------------------------------------------------
          //saveShoppingDataInStore(firstFedEx_oid);
          store.commit('shoppingData/setquotationShipmentId', cotizacion_oid.value);
          store.commit('shoppingData/setrateShipmentId', firstFedEx_oid);
          store.commit('shoppingData/setpriceShipment', selected_price_rate.value);
          store.commit('shoppingData/addData', shippingDataForm.value);
          router.push('/orderSummary').catch(() => console.log('error al ir al Resumen de la compra!'));
      }

      return {
          shippingDataForm,
          createQuote,
          uXFromViewRoute,
          asentamientosList,
          fillColony,
          autoCompleteCity,
          packServiceList,
          selectServicePack,
          confirmShopping,
          zipCodeValid,
          quoteCreated,
          regExprEmail,
          isValidForm

      };
  },
};

</script>

<style>
.form {
  height: 85vh;
  overflow-y: scroll;
  padding: 0px 5px;
  margin: 0px 10px;
}
.header-bar {
  width: 100%;
  display: flex;
  justify-content:space-evenly;
}
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
    }
input[type=number] { -moz-appearance:textfield; }
.shadow-1 {
  width: 100%;
  height: 80px;
  left: 0px;
  margin-bottom:15px;
  top: 0px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
}
.cart-img {
  width: 20px;
  height: 16px;
  align-items: center;
  justify-content: center;
}
.numberInt {
  margin-bottom: 30px;
}
@media screen and (min-width: 900px) {
  .general-container {
    padding: 30px 15%;
  }

}
.container-page{
  max-height: 100vh;
  overflow-y: scroll;
}
</style>
