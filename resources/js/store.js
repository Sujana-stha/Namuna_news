import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers/index';
import createSagaMiddleware from 'redux-saga';
import mySagas from './sagas/main';
import history from './myhistory';
import {routerMiddleware} from 'connected-react-router';


const sagaMiddleware = createSagaMiddleware();

// const composeSetup = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer(history), compose(applyMiddleware(routerMiddleware(history), sagaMiddleware)));

sagaMiddleware.run(mySagas);

export default store;