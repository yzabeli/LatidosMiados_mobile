import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';

import apiLocal from '../../Api/apiLocal';

export default function CardProdutos() {
    const [dadosProdutos, setDadosProdutos] = useState(['']);

    useEffect(() => {
        try {
            async function consultarDadosProdutos() {
                const response = await apiLocal.get('/ConsultarProdutos');
                setDadosProdutos(response.data);
            };
            consultarDadosProdutos();
        } catch (err) {
            alert(err.response.data.error)
        };
    }, [dadosProdutos]);

    return (
        <View style={styles.divs}>
            {dadosProdutos.map((item, index) => {
                return (
                    <View style={styles.card} key={index}>
                        <Image
                            style={styles.imageProd}
                            source={require('../../Assets/Icone1.png')}
                        />
                        <Text key={item.id} style={styles.textoO}>{item.nome}</Text>
                        <Text style={styles.textoO}>
                            {item.preco}
                        </Text>
                        <TouchableOpacity style={styles.botao}>
                            <Text style={styles.texto}>Adicionar ao carrinho</Text>
                        </TouchableOpacity>
                    </View>
                )
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    divs: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    card: {
        alignItems: 'center',
        margin: 20,
        padding: 30,
        borderWidth: 3,
        borderRadius: 10,
        borderColor: '#FFA600',
        width: 300,
        backgroundColor: '#333',
    },
    imageProd: {
        margin: 10,
        height: 150,
        width: 150,
    },
    botao: {
        margin: 20,
        padding: 20,
        borderRadius: 40,
        width: 250,
        backgroundColor: '#FFA600',
    },
    texto: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15,
        color: '#000',
    },
    textoO: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15,
        color: '#fff',
    },
});