import React, { useContext, useEffect, useState } from 'react';
import {
    StyleSheet,
    Image,
    View,
    Text,
    TextInput,
    FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AutenticadoContexto } from '../../Contexts/authContexts';
import apiLocal from '../../Api/apiLocal';

export default function Perfil() {
    const { verificarToken, token } = useContext(AutenticadoContexto);

    const [id, setId] = useState(null);
    const [dadosUser, setDadosUser] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function carregarPerfil() {
            try {
                await verificarToken();

                const idT = await AsyncStorage.getItem('@id');
                const parsedId = JSON.parse(idT);
                setId(parsedId);

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
                keyExtractor={(item, index) => String(index)}
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
                        <TextInput
                            style={styles.campo}
                            value={item.nome || 'Sem nome'}
                            editable={false}
                        />
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    div: {
        flex: 1,
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
    campo: {
        margin: 20,
        padding: 20,
        borderRadius: 40,
        width: 300,
        backgroundColor: '#FFF',
    },
});