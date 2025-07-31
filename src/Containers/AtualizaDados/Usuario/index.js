import { useState, useEffect, useContext } from 'react';
import {
    StyleSheet,
    Platform,
    View,
    TextInput,
    Text,
    TouchableOpacity,
    ScrollView,
    // ToastAndroid,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import { AutenticadoContexto } from '../../../Contexts/authContexts';
import apiLocal from '../../../Api/apiLocal';

import apiCep from '../../../Api/apiCep';

export default function UpdUsuario() {
    const { verificarToken, token } = useContext(AutenticadoContexto);
    verificarToken();

    const navigation = useNavigation();

    const route = useRoute();
    const { id } = route.params;

    const [nome, setNome] = useState('');
    const [cpfMask, setCpfMask] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
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
        setCidade(resposta.data.localidade);
        setUf(resposta.data.uf);
    };

    useEffect(() => {
        const cpfToMask = cpf.replace(/\D/g, '').slice(0, 11);
        setCpfMask(cpfToMask.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'));
    }, [cpf]);

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
                setCpf(resposta.data.cpf);
                setEmail(resposta.data.email);
                setTelefone(resposta.data.telefone);
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
            const cpf = cpfMask.match(/\d/g).join("");
            await apiLocal.put('/AlterarDadosUsuarios', {
                id,
                nome,
                cpf,
                email,
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
            navigation.navigate("DrawerAuth");
            // ToastAndroid('Cadastro Alterado com Sucesso', ToastAndroid.SHORT)
        } catch (err) {
            if (err.response) {
                console.log('Status:', err.response.status);
            } else {
                console.log('Erro de rede ou configuração:', err.message);
            };
        };
    };

    if (loading) {
        return (
            <View>
                <Text style={{ color: '#000', margin: 20 }}>Carregando...</Text>
            </View>
        );
    };

    function aplicarMascaraCPF(valor) {
        const cpf = valor.replace(/\D/g, '').slice(0, 11);
        if (cpf.length <= 3) return cpf;
        if (cpf.length <= 6) return cpf.replace(/(\d{3})(\d+)/, '$1.$2');
        if (cpf.length <= 9) return cpf.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
    };

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
                    placeholder='Digite o CPF'
                    value={cpfMask}
                    onChangeText={(valor) => {
                        const cpfLimpo = valor.replace(/\D/g, '');
                        setCpf(cpfLimpo);
                        setCpfMask(aplicarMascaraCPF(valor));
                    }}
                    on
                    keyboardType="numeric"
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