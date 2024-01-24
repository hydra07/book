import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './auth';
import bookReducer from './book';
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  // whitelist: ['user'],
  blacklist: ['book'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  book: bookReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
