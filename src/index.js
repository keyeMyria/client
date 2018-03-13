import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as MobxProvider } from 'mobx-react';
// import { AppContainer } from 'react-hot-loader';
import { IntlProvider } from 'react-intl';
import { RootApp } from 'containers/app';
import { getMessages } from 'langs';
import * as stores from 'stores';

const userLang = navigator.language || navigator.userLanguage; 
const locale = userLang;
const messages = getMessages(locale);

const render = (Component) => {
  ReactDOM.render(
    <MobxProvider {...stores}>
      <IntlProvider locale={locale} messages={messages}>
        <Component />
      </IntlProvider>
    </MobxProvider>,
    document.getElementById('app-root')
  );
};

render(RootApp);

// if (module.hot && process.env.NODE_ENV != 'production') {
//   module.hot.accept('containers/app', () => {
//     const App = require('containers/app').RootApp;
//     render(App);
//   });
// }