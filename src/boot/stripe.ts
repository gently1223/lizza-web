import { boot } from 'quasar/wrappers';
import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripe: Stripe | null;

export default boot(async () => {
  //pk_test_51HeFN3CSCspr9IRjIRmnJ8kl0mMMhqekOIQZW88j6r9T4eSYXlthvDr9dd5Jaai5UFthrFH0o3ylH7wof9E6gzoC00Hv7RRk6R
  stripe = await loadStripe(
    'pk_test_51HeFN3CSCspr9IRjIRmnJ8kl0mMMhqekOIQZW88j6r9T4eSYXlthvDr9dd5Jaai5UFthrFH0o3ylH7wof9E6gzoC00Hv7RRk6R'
  );
});

export { stripe };
