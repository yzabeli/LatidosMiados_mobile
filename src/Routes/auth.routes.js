import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Produtos from '../Screens/Dashboard';

const Stack = createNativeStackNavigator();

export default function Auth() {
    return (
        <Stack.Navigator
            initialRouteName='HomeScreen'
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#000',
                },
                headerTintColor: '#FFA600',
            }}
        >
            <Stack.Screen
                name='HomeScreen'
                component={Produtos}
                options={
                    {
                        headerShown: false,
                    }
                }
            />
            {/* <Stack.Screen
                name='CadastroUsuario'
                component={CadUserInicio}
                options={
                    {
                        title: 'Cadastro de Usuário',
                    }
                }
            />
            <Stack.Screen
                name='LoginUsuario'
                component={LoginUser}
                options={
                    {
                        title: 'Login',
                    }
                }
            /> */}
        </Stack.Navigator>
    );
};