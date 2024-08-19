import { persistReducer } from 'redux-persist';
import mainSlice from './mainSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default persistReducer<ReturnType<typeof mainSlice>>(
  {
    key: 'main',
    storage: AsyncStorage,
    whitelist: ['expenses', 'userName']
  },
  mainSlice
);
