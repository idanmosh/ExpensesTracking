/* eslint-disable react-hooks/rules-of-hooks */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeModules } from 'react-native';
import Reactotron from 'reactotron-react-native';
import { reactotronRedux as reduxPlugin } from 'reactotron-redux';

declare global {
  interface Console {
    tron: unknown;
  }
}

if (__DEV__) {
  // Getting device hostname
  const scriptURL = NativeModules.SourceCode.scriptURL;
  const host = scriptURL.split('://')[1].split(':')[0];

  Reactotron?.setAsyncStorageHandler?.(AsyncStorage);
  Reactotron.configure({
    name: 'Aquant',
    host,
    port: 9090
  });
  // add every built-in react native feature.  you also have the ability to pass
  // an object as a parameter to configure each individual react-native plugin
  // if you'd like.
  Reactotron.useReactNative({
    asyncStorage: false,
    networking: {
      // optionally, you can turn it off with false.
      ignoreUrls: /symbolicate/
    },
    editor: false, // there are more options to editor
    // errors: { veto: (stackFrame: any) => false }, // or turn it off with false
    overlay: false // just turning off overlay
  });

  // add some more plugins for redux & redux-saga
  Reactotron.use(reduxPlugin());

  // if we're running in DEV mode, then let's connect!

  Reactotron?.connect?.();
  Reactotron?.clear?.();
}

console.tron = Reactotron;

export default Reactotron;
