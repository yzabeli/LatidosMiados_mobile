import React, { useState, useContext } from 'react';
import { AutenticadoContexto } from '../../../Contexts/authContexts';
import {
    StyleSheet,
    Platform,
    SafeAreaView,
    View,
    TextInput,
    Text,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import apiLocal from '../../../Api/apiLocal';

export default function CadUserInicio() {
    const { verificarToken } = useContext(AutenticadoContexto);
    verificarToken();

    const navigation = useNavigation();

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [password, setPassword] = useState('');
    const [resposta, setResposta] = useState('');

    async function cadastrarUser(e) {
        try {
            e.preventDefault();
            setResposta('');
            if (!nome || !email || !telefone || !password) {
                setResposta("Campos em Branco");
                return;
            };
            await apiLocal.post('/CadastrarUsuarios', {
                nome,
                email,
                telefone,
                password,
            });
            navigation.navigate("LoginUsuario");
        } catch (err) {
            // alert('Erro ao Comunicar com o Servidor');
            alert(err);
        }
    };

    return (
        <>
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style={styles.formulario}>
                        <TextInput
                            style={styles.campo}
                            placeholder='Digite o Nome'
                            value={nome}
                            onChangeText={setNome}
                        />
                        <TextInput
                            style={styles.campo}
                            placeholder='Digite o E-mail'
                            keyboardType='email-address'
                            value={email}
                            onChangeText={setEmail}
                        />
                        <TextInput
                            style={styles.campo}
                            placeholder='Digite o Telefone'
                            keyboardType='numeric'
                            value={telefone}
                            onChangeText={setTelefone}
                        />
                        <TextInput
                            secureTextEntry={true}
                            style={styles.campo}
                            placeholder='Digite a Senha'
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity style={styles.botao} onPress={cadastrarUser}>
                            <Text style={styles.texto}>Cadastrar</Text>
                        </TouchableOpacity>
                        {
                            resposta === 'Campos em Branco'
                            &&
                            <Text style={styles.textoResp}>{resposta}</Text>
                        }
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
        backgroundColor: '#fff',
        fontFamily: "Inter"
    },
    formulario: {
        marginTop: 50,
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