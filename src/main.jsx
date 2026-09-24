import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import enUS from 'antd/locale/en_US';
import ruRU from 'antd/locale/ru_RU';
import uzUZ from 'antd/locale/uz_UZ';
import App from './App';
import { LanguageProvider, useLanguage } from './i18n/LanguageProvider';
import { store } from './store';
import 'antd/dist/reset.css';
import './style.css';

function LocalizedApp() {
  const { language } = useLanguage();
  const locale = language === 'ru' ? ruRU : language === 'en' ? enUS : uzUZ;
  return <ConfigProvider locale={locale}><BrowserRouter><App /></BrowserRouter></ConfigProvider>;
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <LanguageProvider>
        <LocalizedApp />
      </LanguageProvider>
    </Provider>
  </React.StrictMode>,
);
