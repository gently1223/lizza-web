import { date } from 'quasar';
export const useFormats = () => {
  const fromCentsToUnit = (cents?: number) => {
    return cents ? cents / 100 : 0;
  };

  const toDateString = (dbDate?: firebase.default.firestore.Timestamp) => {
    if (!dbDate) return 'No Date';
    return date.formatDate(dbDate.toDate(), 'DD/MM/YYYY');
  };

  return { fromCentsToUnit, toDateString };
};
