import { useState, useEffect } from 'react';
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

export default function UpdUsuario() {
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [cep, setCep] = useState('');
    const [rua, setRua] = useState('');
    const [cidade, setCidade] = useState('');
    const [password, setPassword] = useState('');

    async function buscaCep() {
        const resposta = await apiCep.get(`${cep}/json`);
        setRua(resposta.data.logradouro);
        setCidade(resposta.data.localidade);
    };

    // useEffect(() => {
    //     try {
    //         async function consultarDados() {
    //             const resposta = await apiLocal.post('/ConsultarUsuariosUnico', {
    //                 id
    //             }, {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`
    //                 }
    //             });
    //             setNome(resposta.data.nome);
    //             setTelefone(resposta.data.telefone);
    //             setEmail(resposta.data.email);
    //             setCep(resposta.data.cep);
    //             setRua(resposta.data.rua);
    //             setNumero(resposta.data.numero);
    //             setComplemento(resposta.data.complemento);
    //             setBairro(resposta.data.bairro);
    //             setCidade(resposta.data.cidade);
    //             setEstado(resposta.data.estado);
    //             setPassword(resposta.data.senha);
    //         };
    //         consultarDados();
    //     } catch (err) {
    //         toast.error('Erro ao Comunicar com o Servidor', {
    //             toastId: 'ToastId'
    //         });
    //     };
    //     // eslint-disable-next-line
    // }, []);

    async function atualizaUsuario(e) {
    //     try {
            e.preventDefault()
    //         await apiLocal.put('/AlterarDadosUsuarios', {
    //             id,
    //             nome,
    //             telefone,
    //             email,
    //             cep,
    //             rua,
    //             numero,
    //             complemento,
    //             bairro,
    //             cidade,
    //             estado
    //         }, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         });
    //         toast.success('Cadastro Alterado com Sucesso', {
    //             toastId: 'ToastId'
    //         });
    //     } catch (err) {
    //         if (err.response) {
    //             console.log('Erro:', err.response.data);
    //             console.log('Status:', err.response.status);
    //         } else {
    //             console.log('Erro de rede ou configuração:', err.message);
    //         }
    //     };
    };

    return (
        <>
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
                <TouchableOpacity style={styles.botao} onPress={atualizaUsuario}>
                    <Text style={styles.texto}>Atualizar</Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    formulario: {
        flex: 1,
        alignItems: 'center',
        paddingTop: Platform.OS === 'android' ? '15' : 0,
        fontFamily: "Inter",
        backgroundColor: '#fff',
    },
    campo: {
        margin: 20,
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
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