<template>
  <div class="chat-item"
       @click="openDetails(chatItem.id)"
  >
    <div class="chat-item__header">
      <div class="chat-item__username">
        @{{ chatItem.name }}
      </div>
      <div class="chat-item__time">
        {{ formatDate(chatItem.lastMessage.time) }}
      </div>
    </div>
    <div class="chat-item__content">
      <div class="chat-item__message"
           :class="{'chat-item__message--unavailable': !chatItem.lastMessage.message}"
      >
        {{ chatItem.lastMessage.message || '[Message unsupported]' }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { date } from 'quasar';
import { useRouter } from 'vue-router';
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'ChatItem',
  props: {
    chatItem: {
      type: Object,
      default: () => ({})
    }
  },
  setup() {
    const $router = useRouter();

    const formatDate = (propsDate:string) => {
      return date.formatDate(propsDate, 'DD/MM/YY h:mm a')
    }

    const openDetails = async (id: string) => {
      await $router.push(`/chats/${id}`);
    }

    return {
      formatDate,
      openDetails,
    }
  },
});
</script>

<style scoped lang='scss'>
@import "src/css/quasar.variables";
.chat-item {
  position: relative;

  &__username {
    font-size: 13px;
    line-height: 18px;
    font-weight: 800;
    color: $grey-1;
  }

  &__content {
    margin-top: 4px;
    display: flex;
    justify-content: space-between;
  }

  &__header {
    display: flex;
    width: 100%;
  }

  &__message {
    max-width: 268px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 12px;
    line-height: 16px;
    font-weight: 500;
    color: $grey-3;
    white-space: nowrap;
    opacity: .8;

    &--unavailable {
      opacity: .5;
    }
  }

  &__time {
    margin-left: auto;
    font-size: 9px;
    line-height: 12px;
    font-weight: 500;
    color: $grey-4;
  }

  &__icons {
    display: flex;
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 18px;
    min-height: 18px;
    border-radius: 100%;
    font-size: 10px;
    line-height: 14px;
    font-weight: 500;
    color: $white;

    &:not(:last-child) {
      margin-right: 8px;
    }

    &--red {
      background: $primary;
    }

  }
}

</style>
