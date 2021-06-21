import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';

import Error from './Error';
import useMoneda from '../hooks/useMoneda';
import useCrypto from '../hooks/useCrypto';

const Button = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66A2FE;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;

    &:hover{
        background-color: #326AC0;
        cursor: pointer;
    }
`;

const Formulario = ({ guardarMoneda, guardarCrypto }) => {

    // state del listado de cryptos
    const [listacryptos, guardarCryptos] = useState([])

    // state de Error
    const [error, guardarError] = useState(false)

    const Divisas = [
        { codigo: 'USD', nombre: 'Dolar EEUU' },
        { codigo: 'EUR', nombre: 'Euro' },
        { codigo: 'JPY', nombre: 'Yen Japones' },
        { codigo: 'GBP', nombre: 'Libra Esterlina' },
        { codigo: 'ARS', nombre: 'Peso Argentino' }
    ]

    // Utilizar useMoneda
    const [moneda, SelectMonedas] = useMoneda('Elige Tu Moneda', '', Divisas)

    // Utilizar useCrypto
    const [crypto, SelectCrypto] = useCrypto('Elige tu Crypto', '', listacryptos)

    // Ejecutar llamado a la API
    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'

            const resultado = await axios.get(url)

            guardarCryptos(resultado.data.Data)
        }
        consultarAPI()
    }, [])

    // Cuando el usuario hace submit
    const cotizarMoneda = e => {
        e.preventDefault()

        // validar si ambos campos estan llenos
        if (moneda === '' || crypto === '') {
            guardarError(true)
            return;
        }

        // pasar los datos al componente principal
        guardarError(false)
        guardarMoneda(moneda)
        guardarCrypto(crypto)
    }



    return (
        <form
            onSubmit={cotizarMoneda}
        >
            {error ? <Error mensaje="Todos los campos son obligatorios" /> : null}

            <SelectMonedas />
            <SelectCrypto />
            <Button
                type="submit"
                value="Calculate"
            />

        </form>
    )
}

export default Formulario
