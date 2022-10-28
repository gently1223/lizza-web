import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';

import messages from 'src/i18n';

export default boot(({ app }) => {
  const numberFormats = {
    'en-US': {
      currency: {
        style: 'currency',
        currency: 'USD',
        currencyDisplay: 'symbol',
      },
    },
    'es-MX': {
      currency: {
        style: 'currency',
        currency: 'MXN',
        currencyDisplay: 'symbol',
      },
    },
  };
  const i18n = createI18n({
    locale: 'es-MX',
    messages,
    numberFormats,
  });

  // Set i18n instance on app
  app.use(i18n);
});
