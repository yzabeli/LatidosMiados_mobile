import React, { useContext } from 'react';
import { AutenticadoContexto } from '../../Contexts/authContexts';
import {
    StyleSheet,
    Platform,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
} from 'react-native';

import CardProdutos from '../../Components/CardProdutos';

export default function Produtos() {
    const { verificarToken, logout } = useContext(AutenticadoContexto);
    verificarToken();

    return (
        <>
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <TouchableOpacity style={styles.botao} onPress={logout}>
                        <Text style={styles.texto}>Sair</Text>
                    </TouchableOpacity>
                    <View style={styles.botoes}>
                        <TouchableOpacity style={styles.botaoActive}>
                            <Text style={styles.textoActive}>Produtos</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.botao}>
                            <Text style={styles.texto}>Serviços</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.botoes}>
                        <CardProdutos />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: Platform.OS === 'android' ? '15' : 0,
        backgroundColor: '#000',
        fontFamily: "Inter"
    },
    logo: {
        margin: 50,
        height: 50,
        width: 140,
    },
    botoes: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 50,
        justifyContent: 'center',
    },
    botaoActive: {
        margin: 10,
        padding: 15,
        backgroundColor: '#FFA600',
    },
    botao: {
        margin: 10,
        padding: 15,
        borderWidth: 3,
        borderColor: '#FFA600',
        backgroundColor: '#000',
    },
    textoActive: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15,
        color: '#000',
    },
    texto: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15,
        color: '#FFA600',
    },
});