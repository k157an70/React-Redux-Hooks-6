import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './src/redux';
import RootNavigation from './src/RootNavigation';
import navigationServices from './src/navigationServices';

export default () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootNavigation
          ref={nav => navigationServices.setTopLevelNavigator(nav)}
        />
      </PersistGate>
    </Provider>
  )
}