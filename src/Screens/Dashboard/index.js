import React, { useContext } from 'react';
import { AutenticadoContexto } from '../../Contexts/authContexts';
import {
    StyleSheet,
    FlatList,
    Platform,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { animais } from '../../Assets';

import CardProdutos from '../../Components/CardProdutos';

export default function Produtos() {
    const { verificarToken, logout } = useContext(AutenticadoContexto);
    verificarToken();

    const insets = useSafeAreaInsets();

    return (
        <>
            <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
                <View style={styles.header}>
                    <Text style={styles.texto}>Dashboard</Text>
                </View>
                <View style={styles.card}>
                    <FlatList
                        data={animais}
                        keyExtractor={item => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.carouselContainer}
                        renderItem={({ item }) => {
                            return(
                            <View style={styles.card}>
                                <Image
                                    style={styles.image}
                                    source={item.img}
                                />
                            </View>
                        )}}
                    />
                </View>
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
    header: {
        width: '80%',
    },
    texto: {
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: 15,
        color: '#000',
    },
    carouselContainer: {
        paddingHorizontal: 10,
        paddingBottom: 20,
    },
    card: {
        margin: 10,
        // width: '80%'
    },
    image: {
        height: '40%',
        width: 120,
    },
});