import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    StyleSheet,
    Platform,
    View,
    TextInput,
    Text,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
} from 'react-native';

import apiCep from '../../../Api/apiCep';
import Logo from '../../../Components/LogoInicio';

export default function CadUserGeral() {
    const [nome, setNome] = useState('');
    const [cep, setCep] = useState('');
    const [rua, setRua] = useState('');
    const [cidade, setCidade] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function buscaCep() {
        const resposta = await apiCep.get(`${cep}/json`);
        setRua(resposta.data.logradouro);
        setCidade(resposta.data.localidade);
    };

    async function cadastrarUser() {

    };

    return (
        <>
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <Logo />
                    <View style={styles.formulario}>
                        <TextInput
                            style={styles.campo}
                            placeholder='Digite o Nome'
                            value={nome}
                            onChangeText={setNome}
                        />
                        <TextInput
                            style={styles.campo}
                            placeholder='Digite o CEP'
                            value={cep}
                            onChangeText={setCep}
                            onBlur={buscaCep}
                        />
                        <TextInput
                            style={styles.campo}
                            placeholder='Digite a Rua'
                            value={rua}
                            onChangeText={setRua}
                        />
                        <TextInput
                            style={styles.campo}
                            placeholder='Digite a Cidade'
                            value={cidade}
                            onChangeText={setCidade}
                        />
                        <TextInput
                            style={styles.campo}
                            placeholder='Digite o E-mail'
                            value={email}
                            onChangeText={setEmail}
                        />
                        <TextInput
                            style={styles.campo}
                            placeholder='Digite a Senha'
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity style={styles.botao} onPress={cadastrarUser}>
                            <Text style={styles.texto}>Cadastrar</Text>
                        </TouchableOpacity>
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
    formulario: {
        marginTop: 20,
    },
    campo: {
        margin: 20,
        padding: 20,
        borderRadius: 40,
        width: 300,
        backgroundColor: '#FFF',
    },
    botao: {
        margin: 20,
        padding: 20,
        borderRadius: 40,
        width: 300,
        backgroundColor: '#FFA600',
    },
    texto: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15,
        color: '#000',
    },
});