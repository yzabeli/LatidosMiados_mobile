import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../Screens/Home';
import CadUserInicio from '../Screens/CadastroUsuario/Inicio';
import LoginUser from '../Screens/LoginUser';

const Stack = createNativeStackNavigator();

export default function NoAuth() {
    return (
        <Stack.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#fff',
                },
                headerTintColor: '#000',
            }}
        >
            <Stack.Screen
                name='Home'
                component={HomeScreen}
                options={
                    {
                        headerShown: false,
                    }
                }
                />
            <Stack.Screen
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
            />
        </Stack.Navigator>
    );
};