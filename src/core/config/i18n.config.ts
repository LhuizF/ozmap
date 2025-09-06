import i18next from 'i18next';
import i18nextMiddleware from 'i18next-http-middleware';
import ptBR from '@/core/locales/pt-BR/translation';
import en from '@/core/locales/en/translation';

i18next.use(i18nextMiddleware.LanguageDetector).init({
  fallbackLng: 'pt-BR',
  resources: {
    'pt-BR': {
      translation: ptBR,
    },
    en: {
      translation: en,
    },
  },
  interpolation: {
    escapeValue: false,
  },
});

export { i18next };
