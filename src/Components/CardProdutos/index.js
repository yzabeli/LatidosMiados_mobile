import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Image,
    FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'

import apiLocal from '../../Api/apiLocal';

export default function CardProdutos() {
    const [dadosProdutos, setDadosProdutos] = useState(['']);
    const navigation = useNavigation();

    useEffect(() => {
        try {
            async function consultarDadosProdutos() {
                const response = await apiLocal.get('/ConsultarProdutos');
                setDadosProdutos(response.data);
            };
            consultarDadosProdutos();
        } catch (err) {
            console.log(err.response.data.error);
        };
    }, []);

    return (
        <>
            <FlatList
                data={dadosProdutos}
                // data={dadosProdutos.slice(0, 5)}
                keyExtractor={item => String(item.id)}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.carouselContainer}
                renderItem={({ item }) => (
                    <View key={item.id} style={styles.card}>
                        <Image
                            style={styles.imageProd}
                            source={{ uri: `http://10.0.2.2:3333/files/${item.banner}` }}
                        />
                        <Text style={styles.texto}>{item.nome}</Text>
                        {
                            item.descricao === ''
                                ?
                                <Text style={styles.texto}>
                                </Text>
                                :
                                <Text style={styles.texto}>
                                    {item.descricao}
                                </Text>
                        }
                        <Text style={styles.texto}>
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.preco)}
                        </Text>
                        <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate("InfoProd", { id: item.id })}>
                            <Text style={styles.textoBotao}>COMPRE</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </>
    );
};

const styles = StyleSheet.create({
    carouselContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
        gap: 10,
    },
    card: {
        padding: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#BDBDBD',
        width: 150,
    },
    imageProd: {
        marginBottom: 10,
        borderRadius: 10,
        height: 120,
        width: 120,
        backgroundColor: '#000',
    },
    texto: {
        textAlign: 'center',
        height: 20,
        fontWeight: 'bold',
        fontSize: 15,
        color: '#000',
    },
    botao: {
        margin: 10,
        padding: 20,
        borderRadius: 40,
        width: '100%',
        backgroundColor: '#FFA600',
    },
    textoBotao: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15,
        color: '#000',
    },
});
