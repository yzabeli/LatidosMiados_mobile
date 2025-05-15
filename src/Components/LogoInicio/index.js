import {
    StyleSheet,
    View,
    Image,
} from 'react-native';

export default function LogoInicio() {
    return (
        <View style={styles.logoCard}>
            <Image
                style={styles.logo}
                source={require('../../Assets/Logo-Pax.png')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    logoCard: {
        alignItems: 'center',
    },
    logo: {
        margin: 50,
        height: 50,
        width: 140,
    },
});