import React, { useState, useContext } from 'react';
import { AutenticadoContexto } from '../../Contexts/authContexts';
import {
    StyleSheet,
    Platform,
    SafeAreaView,
    View,
    TextInput,
    Text,
    TouchableOpacity
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

export default function LoginUser() {
    const { verificarToken, loginEntrada } = useContext(AutenticadoContexto);
    verificarToken();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [resposta, setResposta] = useState('');

    const navigation = useNavigation()

    async function fazerLogin(e) {
        e.preventDefault();
        try {
            if (!email || !password) {
                setResposta('Existem Campos em Branco');
            };
            await loginEntrada(email, password);
            navigation.navigate("Home");
        } catch (err) {
            alert("Usuario ou Senha Incorretos");
        };
    };

    return (
        <>
            <SafeAreaView style={styles.container}>
                <View style={styles.formulario}>
                    <TextInput
                        style={styles.campo}
                        placeholder='Digite o E-mail'
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        secureTextEntry={true}
                        style={styles.campo}
                        placeholder='Digite a Senha'
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity style={styles.botao} onPress={fazerLogin}>
                        <Text style={styles.texto}>Login</Text>
                    </TouchableOpacity>
                    {resposta === 'Login Efetuado com Sucesso!!'
                        ?
                        <>
                            <Text style={styles.textoResp}>{resposta}</Text>
                            <Text style={styles.textoResp}>{emailSalvo}</Text>
                        </>
                        :
                        <Text style={styles.textoResp}>{resposta}</Text>
                    }
                </View>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: Platform.OS === 'android' ? '15' : 0,
        backgroundColor: '#fff',
        fontFamily: "Inter"
    },
    formulario: {
        marginTop: 200,
    },
    campo: {
        margin: 20,
        padding: 20,
        borderRadius: 40,
        width: 300,
        borderWidth: 1,
        backgroundColor: '#FFF',
    },
    botao: {
        margin: 20,
        padding: 20,
        borderRadius: 40,
        width: 300,
        backgroundColor: '#d9d9d9',
    },
    texto: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15,
        color: '#000',
    },
    textoResp: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15,
        color: '#FFF',
    },
});