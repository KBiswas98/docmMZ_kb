import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {logger} from 'redux-logger'
import allReducer from '../reducer';
import MainNavigation from '../../config/routes/MainNavigation';
import {persistStore, persistReducer} from 'redux-persist'
import {PersistGate} from 'redux-persist/integration/react'
import AsyncStorage from '@react-native-community/async-storage'
import Loading from '../../screens/loading/Loading'

const persistConfig = {
    key: 'primary',
    storage: AsyncStorage,
    whitelist: [
        'AuthReducer',
    ],
    blacklist: [
        "QuestionReducer",
        'DoctorReducer'
    ]
}

const pReducer = persistReducer(persistConfig, allReducer)

const _store = createStore(pReducer, {},applyMiddleware(thunk, logger));
const store = persistStore(_store)


export default function Store() {
  return (
    <Provider store={ _store}>
        <PersistGate loading={Loading} persistor={store}>
            <MainNavigation />
        </PersistGate>
    </Provider>
  );
}
