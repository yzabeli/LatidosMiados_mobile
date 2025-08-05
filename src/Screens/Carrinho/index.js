import React, { useState, useEffect, useContext } from 'react';
import {
    StyleSheet,
    Platform,
    SafeAreaView,
    FlatList,
    View,
    TouchableOpacity,
    Text,
    Image,
    Dimensions,
    ToastAndroid,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { AutenticadoContexto } from '../../Contexts/authContexts';
import apiLocal from '../../Api/apiLocal';


export default function Carrinho() {
    const { verificarToken, token } = useContext(AutenticadoContexto);
    verificarToken();

    const navigation = useNavigation();

    const larguraTela = Dimensions.get('window').width;

    const [dados, setDados] = useState({});

    const [dadosPedido, setDadosPedido] = useState(['']);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function buscarPedidosCliente() {
            try {
                const resposta = await apiLocal.get('/BuscarPedidosCliente', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setDados(resposta.data[0]);
            } catch (err) {
                // console.log(err);
                // ToastAndroid(err, ToastAndroid.SHORT);
            };
        };
        buscarPedidosCliente();
        // eslint-disable-next-line
    }, [token]);

    useEffect(() => {
        async function VisualizaPedidos() {
            try {
                const id = dados.id;
                if (!id) return;
                const resposta = await apiLocal.post('/visualizaPedidoClienteUnico', {
                    id
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (resposta.data.id) {
                    setDadosPedido(resposta.data);
                }
            } catch (err) {
                // console.log(err);
                // ToastAndroid(err, ToastAndroid.SHORT);
            } finally {
                setLoading(false);
            };
        };
        VisualizaPedidos();
        // eslint-disable-next-line
    }, [dados]);

    async function finalizarCarrinho(idCarrinho) {
        try {
            const resposta = await apiLocal.put('/FinalizarCarrinho',
                { id: idCarrinho },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            ToastAndroid.show('Pedido Finalizado', ToastAndroid.SHORT);
        } catch (error) {
            console.error('Erro ao finalizar carrinho:', error.response?.data || error.message);
        };
        
        try {
            await apiLocal.delete(`/ApagarCarrinho/${idCarrinho}`,
                { id: idCarrinho },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            navigation.navigate("FinalizaCarrinho");
        } catch (error) {
            console.error('Erro ao finalizar carrinho:', error.response?.data || error.message);
        };
    };

    async function apagarItensCarrinho(iddT) {
        try {
            await apiLocal.delete(`/ApagarItensCarrinho/${iddT}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            ToastAndroid.show('Item apagado com sucesso', ToastAndroid.SHORT);

            const id = dados.id;
            if (!id) return;
            const resposta = await apiLocal.post('/visualizaPedidoClienteUnico', { id }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (resposta.data.id) {
                setDadosPedido(resposta.data);
            }
        } catch (err) {
            console.log(err)
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
        <>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={dadosPedido?.itens?.filter(item => item?.produtos)}
                    keyExtractor={(item, index) => `${item.id}-${index}`}
                    renderItem={({ item }) => {
                        return (
                            <>
                                <View style={[styles.card, { width: larguraTela }]}>
                                    <Image
                                        style={styles.imageProd}
                                        source={{ uri: `http://10.0.2.2:3333/files/${item.produtos?.banner}` }}
                                    />
                                    <View style={styles.campoTexto}>
                                        <Text key={item.id} style={styles.texto}>{item.produtos?.nome}</Text>
                                        <Text style={styles.texto}>
                                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valor)}
                                        </Text>
                                    </View>
                                </View>
                                <TouchableOpacity style={styles.botao} onPress={() => apagarItensCarrinho(item.id)}>
                                    <Text style={styles.textoBotao}>Apagar Item</Text>
                                </TouchableOpacity>
                            </>
                        )
                    }}
                />
                {dadosPedido.itens
                    &&
                    <TouchableOpacity
                        style={styles.botao}
                        onPress={() => finalizarCarrinho(dados.id, token)}
                    >
                        <Text style={styles.textoBotao}>Finalizar Pedido</Text>
                    </TouchableOpacity>
                }
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
        flex: 1,
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
        maxWidth: '98%',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#BDBDBD',
    },
    imageProd: {
        marginBottom: 10,
        borderRadius: 10,
        height: 70,
        width: 70,
    },
    campoTexto: {
        maxWidth: '60%',
        fontWeight: 'bold',
        fontSize: 16,
        color: '#000',
    },
    texto: {
        fontWeight: 'bold',
        fontSize: 16,
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
