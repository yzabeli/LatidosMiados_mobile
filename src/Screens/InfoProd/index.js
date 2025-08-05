import React, { useState, useEffect, useContext } from 'react';
import {
    StyleSheet,
    Platform,
    SafeAreaView,
    View,
    TouchableOpacity,
    Text,
    Image,
    ToastAndroid,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AutenticadoContexto } from '../../Contexts/authContexts';
import apiLocal from '../../Api/apiLocal';

export default function InfoProd() {
    const { verificarToken, token } = useContext(AutenticadoContexto);
    verificarToken();

    const navigation = useNavigation();

    const route = useRoute();
    const { id } = route.params;

    const [dados, setDados] = useState('');
    const [idT, setIdT] = useState('');
    const [banner, setBanner] = useState('');
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState('');
    const [quant, setQuant] = useState(1);

    const [dadosPedido, setDadosPedido] = useState('');
    const [n_pedido, setNPedido] = useState('');
    const [existePedido, setExistePedido] = useState(false);
    const [id_usuario, setIdUsuario] = useState('');

    useEffect(() => {
        async function consultarProdutos() {
            try {
                const resposta = await apiLocal.post('/ConsultarProdutosUnico', {
                    id
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setDados(resposta.data);
                setIdT(resposta.data.id);
                setBanner(resposta.data.banner);
                setNome(resposta.data.nome);
                setDescricao(resposta.data.descricao);
                setPreco(resposta.data.preco);
            } catch (err) {
                ToastAndroid.show('Erro ao comunicar com o servidor', ToastAndroid.SHORT);
            }
        }
        consultarProdutos();
    }, [id, token]);

    useEffect(() => {
        async function carregarDados() {
            try {
                const clienteU = await AsyncStorage.getItem('@id');

                if (clienteU) {
                    const idUser = JSON.parse(clienteU);
                    setIdUsuario(idUser);

                    const resposta = await apiLocal.get('/BuscarCarrinhoAbertoDoUsuario', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    if (resposta.data) {
                        await AsyncStorage.setItem('@npedido', JSON.stringify(resposta.data.n_pedido));
                        await AsyncStorage.setItem('@id_pedido', JSON.stringify(resposta.data.id));
                        setNPedido(resposta.data.n_pedido);
                        setExistePedido(true);
                    } else {
                        setExistePedido(false);
                    }
                };
            } catch (err) {
                // console.log("Erro ao carregar dados do AsyncStorage:", err);
                // ToastAndroid("Erro ao carregar dados do AsyncStorage:", ToastAndroid.SHORT);
                setExistePedido(false);
            };
        };
        carregarDados();
    }, [n_pedido]);

    useEffect(() => {
        async function buscarPedidosCliente() {
            try {
                const resposta = await apiLocal.get('/BuscarPedidosCliente', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setDadosPedido(resposta.data);
            } catch (err) {
                console.log(err);
                ToastAndroid(err, ToastAndroid.SHORT);
            };
        };
        buscarPedidosCliente();
        // eslint-disable-next-line
    }, [dados]);

    async function adCarrinho(id1) {
        if (!dados) return;

        if (dados.id !== id1) {
            console.log('Produto não corresponde.');
            return;
        };

        const quantidade = Number(quant);
        const valor = Number(dados.preco * quant);
        const id_produto = String(dados.id);

        if (!existePedido) {
            try {
                const resposta = await apiLocal.post('/RealizarPedidos', {
                    id_usuario,
                    id_produto,
                    valor,
                    quantidade,
                });

                await AsyncStorage.setItem('@npedido', JSON.stringify(resposta.data.n_pedido));
                await AsyncStorage.setItem('@id_pedido', JSON.stringify(resposta.data.id));
                setNPedido(resposta.data.n_pedido);
                setExistePedido(true);
                ToastAndroid.show('Carrinho Criado Com Sucesso', ToastAndroid.SHORT);
                navigation.navigate("DrawerAuth");
            } catch (err) {
                console.log("Erro ao adicionar item:", err);
                ToastAndroid("Erro ao adicionar item:", ToastAndroid.SHORT);
            };
        } else {
            try {
                const idPedido = await AsyncStorage.getItem('@id_pedido');
                const id_carrinho = JSON.parse(idPedido);

                const resposta = await apiLocal.post('/AdicionarItensPedidos', {
                    id_produto,
                    id_carrinho,
                    valor,
                    quantidade,
                });

                navigation.navigate("DrawerAuth");
                ToastAndroid.show(resposta.data.dados, ToastAndroid.SHORT);
            } catch (err) {
                console.log("Erro ao adicionar item:", err);
                ToastAndroid("Erro ao adicionar item:", ToastAndroid.SHORT);
            };
        };
    };

    function dimQuant() {
        if (quant < 2) {
            return
        } else {
            setQuant(quant - 1)
        }
    }
    
    function aumQuant() {
        setQuant(quant + 1)
    }

    return (
        <>
            <SafeAreaView style={styles.container}>
                <View style={styles.card}>
                    <Image
                        style={styles.imageProd}
                        source={{ uri: `http://10.0.2.2:3333/files/${banner}` }}
                    />
                    <Text style={styles.texto}>{nome}</Text>
                    <Text style={styles.texto}>{descricao}</Text>
                    <Text style={styles.texto}>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(preco * quant)}</Text>
                    <View style={styles.quant}>
                        <TouchableOpacity>
                            <Text style={styles.botaoQuant} onPress={dimQuant}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.textoQuant}>
                            {quant}
                        </Text>
                        <TouchableOpacity>
                            <Text style={styles.botaoQuant} onPress={aumQuant}>+</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.botaoCar} onPress={() => {
                        adCarrinho(idT);
                    }}>
                        <Text style={styles.botaoCarText}>Adicionar ao Carrinho</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </>
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
    card: {
        alignItems: 'flex-start',
        marginTop: 20,
    },
    titleConfPed: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000'
    },
    textConfPed: {
        marginTop: 20,
        fontSize: 18,
        color: '#000'
    },
    imageProd: {
        marginBottom: 10,
        borderRadius: 10,
        height: 300,
        width: 300,
        backgroundColor: '#000',
    },
    botoes: {
        marginTop: 200,
    },
    texto: {
        marginVertical: 5,
        fontWeight: 'bold',
        fontSize: 16,
        color: '#000',
    },
    quant: {
        flexDirection: 'row',
        fontWeight: 'bold',
        fontSize: 24,
        color: '#000',
    },
    botaoQuant: {
        paddingHorizontal: 10,
        marginVertical: 5,
        borderRadius: 10,
        fontWeight: 'bold',
        fontSize: 24,
        backgroundColor: '#BDBDBD',
        color: '#000',
    },
    textoQuant: {
        flexDirection: 'row',
        margin: 5,
        marginHorizontal: 15,
        width: 70,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 24,
        color: '#000',
    },
    botaoCar: {
        marginTop: 20,
        padding: 20,
        borderRadius: 40,
        width: '100%',
        backgroundColor: '#FFA600',
    },
    botaoCarText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15,
        color: '#000',
    },
});
