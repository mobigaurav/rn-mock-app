/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import {
  StatusBar,
  StyleSheet,
  View,
} from "react-native";

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from './src/redux'
import MainNavigation from './src/routing/MainNavigation'

export default function App(): React.ReactElement {
  return (
      <Provider store={store}>
           <PersistGate loading={null} persistor={persistor}>
                <StatusBar hidden />
                <MainNavigation />
            </PersistGate>
      </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
  },
})


