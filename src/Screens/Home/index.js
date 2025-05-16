import React, { useContext } from 'react';
import { AutenticadoContexto } from '../../Contexts/authContexts';
import {
  StyleSheet,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ImageBackground
} from 'react-native';
import { useNavigation } from '@react-navigation/native'

export default function HomeScreen() {
  const { verificarToken } = useContext(AutenticadoContexto);
  verificarToken();

  const navigation = useNavigation();

  function navCad() {
    navigation.navigate("CadastroUsuario");
  };

  function navLogin() {
    navigation.navigate("LoginUsuario");
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={require('../../Assets/image_bg.png')}
          resizeMode="cover"
          style={styles.image}
        >
          <View style={styles.botoes}>
            <TouchableOpacity style={styles.botao} onPress={navCad}>
              <Text style={styles.texto}>Começar</Text>
            </TouchableOpacity>
            <Text style={styles.texto}>
              Já tem uma conta?
            </Text>
            <TouchableOpacity style={styles.botaoSec} onPress={navLogin}>
              <Text style={styles.texto}>Entrar</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? '15' : 0,
    backgroundColor: '#000',
    fontFamily: "Inter"
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    margin: 50,
    height: 50,
    width: 140,
  },
  botoes: {
    marginTop: 400,
  },
  botao: {
    margin: 20,
    padding: 20,
    borderRadius: 40,
    width: 200,
    backgroundColor: '#D9D9D9',
    opacity: 0.6
  },
  texto: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    color: '#000',
  },
  botaoSec: {
    margin: 20,
    padding: 2,
    borderRadius: 40,
    width: 200,
    borderWidth: 2,
    borderColor: '#000',
    backgroundColor: '#D9D9D9',
    opacity: 0.6
  },
});