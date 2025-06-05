import { createContext, useState } from "react";
import apiLocal from "../Api/apiLocal";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AutenticadoContexto = createContext();

export default function AuthProvider({ children }) {
    const [tokenT, setTokenT] = useState(false);
    const [token, setToken] = useState('');

    const autenticado = !!tokenT;

    async function verificarToken() {
        const iToken = await AsyncStorage.getItem('@token');
        // console.log(iToken);
        if (!iToken) {
            setTokenT(false);
            return;
        };
        const tokenU = JSON.parse(iToken);
        setToken(tokenU);
        try {
            const resposta = await apiLocal.get('/VerificaToken', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (resposta.data.id) {
                setTokenT(true);
                await AsyncStorage.setItem('@id', JSON.stringify(resposta.data.id));
                await AsyncStorage.setItem('@nome', JSON.stringify(resposta.data.nome));
            };
        } catch (err) {
            toast.error(err.response.data.error);
        };
    };

    async function loginEntrada(email, password) {
        try {
            const resposta = await apiLocal.post('/LoginUsuarios', {
                email,
                password
            });
            await AsyncStorage.setItem('@id', JSON.stringify(resposta.data.id));
            await AsyncStorage.setItem('@token', JSON.stringify(resposta.data.token));
            await AsyncStorage.setItem('@nome', JSON.stringify(resposta.data.nome));
            setTokenT(true);
            console.log(tokenT)
        } catch (err) {
            toast.error(err.response.data.error);
        };
    };

    const logout = async () => {
        await AsyncStorage.clear();
        setTokenT(false);
    };

    return (
        <AutenticadoContexto.Provider value={({ autenticado, loginEntrada, verificarToken, token, logout })}>
            {children}
        </AutenticadoContexto.Provider>
    );
};