import { api } from 'boot/axios';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

import { ChatConversationItem } from 'src/models/ChatConversations';

interface PostMessagePayload {
  id: string;
  message: string;
}

interface ChatConversationResponse {
  data: {
    conversations: Array<ChatConversationItem> | []
  }
}

export const useChatsApi = () => {
  const chatsLoading = ref<boolean>(false);
  const chatsConversations = ref<Array<ChatConversationItem> | []>([]);
  const chatDetails = reactive({
    name: '',
    messages: [],
  })
  const $router = useRouter();

  const chatsStatus = async () => {
    try {
      const response = await api.get<{status: string}>('/chat/status');

      if(response?.data?.status !== 'available'){
        throw new Error()
      }
    }catch (e) {
      throw new Error()
    }
  }

  const fetchChatConversations = async (sort: 'desc' | 'asc' = 'desc') => {
    try {
      chatsLoading.value = true

      await chatsStatus();
      const response = await api.get<unknown, ChatConversationResponse>('/chat/conversations', {
        params: {
          sort
        }
      })

      chatsConversations.value = response?.data?.conversations ?? [];
    }catch (e) {
      await $router.push('/error500');
    }finally {
      chatsLoading.value = false
    }
  }

  const fetchChatDetails = async (id: string) => {
    try {
      chatsLoading.value = true
      await chatsStatus();
      const { data } = await api.get<{messages: [], name: string}>(`/chat/conversation/${id}`) ?? {};

      chatDetails.messages = (data?.messages ?? []).reverse();
      chatDetails.name = data?.name || '';
    }catch (e) {
      await $router.push('/error500');
    }finally {
      chatsLoading.value = false
    }
  }

  const postMessage = async (payload: PostMessagePayload) => {
    try {
      await api.post<{ message: string }>(`/chat/conversation/${payload.id}/messages`, {
        message: payload.message
      });
    }catch (e) {
      await $router.push('/error500');
    }
  }

    return {
      fetchChatDetails,
      fetchChatConversations,
      chatsLoading,
      chatsConversations,
      chatDetails,
      postMessage,
    }
}
