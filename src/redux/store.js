import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import {combinedReducers} from './mainReducer';
import {applyMiddleware, compose, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {mainSaga} from './mainSaga';

const sagaMiddleware = createSagaMiddleware();

/**
 * this app uses React Native Debugger, but it works without it
 */

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [sagaMiddleware /** more middlewares if any goes here */];

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['showSignUpModal', 'showLoginModal']
};

const persistedReducer = persistReducer(persistConfig, combinedReducers);
const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(...middlewares)));
const persistor = persistStore(store);

sagaMiddleware.run(mainSaga);

export {store, persistor};
