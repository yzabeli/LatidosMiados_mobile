import React from 'react';
import {
  StatusBar,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthProvider from './src/Contexts/authContexts';

import Rotas from './src/Routes';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar barStyle='light-content' translucent={true} />
        <Rotas />
      </AuthProvider>
    </NavigationContainer>
  );
}
