<template>
  <div class="chats">
    <div class="chats__wrapper">
      <div class="chats__content chats__controls">
        <div class="chats__title">
          Chats
        </div>
        <div class="chats__options row justify-between q-mb-lg">
          <q-input v-model="userSearch"
                   class="chats__input col-grow q-mr-lg"
                   rounded outlined
                   placeholder="Buscar"
          >
            <template v-slot:prepend>
              <q-icon size="20px" name="img:icons/search.svg" />
            </template>
          </q-input>
          <div class="chats__button row justify-center items-center"
               :class="{'chats__button--disabled': isLoadingSort || chatsLoading }"
               @click="changeSort"
          >
            <template v-if="!isLoadingSort">
              <div class="chats__button-lines">
                <div v-for="line in 4"
                     :key="`line-${line}`"
                     :class="['chats__button-line',`chats__button-line-${line}`]"
                />
              </div>
              <q-icon size="10px"
                      name="img:icons/arrow-down.svg"
                      class="chats__button-icon"
                      :class="{
                      'chats__button-icon--rotate': !sortBy,
                    }"
              />
            </template>
            <q-spinner
              v-else
              color="primary"
              size="2em"
              :thickness="3"
            />
          </div>
        </div>
      </div>
      <div class="chats__content chats__list">
        <loader v-if="chatsLoading && !chatsConversations.length" />
        <template v-else-if="foundChats.length">
          <chat-item v-for="chatItem in foundChats"
                     class="chats__list-item"
                     :key="chatItem.id"
                     :chat-item="chatItem"
          />
        </template>
        <div v-else
             class="chats__list-empty"
        >
          No available chats
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ChatItem from 'src/components/chats/ChatItem.vue';
import Loader from 'src/components/Loader.vue';
import { computed, onMounted, ref, defineComponent } from 'vue';
import { useChatsApi } from 'src/factories/useChatsApi';
import { ChatConversationItem } from 'src/models/ChatConversations';
export default defineComponent({
  name: 'Chats',
  components: { ChatItem, Loader },
   setup() {
    const userSearch = ref<string>('');
    const sortBy = ref<boolean>(false);
    const isLoadingSort = ref<boolean>(false);


    const { fetchChatConversations, chatsLoading, chatsConversations } = useChatsApi();

    const init = async () => {
      await fetchChatConversations()
    }

    const changeSort = async () => {
      sortBy.value = !sortBy.value;
      isLoadingSort.value = true
      await fetchChatConversations(sortBy.value ? 'asc' : 'desc')
      isLoadingSort.value = false;
    }

     const foundChats = computed(() => {
       return chatsConversations.value.filter((chat: ChatConversationItem) => chat.name.toLowerCase().indexOf(userSearch.value) !== -1)
     });

    onMounted( async () => {
      await init()
    })

    return {
      userSearch,
      chatsLoading,
      chatsConversations,
      sortBy,
      changeSort,
      isLoadingSort,
      foundChats
    }
  }
});
</script>

<style scoped lang='scss'>
@import "../css/quasar.variables";
.chats {
  &__wrapper {
    height: 100vh;
    overflow: hidden;
  }

  &__content {
    padding: 20px;
  }

  &__controls {
    padding-bottom: 0;
  }

  &__title {
    margin-bottom: 12px;
    font-size: 20px;
    line-height: 28px;
    font-weight: 700;
    color: $grey-1;
  }

  &__list {
    position: relative;
    height: calc(100vh - 120px);
    overflow: scroll;

    &-item {
      &:not(:last-child) {
        padding-bottom: 20px;
        margin-bottom: 20px;
        border-bottom: 1px solid #EFF2F3;
      }
    }

    &-empty {
      font-size: 14px;
      line-height: 16px;
      color: $grey-4;
    }
  }

  &__button {
    width: 36px;
    height: 36px;
    position: relative;
    border-radius: 100%;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.15);

    &--disabled {
      pointer-events: none;
    }

    &-icon {
      position: absolute;
      top: 15px;
      right: 5px;
      transform: rotateZ(180deg);
      transition: transform .3s ease-out;
    }

    &-icon--rotate {
      transform: rotateZ(0deg);
    }

    &-line {
      height: 1px;
      border-radius: 50%;
      background: $primary;

      &:not(:last-child) {
        margin-bottom: 3px;
      }

      &:nth-child(1) {
        width: 14px;
      }
      &:nth-child(2) {
        width: 10px;
      }
      &:nth-child(3) {
        width: 7px;
      }
      &:nth-child(4) {
        width: 4px;
      }
    }
  }
}
</style>
<style lang='scss'>
.chats {

  &__input.q-field {

    .q-field__native {
      font-size: 12px;
      line-height: 20px;
      font-weight: 500;
      color: $grey-4;
    }


    .q-field__control {
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.15);
    }

    .q-field__control,.q-field__marginal {
      height: 36px;
    }
  }
}
</style>
