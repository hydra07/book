import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './auth';
import bookReducer from './book';
import typeReducer from './type';
import userReducer from './user';
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  // whitelist: ['user'],
  blacklist: ['book', 'type'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  book: bookReducer,
  type: typeReducer,
  user: userReducer,
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
