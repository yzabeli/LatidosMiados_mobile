import React, { useState, useContext } from 'react';

import { AutenticadoContexto } from '../../Contexts/authContexts';
import CadUserInicioCont from '../../Containers/Cadastro/Usuario';


export default function CadUserInicio() {
    const { verificarToken } = useContext(AutenticadoContexto);
    verificarToken();

    return (
        <>
            <CadUserInicioCont />
        </>
    );
};