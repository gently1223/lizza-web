<template>
  <q-chat-message class="chat-details-message"
                  :class="{'chat-details-message--unsupported': !message.message}"
                  :text="[functionReplace(message.message) || `[Message unsupported]`]"
                  text-html
                  :sent="message.self"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'ChatDetailsMessage',

  props: {
    message: {
      type: Object,
      default: () => ({}),
    }
  },

  setup() {
    const functionReplace = (text: string): string => {
      const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;

      return text.replace(urlRegex, (url) => {
        return `<a href="${url}">${url}</a>`;
      })
    }

    return {
      functionReplace,
    }
  },
});
</script>

<style lang="scss">
@import "src/css/quasar.variables";

.chat-details-message {

  &.q-message {
    .q-message-text {
      padding: 8px 16px;
      min-height: auto;
      border-radius: 16px;
      max-width: 240px;
      background: $grey-5;

      &::before {
        display: none;
      }

      &--sent {
        background: $primary;
      }

      .q-message-text-content {
        font-size: 16px;
        line-height: 22px;
        font-weight: 500;

        a {
          text-decoration: none;
        }

        &--sent,
        &--sent a {
          color: $white;
        }

        &--received,
        &--received a {
          color: $grey-1;
        }
      }
    }
  }

  &.chat-details-message--unsupported {
    .q-message-text {
      .q-message-text-content {
        font-size: 12px;
        line-height: 14px;
        color: $grey-3;
      }
    }
  }
}

</style>
