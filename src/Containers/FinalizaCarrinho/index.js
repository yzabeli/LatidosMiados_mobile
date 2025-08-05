import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'

export default function FinalizaCarrinho() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.texto}>Carrinho Finalizado</Text>
            <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate("DrawerAuth")}>
                <Text style={styles.textoBotao}>Voltar ao Inicio</Text>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: Platform.OS === 'android' ? '15' : 0,
        backgroundColor: '#fff',
        fontFamily: "Inter"
    },
    texto: {
        marginVertical: 5,
        fontWeight: 'bold',
        fontSize: 24,
        color: '#000',
    },
    botao: {
        margin: 20,
        padding: 20,
        borderRadius: 40,
        width: 300,
        backgroundColor: '#d9d9d9',
    },
    textoBotao: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15,
        color: '#000',
    },
});
