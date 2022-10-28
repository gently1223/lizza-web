<template>
  <div ref="modalRef"
       class="chat-modal-items"
       :class="{'chat-modal-items--hidden': !isOpenModal}"
       @click.self="closeModal"
  >
    <div class="chat-modal-items__content"
         :style="style"
    >
      <div class="chat-modal-items__close" v-touch-pan.down="handleSwipe" />
      <div class="chat-modal-items__list">
        <div class="chat-modal-items__list-wrapper">
          <chat-modal-item v-for="product in products"
                           :key="product.link_id"
                           :product="product"
                           :selected-items="selectedItems"
                           @select-item="addItem"
          />
        </div>
      </div>
      <div class="chat-modal-items__btns">
        <div class="chat-modal-items__btn chat-modal-items__btn-all"
             @click="shareProducts('all')"
        >
          Compartir catálogo completo
        </div>
        <div class="chat-modal-items__btn chat-modal-items__btn-send"
             :class="{'chat-modal-items__btn-send--disabled': !selectedItems.length}"
             @click="shareProducts"
        >
          Compartir
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ChatModalItem from 'src/components/chats/ChatModalItem.vue';
import { computed, onMounted, reactive, ref, watch, defineComponent } from 'vue';
import { useProductApi } from 'src/factories/useProductApi';
import { useAuthApi } from 'src/factories/useAuthApi';

import { Product } from 'src/components/models'
export default defineComponent({
  name: 'ChatModalItems',
  components: {
    ChatModalItem
  },
  props: {
    closeModal: {
      type: Function,
      default: () => ({}),
    },
    isOpenModal: {
      type: Boolean,
      default: false,
    }
  },
  setup(props, ctx) {
    const modalRef = ref(null);
    const translateY = ref(0);
    const selectedItems = reactive<Array<Product>>([]);

    const { products, getProducts, listenProducts, getProductLink } = useProductApi();
    const { userId } = useAuthApi();

    onMounted(async () => {
      await getProducts(userId.value);
      listenProducts(userId.value);
    })

    const addItem = (product: Product) => {
      const foundIndex = selectedItems.findIndex((item: Product) => item.uid === product.uid)

      if(foundIndex === -1){
        selectedItems.push(product)
        return;
      }

      selectedItems.splice(foundIndex, 1)
    }

    const handleSwipe = (event: { isFinal: boolean; distance: { y: number; }; }) => {
      const isFinal = event.isFinal
      const distanceY = event.distance.y
      translateY.value = distanceY
      if(distanceY > 120 && isFinal) {
        props.closeModal()
      }else if(isFinal){
        translateY.value = 0
      }
    }

    const style = computed(() => {
      return {transform: `translateY(${translateY.value}px)`}
    })

    const shareAll = () => {
      const crypt = btoa(userId.value);
      ctx.emit('share-products', `https://lizza.app/products/${crypt}`);
      props.closeModal();
    }

    const shareProducts = (type = 'all') => {
      let link = '';
      if(type === 'all') {
        const crypt = btoa(userId.value);
        link = `https://lizza.app/products/${crypt}`;
      }else {
        link = selectedItems.map((product: Product) => getProductLink(product)).join(' ,')
      }

      ctx.emit('share-products', link);
      props.closeModal();
    }

    watch(() => props.isOpenModal, (newValue: boolean) => {
      if(newValue) {
        translateY.value = 0
        selectedItems.length = 0
      }
    })

    watch(() => [...products.value], () => {
      ctx.emit('has-products', Boolean(products.value.length))
    })

    return {
      modalRef,
      selectedItems,
      products,
      addItem,
      handleSwipe,
      style,
      shareAll,
      shareProducts,
    }
  }
});
</script>

<style scoped lang="scss">
@import "src/css/quasar.variables";
.chat-modal-items {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba($dark, .2);

  &--hidden {
    transform: translateY(100%)!important;
  }

  &__content {
    position: fixed;
    top: auto;
    bottom: 0;
    width: 100%;
    max-height: 80%;
    height: 100%;
    background: $white;
    margin-top: auto;
    padding: 0 36px 40px;
    border-radius: 40px 40px 0 0;
    transition: all 0.3s ease-out;
    box-shadow: 0 0 8px rgba(0, 0, 0, .1);
  }

  &__close {
    position: relative;
    margin: 0 auto;
    width: 100%;
    height: 72px;

    &::after {
      content: "";
      position: absolute;
      width: 120px;
      height: 6px;
      border-radius: 100px;
      left: 50%;
      top: 26px;
      transform: translateX(-50%);
      background: $grey-5-lines;
    }
  }

  &__list {
    margin: -10px;
    padding: 15px 10px 10px;
    overflow: auto;
    max-height: calc(100% - 185px);
    height: 100%;
  }

  &__list-wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fill,minmax(140px,1fr));
    grid-gap: 24px;
    grid-column-gap: 23px;
  }

  &__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 48px;
    padding: 0 18px;
    border-radius: 100px;
    text-align: center;
    font-size: 16px;
    line-height: 1;
    font-weight: 600;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);

    &:not(:last-child) {
      margin-bottom: 24px;
    }
  }

  &__btns {
    margin-top: 30px;
  }

  &__btn-all {
    background: $white;
    color: $primary;
  }

  &__btn-send {
    background: $primary;
    color: $white;

    &--disabled {
      background: $grey-5-disabled;
      color: $grey-5-lines;
      pointer-events: none;
    }
  }
}
</style>
