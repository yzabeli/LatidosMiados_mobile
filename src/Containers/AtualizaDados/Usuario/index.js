import { useState, useEffect, useContext } from 'react';
import { AutenticadoContexto } from '../../../Contexts/authContexts';
import {
    StyleSheet,
    Platform,
    View,
    TextInput,
    Text,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    ToastAndroid,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import apiLocal from '../../../Api/apiLocal';

import apiCep from '../../../Api/apiCep';

export default function UpdUsuario() {
    const { verificarToken, token } = useContext(AutenticadoContexto);
    verificarToken();

    const navigation = useNavigation();

    const route = useRoute();
    const { id } = route.params;

    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [cep, setCep] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');

    const [loading, setLoading] = useState(true);

    async function buscaCep() {
        const resposta = await apiCep.get(`${cep}/json`);
        setRua(resposta.data.logradouro);
        setRua(resposta.data.logradouro);
        setBairro(resposta.data.bairro);
        setUf(resposta.data.uf);
    };

    useEffect(() => {
        async function consultarDados() {
            try {
                const resposta = await apiLocal.post('/ConsultarUsuariosUnico', {
                    id
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setNome(resposta.data.nome);
                setTelefone(resposta.data.telefone);
                setEmail(resposta.data.email);
                setCep(resposta.data.cep);
                setRua(resposta.data.rua);
                setNumero(resposta.data.numero);
                setComplemento(resposta.data.complemento);
                setBairro(resposta.data.bairro);
                setCidade(resposta.data.cidade);
                setUf(resposta.data.estado);
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false);
            };
        };
        consultarDados();
        // eslint-disable-next-line
    }, [token]);
    async function atualizaUsuario(e) {
        e.preventDefault()
        try {
            await apiLocal.put('/AlterarDadosUsuarios', {
                id,
                nome,
                telefone,
                email,
                cep,
                rua,
                numero,
                complemento,
                bairro,
                cidade,
                uf
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(complemento);
            navigation.navigate("DrawerAuth");
            // ToastAndroid('Cadastro Alterado com Sucesso', ToastAndroid.SHORT)
        } catch (err) {
            if (err.response) {
                console.log('Status:', err.response.status);
            } else {
                console.log('Erro de rede ou configuração:', err.message);
            }
        };
    };

    if (loading) {
        return (
            <View>
                <Text style={{ color: '#000', margin: 20 }}>Carregando...</Text>
            </View>
        );
    }

    return (
        <ScrollView>
            <View style={styles.formulario}>
                <Text style={styles.title}>Atualização de Cadastro</Text>
                <TextInput
                    style={styles.campo}
                    placeholder='Digite o Nome'
                    value={nome}
                    onChangeText={setNome}
                />
                <TextInput
                    style={styles.campo}
                    placeholder='Digite o E-mail'
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.campo}
                    placeholder='Digite o Telefone'
                    value={telefone}
                    onChangeText={setTelefone}
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
                    placeholder='Digite o Número'
                    value={numero}
                    onChangeText={setNumero}
                />
                <TextInput
                    style={styles.campo}
                    placeholder='Digite o Complemento'
                    value={complemento}
                    onChangeText={setComplemento}
                />
                <TextInput
                    style={styles.campo}
                    placeholder='Digite o Bairro'
                    value={bairro}
                    onChangeText={setBairro}
                />
                <TextInput
                    style={styles.campo}
                    placeholder='Digite a Cidade'
                    value={cidade}
                    onChangeText={setCidade}
                />
                <TextInput
                    style={styles.campo}
                    placeholder='Digite o estado'
                    value={uf}
                    onChangeText={setUf}
                />
                <TouchableOpacity style={styles.botao} onPress={atualizaUsuario}>
                    <Text style={styles.texto}>Atualizar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
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
    title: {
        marginBottom: 10,
        fontSize: 24,
        fontWeight: 'bold',
    },
    campo: {
        marginVertical: 10,
        padding: 10,
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
        marginBottom: 100,
    },
    texto: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15,
        color: '#000',
    },
});