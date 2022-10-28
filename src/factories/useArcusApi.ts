import { computed, reactive, toRefs } from 'vue';

const _state = {
  prefix: 'AP001',
  payee_id: '',
  payment_reference: '',
  verification_digits: 'XX',
};

const state = reactive({
  ..._state,
});

export const useArcusApi = () => {
  const code = computed(() => {
    return (
      state.prefix +
      state.payee_id +
      state.payment_reference +
      state.verification_digits
    );
  });

  return { ...toRefs(state), code };
};
