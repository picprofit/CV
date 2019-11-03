import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './components/AppRouter';

import * as serviceWorker from './serviceWorker';
import 'materialize-css/sass/materialize.scss';
import 'materialize-css/dist/js/materialize.min';
import './assets/sass/style.sass';

ReactDOM.render(
  <AppRouter />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
