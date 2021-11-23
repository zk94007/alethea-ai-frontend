import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import './App.scss';
import ThemeApp from './containers';
import {store, persistor} from './redux/store';

function App() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeApp />
      </PersistGate>
    </Provider>
  );
}

export default App;
