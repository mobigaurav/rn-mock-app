import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from "redux-saga";

import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import rootMiddleware from './rootMiddleware'
import rootReducer from './rootReducer';
import saga from './sagas/rootSaga'
export type RootState = ReturnType<typeof rootReducer>

const persistConfig = {
    key: 'root',
    version: 1,
    storage: AsyncStorage,
    whitelist: ['user'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                /* ignore persistance actions */
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
            thunk:false,
            logger:true
        }).prepend(rootMiddleware).concat(sagaMiddleware),
})
sagaMiddleware.run(saga);
export const persistor = persistStore(store)
export type AppDispatch = typeof store.dispatch
export const useReduxDispatch = (): AppDispatch => useDispatch<AppDispatch>()
export const useReduxSelector: TypedUseSelectorHook<RootState> = useSelector
export default store
