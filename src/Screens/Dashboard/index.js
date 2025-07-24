import React, { useState, useContext, useEffect } from 'react';
import { AutenticadoContexto } from '../../Contexts/authContexts';
import {
    StyleSheet,
    Platform,
    View,
    Text,
    Dimensions,
    ScrollView
} from 'react-native';

import CardProdutos from '../../Components/CardProdutos';
import Carrosel from '../../Components/Carrossel';

export default function Produtos() {
    const { verificarToken } = useContext(AutenticadoContexto);
    verificarToken();

    const larguraTela = Dimensions.get('window').width;

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
            <ScrollView style={[styles.container, { width: larguraTela }]}>
                <Text style={styles.title}>Encontre tudo que seu pet precisa!</Text>
                <View>
                    <Carrosel />
                </View>
                <View>
                    <CardProdutos />
                </View>
            </ScrollView>
        </>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? '15' : 0,
        fontFamily: "Inter",
        backgroundColor: '#fff',
    },
    title: {
        marginHorizontal: 20,
        marginBottom: 10,
        fontSize: 24,
        fontWeight: 'bold',
    },
});