import React, { useState, useContext, useEffect } from 'react';
import { AutenticadoContexto } from '../../Contexts/authContexts';
import {
    StyleSheet,
    Platform,
    SafeAreaView,
    View,
    Text,
} from 'react-native';

import CardProdutos from '../../Components/CardProdutos';

export default function Produtos() {
    const { verificarToken } = useContext(AutenticadoContexto);
    verificarToken();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function carregarPerfil() {
            try {
                await verificarToken();
            } catch (err) {
                console.error('Erro ao carregar perfil:', err);
            } finally {
                setLoading(false);
            }
        }
        carregarPerfil();
    }, [verificarToken]);

    if (loading) {
        return (
            <View style={styles.div}>
                <Text style={{ color: '#fff', margin: 20 }}>Carregando...</Text>
            </View>
        );
    }

    return (
        <>
            <SafeAreaView style={styles.container}>
                <View>
                    <CardProdutos />
                </View>
            </SafeAreaView>
        </>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        paddingTop: Platform.OS === 'android' ? '15' : 0,
        backgroundColor: '#fff',
        fontFamily: "Inter"
    },
});