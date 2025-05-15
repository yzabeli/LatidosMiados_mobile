import React, { useContext } from 'react';
import { AutenticadoContexto } from '../Contexts/authContexts'

import NaoAutenticados from './noAuth.routes';
import Autenticados from './auth.routes';

export default function Rotas() {
    const { autenticado } = useContext(AutenticadoContexto);
    // const autenticado = false;

    return (
        autenticado === true ? <Autenticados /> : <NaoAutenticados />
    );
};