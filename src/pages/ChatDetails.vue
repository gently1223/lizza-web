<template>
  <div class="chat-details">
    <loader v-if="chatsLoading && !chatDetails.messages.length"/>
    <template v-else>
      <div class="chat-details__header row justify-center items-center q-py-md">
        <q-icon size="24px"
                name="img:icons/back-arrow.svg"
                class="chat-details__header-back"
                @click="navigateToAllChats"
        />
        <div class="chat-details__header-username">
          @{{ chatDetails.name }}
        </div>
      </div>
      <div ref="chatDetailsContentRef"
           class="chat-details__content"
      >
        <div ref="chatDetailsRef"
             class="chat-details__messages"
        >
          <chat-details-message v-for="(message,index) in chatDetails.messages"
                                :key="`${message.time}_message_${index}`"
                                :message="message"
          />
        </div>
      </div>
      <div class="chat-details__controls">
        <q-input v-model="messageInput"
                 rounded
                 outlined
                 placeholder="Enter your message"
                 class="chat-details__input col-grow q-mr-lg"
                 @keydown.enter="onSubmit"
        >
          <template v-slot:prepend>
            <q-icon size="20px" name="img:icons/search.svg" />
          </template>
        </q-input>
        <div class="chat-details__btn-add"
             :class="{'chat-details__btn-add--disabled': !hasProducts}"
             @click="isOpenModal = !isOpenModal"
        >
          <q-icon size="16px" name="img:icons/icon-plus.svg" />
        </div>
        <chat-modal-items :is-open-modal="isOpenModal"
                          :close-modal="closeModal"
                          @has-products="setHasProducts"
                          @share-products="sendMessage"
        />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { onBeforeUnmount, onMounted, reactive, toRefs, defineComponent } from 'vue';
import { useChatsApi } from 'src/factories/useChatsApi';
import { date } from 'quasar'

import Loader from 'src/components/Loader.vue';
import ChatModalItems from 'src/components/chats/ChatModalItems.vue';
import ChatDetailsMessage from 'src/components/chats/ChatDetailsMessage.vue';

interface ChatDetailsData {
  isOpenModal: boolean;
  hasProducts: boolean;
  chatId: string;
  chatDetailsRef: HTMLElement | null;
  chatDetailsContentRef: HTMLElement | null;
  messageInput: string;
  chatRefreshTimeout:  null | ReturnType<typeof setInterval>;
}
export default defineComponent({
  name: 'ChatDetails',
  components: { ChatDetailsMessage, ChatModalItems, Loader },
  setup() {
    const router = useRouter();
    const state = reactive<ChatDetailsData>({
      isOpenModal: false,
      hasProducts: false,
      chatId: '',
      chatDetailsRef: null,
      chatDetailsContentRef: null,
      messageInput: '',
      chatRefreshTimeout: null,
    })
    const { fetchChatDetails, chatDetails, chatsLoading, postMessage } = useChatsApi();

    const navigateToAllChats = async () => {
      await router.push('/chats')
    }

    const closeModal = () => {
      state.isOpenModal = false
    }

    const formatDate = (propsDate: string) => {
      return date.formatDate(propsDate, 'h:mm a')
    }

    const setHasProducts = (flag: boolean) => {
      state.hasProducts = flag
    }

    const onSubmit = () => {
      if(!state.messageInput) return;

      sendMessage(state.messageInput);
    }

    const sendMessage = (message: string) => {
      const payload = {
        message,
        id: state.chatId
      }

      postMessage(payload).then(async () => {
        state.messageInput = '';
        await makeFetchChat();
        scrollToBottomContainer()
      }).catch(err => {
        console.error(err)
      })
    }

    const makeFetchChat = async () => {
      await fetchChatDetails(state.chatId)
    }

    const scrollToBottomContainer = () => {
      const scrollHeight = state.chatDetailsRef?.clientHeight || 0;
      state.chatDetailsContentRef?.scrollTo({ top: scrollHeight, behavior: 'smooth' })
    }

    onMounted(async () => {
      const { params: { id } } = useRoute();
      state.chatId = typeof id === 'string' ? id : id[0];

      await makeFetchChat().then(() => {
        scrollToBottomContainer()
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        state.chatRefreshTimeout = setInterval( makeFetchChat, 5000)
      });
    })

    onBeforeUnmount(() => {
      if(state.chatRefreshTimeout) clearTimeout(state.chatRefreshTimeout)
    })

    return {
      navigateToAllChats,
      closeModal,
      chatDetails,
      formatDate,
      chatsLoading,
      onSubmit,
      sendMessage,
      setHasProducts,
      ...toRefs(state)
    }
  },
});
</script>

<style lang="scss">
@import "src/css/quasar.variables";
.chat-details {
  font-family: 'Manrope';

  &__header {
    position: relative;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.15);

    &-back {
      position: absolute;
      top: 50%;
      left: 18px;
      transform: translateY(-50%);
    }

    &-username {
      font-size: 16px;
      line-height: 22px;
      font-weight: 800;
      color: $grey-1;
    }
  }

  &__time {
    padding: 8px 0;
    margin-bottom: 8px;
    text-align: center;

    &-text {
      font-size: 14px;
      line-height: 19px;
      font-weight: 500;
      color: $grey-3;
    }
  }

  &__content {
    height: calc(100vh - 138px);
    padding: 20px;
    overflow-y: scroll;
  }

  &__messages {
    width: 100%;
    overflow: hidden;
  }

  &__controls {
    display: flex;
    justify-content: space-between;
    margin-top: auto;
    padding: 24px 20px 20px;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      width: calc(100% - 40px);
      height: 1px;
      background: rgba(0, 0, 0, 0.1);
    }
  }

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
      height: 40px;
    }
  }

  &__btn-add {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    background: $white;
    border-radius: 100%;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);

    &--disabled {
      pointer-events: none;
      opacity: .7;
    }
  }
}
</style>
