import { UnknownAction, combineReducers, configureStore } from '@reduxjs/toolkit'
import stockListApi from './features/fetchStock/fetchStock'
import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistStore
} from 'redux-persist'

// import storage from 'redux-persist/lib/storage'
import AsyncStorage from '@react-native-async-storage/async-storage';
import coinInfo from './features/coinInfoSlice/coinInfoSlice'

const resettableRootReducer = (
    state: ReturnType<typeof rootReducer> | undefined,
    action: UnknownAction
) => {
    if (action.type === 'reset') {
        return rootReducer(undefined, action)
    }
    return rootReducer(state, action)
}

const persistConfig = {
    key: 'root',
    storage:AsyncStorage,
}


const persistedReducer = persistReducer(persistConfig, resettableRootReducer)

const middleware = [stockListApi.middleware]

const rootReducer = combineReducers({
    [stockListApi.reducerPath]: stockListApi.reducer,
    [coinInfo.name]: coinInfo.reducer
})

const makeConfiguredStore = () =>
    configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                immutableCheck: false,
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                },
            }).concat(middleware),
    })

export const makeStore = () => {
    // console.log(window);
    const isServer = typeof window === 'undefined'
    if (isServer) {
        return makeConfiguredStore()
    } else {
        const persistedReducer = persistReducer(persistConfig, rootReducer)
        let store: any = configureStore({
            reducer: persistedReducer,
            middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware({
                    immutableCheck: false,
                    serializableCheck: {
                        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                    },
                }).concat(middleware),
        })
        store.__persistor = persistStore(store)
        return store
    }
}

// const store = configureStore({
//     reducer: persistedReducer,
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({
//             immutableCheck: false,
//             serializableCheck: {
//                 ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//             },
//         }).concat(middleware),
// })
// export const persistor = persistStore(store)
// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
