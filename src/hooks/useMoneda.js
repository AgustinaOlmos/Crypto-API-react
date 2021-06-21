import React, { Fragment, useState } from 'react';
import styled from '@emotion/styled';

const Label = styled.label`
    font-family: 'Bebas Neue', cursive;
    color: #FFF;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2.4rem;
    margin-top: 2rem;
    display: block;
`;

const Select = styled.select`
    width: 100%;
    display: block;
    padding: 1rem;
    -webkit-appearance: none;
    border-radius: 10px;
    border: none;
    font-size: 1.2rem;
`;

const useMoneda = (label, stateInicial, options) => {

    // State del custom hook
    const [state, actualizarState] = useState(stateInicial)

    const SelectMonedas = () => (
        <Fragment>
            <Label>{label}</Label>
            <Select
                onChange={e => actualizarState(e.target.value)}
                value={state}
            >
                <option value="">- Seleccionar -</option>
                {options.map(option => (
                    <option key={option.codigo} value={option.codigo}>{option.nombre}</option>
                ))}
            </Select>
        </Fragment>
    )

    // Retorna state, interfaz y fn que modifca el state
    return [state, SelectMonedas, actualizarState]
}

export default useMoneda