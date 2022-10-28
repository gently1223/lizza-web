<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card
      class="share-actions-card q-ma-md q-pa-md q-pt-xl relative-position"
    >
      <q-btn
        flat
        round
        class="absolute-top-right q-ma-sm"
        style="z-index: 100"
        @click="onDialogHide()"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M13.8348 0.165255C13.8871 0.217507 13.9287 0.279579 13.9571 0.347918C13.9854 0.416256 14 0.489517 14 0.563506C14 0.637494 13.9854 0.710755 13.9571 0.779094C13.9287 0.847432 13.8871 0.909504 13.8348 0.961756L1.45975 13.3368C1.35413 13.4424 1.21087 13.5017 1.0615 13.5017C0.912129 13.5017 0.768874 13.4424 0.663251 13.3368C0.557629 13.2311 0.498291 13.0879 0.498291 12.9385C0.498291 12.7891 0.557629 12.6459 0.663251 12.5403L13.0383 0.165255C13.0905 0.112872 13.1526 0.0713112 13.2209 0.042954C13.2893 0.0145967 13.3625 0 13.4365 0C13.5105 0 13.5838 0.0145967 13.6521 0.042954C13.7204 0.0713112 13.7825 0.112872 13.8348 0.165255Z"
            fill="#848484"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0.663058 0.165255C0.610675 0.217507 0.569114 0.279579 0.540757 0.347918C0.512399 0.416256 0.497803 0.489517 0.497803 0.563506C0.497803 0.637494 0.512399 0.710755 0.540757 0.779094C0.569114 0.847432 0.610675 0.909504 0.663058 0.961756L13.0381 13.3368C13.1437 13.4424 13.2869 13.5017 13.4363 13.5017C13.5857 13.5017 13.7289 13.4424 13.8346 13.3368C13.9402 13.2311 13.9995 13.0879 13.9995 12.9385C13.9995 12.7891 13.9402 12.6459 13.8346 12.5403L1.45956 0.165255C1.40731 0.112872 1.34523 0.0713112 1.2769 0.042954C1.20856 0.0145967 1.1353 0 1.06131 0C0.98732 0 0.914059 0.0145967 0.84572 0.042954C0.777382 0.0713112 0.71531 0.112872 0.663058 0.165255Z"
            fill="#848484"
          />
        </svg>
      </q-btn>

      <h5 class="text-h5 text-center q-mt-md q-mb-lg">
        Comparte tu producto como prefieras, feel free
      </h5>

      <div class="q-mb-lg">
        <div class="share-link-input">
          <div class="copy-action" @click="handleClipboard()" role="button">
            <div class="copy-action-inner">
              <q-icon
                v-if="copied"
                class="text-primary cursor-pointer"
                name="fa fa-check"
              />
              <q-icon
                v-else
                class="text-primary cursor-pointer"
                name="content_copy"
              />
            </div>
          </div>

          <input class="copy-link" :value="link" readonly />
        </div>
      </div>

      <q-card-actions class="justify-around share-action-buttons">
        <q-btn
          round
          color="primary"
          icon="fab fa-whatsapp"
          size="lg"
          @click="handleShare('whatsapp')"
        />
        <q-btn
          round
          color="primary"
          icon="fab fa-facebook"
          size="lg"
          @click="handleShare('facebook')"
        />
        <q-btn
          round
          color="primary"
          icon="fab fa-facebook-messenger"
          size="lg"
          @click="handleShare('messenger')"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useDialogPluginComponent, copyToClipboard } from 'quasar';
import { analytics } from 'boot/firebase';
// import copyToClipboard from 'copy-to-clipboard-ultralight/dist';

const props = defineProps({
  link: {
    type: String,
    required: true,
  },
});

defineEmits([...useDialogPluginComponent.emits]);

const { dialogRef, onDialogHide } = useDialogPluginComponent();

const copied = ref(false);

const handleClipboard = async () => {
  if (copied.value) {
    return;
  }

  // Send GA event when use copies link.
  analytics.logEvent('share', {
    method: 'clipboard',
    content_type: 'payment_link',
  });

  // Copy the link into the clipboard.
  // This utilizes 'copy-to-clipboard-ultralight' because the Quasar implementation is kinda buggy.
  // On iOS, it results in a focus jump, which is pretty bad UX.
  await copyToClipboard(props.link);

  // Indicate the copy was successful and reset it after few secs.
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 3000);
};

const handleShare = (type: 'whatsapp' | 'facebook' | 'messenger') => {
  // Send GA event for all types.
  analytics.logEvent('share', {
    method: type,
    content_type: 'payment_link',
  });

  switch (type) {
    case 'whatsapp':
      window.open(`whatsapp://send?text=${encodeURI(props.link)}`);
      break;
    case 'facebook':
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          props.link
        )}`
      );
      break;
    case 'messenger':
      const appID = 514616313217695;
      window.open(
        `fb-messenger://share?link=${encodeURIComponent(
          props.link
        )}&app_id=${encodeURIComponent(appID)}`
      );
      break;
  }
};
</script>

<style lang="scss" scoped>
.share-actions-card {
  border: none;
  border-radius: 20px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
}

.share-action-buttons > .q-btn {
  background: white !important;
  color: $primary !important;
}

.share-link-input {
  border: 2px solid #efc866;
  border-radius: 100px;
  align-items: center;

  height: 44px;
  display: flex;
  overflow: hidden;

  > .copy-action {
    height: 100%;

    margin-right: 12px;

    display: flex;
    justify-content: center;

    > .copy-action-inner {
      border-right: 1px solid $grey-4;
      margin: 6px 0;
      padding: 0 12px 0 18px;

      display: flex;
      justify-content: center;
      align-items: center;

      font-size: 20px;
    }
  }

  > .copy-link {
    color: $primary;
    border: none;

    width: 100%;
    height: 100%;
    min-width: 0;
    padding: 0 12px 0 0;

    overflow: hidden;
    text-overflow: ellipsis;

    user-select: none;

    &:focus,
    &:focus-visible {
      border: none;
      outline: none;
    }
  }
}
</style>
