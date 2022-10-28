<template>
  <div class="chat-modal-item">
    <div class="chat-modal-item__top">
      <img class="chat-modal-item__top-image"
           :src="product.image || ''"
           :alt="product.name"
      >
      <div class="chat-modal-item__top-select"
           :class="{'select--active': isSelected}"
           @click="selectItem"
      >
        <q-icon v-if="isSelected" size="12px" name="img:icons/check.svg" />
      </div>
    </div>
    <div class="chat-modal-item__bottom">
      <div class="chat-modal-item__name">
        {{ product.name }}
      </div>
      <div class="chat-modal-item__price">
        ${{ product.price || 0 }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { Product } from 'src/components/models'

export default defineComponent({
  name: 'ChatModalItem',
  props: {
    product: {
      type: Object as PropType<Product>,
      default: () => ({}),
    },
    selectedItems: {
      type: Array as PropType<Product[]>,
      default: () => [],
    }
  },
  setup(props, ctx) {

    const selectItem = () => {
      const { product } = props;

      ctx.emit('select-item', product)
    }

    const isSelected = computed(() => {
      return props.selectedItems.findIndex((item: Product) => item.uid === props.product.uid) !== -1
    })

    return {
      isSelected,
      selectItem
    }
  }
});
</script>

<style scoped lang="scss">
@import "src/css/quasar.variables";
.chat-modal-item {
  width: 100%;
  border-radius: 12px;
  background: $white;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);

  &__top {
    position: relative;
    height: 134px;
    border-bottom: 1px solid $grey-5-lines;
  }

  &__top-image {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-top-right-radius: 12px;
    border-top-left-radius: 12px;
  }

  &__top-select {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 100%;
    position: absolute;
    top: 10px;
    right: 10px;
    background: $grey-5-disabled;
    filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.2));

    &.select--active {
      background: $primary;
    }
  }

  &__bottom {
    padding: 8px 12px 12px;
    font-family: 'Manrope';
  }

  &__name {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    line-height: 16px;
    font-weight: 500;
    white-space: nowrap;
    margin-bottom: 4px;
    color: $grey-1;
  }

  &__price {
    font-size: 12px;
    line-height: 18px;
    font-weight: 500;
    color: $grey-3;
  }
}
</style>
