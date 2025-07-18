import React, { useContext } from 'react';
import { AutenticadoContexto } from '../../Contexts/authContexts';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

export default function Sair() {
    const { logout } = useContext(AutenticadoContexto);

    return (
        <TouchableOpacity onPress={logout} style={{ marginRight: 15 }}>
            <Feather name="log-out" size={24} color="#000" />
        </TouchableOpacity>
    );
};