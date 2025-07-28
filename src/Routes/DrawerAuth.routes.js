import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Feather } from '@expo/vector-icons'

import Sair from '../Components/Sair';

import Produtos from '../Screens/Dashboard';
import Perfil from '../Screens/Perfil';
import Carrinho from '../Screens/Carrinho';

import Gps from '../Components/GPS'

const Drawer = createDrawerNavigator();

export default function DrawerAuth() {
    return (
        <Drawer.Navigator
            screenOptions={{
                title: '',
                headerStyle: {
                    backgroundColor: '#fff',
                },
                headerTintColor: '#000',
                drawerStyle: {
                    backgroundColor: '#fff',
                },
                drawerInactiveTintColor: '#000',
                drawerActiveBackgroundColor: '#000',
                drawerActiveTintColor: '#fff',
                headerRight: () => <Sair />,
            }}
        >
            <Drawer.Screen
                name='Produtos'
                component={Produtos}
                options={{
                    drawerIcon: ({ color, size }) => <Feather name="home" color={color} size={size} />,
                    drawerLabel: 'Home'
                }}
            />
            <Drawer.Screen
                name='Profile'
                component={Perfil}
                options={{
                    drawerIcon: ({ color, size }) => <Feather name="user" color={color} size={size} />,
                    drawerLabel: 'Perfil'
                }}
            />
            <Drawer.Screen
                name='Carrinho'
                component={Carrinho}
                options={{
                    drawerIcon: ({ color, size }) => <Feather name="shopping-cart" color={color} size={size} />,
                    drawerLabel: 'Carrinho'
                }}
            />
            <Drawer.Screen
                name='gps'
                component={Gps}
                options={{
                    drawerIcon: ({ color, size }) => <Feather name="navigation" color={color} size={size} />,
                    drawerLabel: 'gps'
                }}
            />
        </Drawer.Navigator>
    );
};