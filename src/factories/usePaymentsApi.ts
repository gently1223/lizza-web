import { reactive, toRefs } from 'vue';
import { db } from 'src/boot/firebase';
import { Payment } from 'src/components/models';

const state = reactive({
  payments: <Payment[]>[],
  listener: <firebase.default.Unsubscribe | null>null,
  payment: <Payment>{},
});
export const usePaymentsApi = () => {
  const listenPayments = (user_id: string) => {
    try {
      if (state.listener && typeof state.listener === 'function') {
        state.listener();
        state.payments.length = 0;
      }
      state.listener = db()
        .collection('payments')
        .where('user_id', '==', user_id)
        .onSnapshot((next) => {
          next.docChanges().map((change) => {
            const { type, oldIndex, newIndex } = change;
            const newPayment = change.doc.data() as Payment;

            if (type === 'added') {
              console.log('added payment');
              state.payments.splice(newIndex, 0, newPayment);
            }
            if (type === 'modified') {
              console.log('modified payment');
              state.payments.splice(oldIndex, 1);
              state.payments.splice(newIndex, 0, newPayment);
            }
            if (type === 'removed') {
              state.payments.splice(oldIndex, 1);
            }
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  //TODO get private payment detail and merge with current one

  return {
    listenPayments,
    ...toRefs(state),
  };
};
