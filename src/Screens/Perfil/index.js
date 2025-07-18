import React, { useContext, useEffect, useState } from 'react';
import {
    StyleSheet,
    Image,
    View,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import { AutenticadoContexto } from '../../Contexts/authContexts';
import apiLocal from '../../Api/apiLocal';

export default function Perfil() {
    const { verificarToken, token } = useContext(AutenticadoContexto);
    verificarToken();

    const navigation = useNavigation();

    const [dadosUser, setDadosUser] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function carregarPerfil() {
            try {
                await verificarToken();

                const idT = await AsyncStorage.getItem('@id');
                const parsedId = JSON.parse(idT);

                if (parsedId && token) {
                    const response = await apiLocal.post(
                        '/ConsultarUsuariosUnico',
                        { id: parsedId },
                        { headers: { Authorization: `Bearer ${token}` } }
                    );

                    setDadosUser([response.data]);
                }
            } catch (err) {
                console.error('Erro ao carregar perfil:', err);
            } finally {
                setLoading(false);
            }
        }
        carregarPerfil();
    }, [token]);

    if (loading) {
        return (
            <View style={styles.div}>
                <Text style={{ color: '#fff', margin: 20 }}>Carregando...</Text>
            </View>
        );
    }

    return (
        <View style={styles.div}>
            <FlatList
                data={dadosUser}
                keyExtractor={(index) => String(index)}
                renderItem={({ item }) => (
                    <View style={styles.infoUser}>
                        <Image
                            style={styles.image}
                            source={
                                item.foto ?
                                    { uri: `http://10.0.2.2:3333/files/${item.foto}` }
                                    :
                                    require('../../Assets/unknown-user.jpg')
                            }
                        />
                        <Text style={styles.name}>
                            {item.nome || ''}
                        </Text>
                        <TextInput
                            style={styles.campo}
                            value={item.email || ''}
                            editable={false}
                        />
                    </View>
                )}
            />
            <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate("UpdUsuario")}>
                <Text style={styles.texto}>Atualizar Dados</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    div: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    infoUser: {
        alignItems: 'center',
        marginTop: 20,
    },
    image: {
        height: 150,
        width: 150,
        borderRadius: 100,
        marginBottom: 20,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 24,
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
        backgroundColor: '#d9d9d9',
    },
    texto: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15,
        color: '#000',
    },
});
