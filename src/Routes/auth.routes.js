import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Sair from '../Components/Sair';
import DrawerAuth from './DrawerAuth.routes'

import InfoProd from '../Screens/InfoProd'
import Carrinho from '../Screens/Carrinho'
import UpdUsuario from '../Containers/AtualizaDados/Usuario';
import FinalizaCarrinho from '../Containers/FinalizaCarrinho';

const Stack = createNativeStackNavigator();

export default function Auth() {
    return (
        <Stack.Navigator
            screenOptions={{
                title: '',
                headerShown: true,
                headerStyle: {
                    backgroundColor: '#fff',
                },
                headerTintColor: '#000',
                headerRight: () => <Sair />,
            }}
        >
            <Stack.Screen
                name="DrawerAuth"
                component={DrawerAuth}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='InfoProd'
                component={InfoProd}
            />
            <Stack.Screen
                name='Carrinho'
                component={Carrinho}
            />
            <Stack.Screen
                name='UpdUsuario'
                component={UpdUsuario}
            />
            <Stack.Screen
                name='FinalizaCarrinho'
                component={FinalizaCarrinho}
            />
        </Stack.Navigator>
    );
};