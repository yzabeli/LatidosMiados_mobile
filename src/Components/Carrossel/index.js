import {
    StyleSheet,
    FlatList,
    View,
    Image,
} from 'react-native';

import { animais } from '../../Assets'

export default function Carrosel() {
    return (
        <FlatList
            data={animais}
            keyExtractor={item => String(item.id)}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carouselContainer}
            renderItem={({ item }) => (
                <View style={styles.card}>
                    <Image
                        style={styles.imageProd}
                        source={item.img} // imagem já está pronta
                    />
                </View>
            )}
        />
    );
};

const styles = StyleSheet.create({
    carouselContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
        gap: 10,
    },
    card: {
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#BDBDBD',
        marginBottom: 10,
    },
    imageProd: {
        borderRadius: 10,
        height: 300,
        width: 200,
        backgroundColor: '#000',
    },
});
