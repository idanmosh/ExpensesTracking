import { configureStore, StoreEnhancer } from '@reduxjs/toolkit';
import * as reducer from './slices';
import { persistStore } from 'redux-persist';
import { ReactotronReactNative } from 'reactotron-react-native';

const getDefaultMiddlewareOptions = {
  serializableCheck: false
};

let store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(getDefaultMiddlewareOptions)
});

if (__DEV__) {
  const reactotron: ReactotronReactNative = require('../../ReactotronConfig')?.default;

  store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(getDefaultMiddlewareOptions),
    enhancers: (getDefaultEnhancers) =>
      getDefaultEnhancers().concat(
        reactotron?.createEnhancer?.() as StoreEnhancer<
          Record<string, never>,
          Record<string, never>
        >
      )
  });
}

export type RootState = ReturnType<typeof store.getState>;

export const persistor = persistStore(store);

export default store;
