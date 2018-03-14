import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as MobxProvider } from 'mobx-react';
import { IntlProvider } from 'react-intl';
import { RootApp } from 'containers/app';
import { getMessages } from 'langs';
import * as stores from 'stores';

const userLang = navigator.language || navigator.userLanguage; 
const locale = userLang;
const messages = getMessages(locale);

ReactDOM.render(
  <MobxProvider {...stores}>
    <IntlProvider locale={locale} messages={messages}>
      <RootApp />
    </IntlProvider>
  </MobxProvider>,
  document.getElementById('app-root')
);
