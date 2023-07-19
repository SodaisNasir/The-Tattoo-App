/**
 * @format
 */

import {AppRegistry} from 'react-native'
import App from './App'
import React from 'react'
import {name as appName} from './app.json'
import {Provider as StoreProvider} from 'react-redux'
import store from './src/redux/reducer/Store'

const Root = () => (
  <StoreProvider store={store}>
    <App />
  </StoreProvider>
)

AppRegistry.registerComponent(appName, () => Root)
