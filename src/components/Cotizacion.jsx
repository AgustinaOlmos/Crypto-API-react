import React from 'react';
import styled from '@emotion/styled';

const ResultadoDiv = styled.div`
    color: #FFF;
    font-family: Calibri;
`
const Precio = styled.p`
    font-size: 30px;
    span{
        font-weight: bold
    }
`
const Info = styled.p`
    font-size: 20px;
    span{
        font-weight: bold;
    };
`

const Cotizacion = ({ resultado }) => {
    if (Object.keys(resultado).length === 0) return null

    console.log(resultado)

    return (
        <ResultadoDiv>
            <Precio>Precio: <span>{resultado.PRICE}</span></Precio>
            <Info>Precio más Alto del dia: <span>{resultado.HIGHDAY}</span></Info>
            <Info>Precio más Bajo del dia: <span>{resultado.LOWDAY}</span></Info>
            <Info>Variacion 24hs: <span>{resultado.CHANGEPCT24HOUR}</span></Info>
            <Info>Ultima Actualizacion: <span>{resultado.LASTUPDATE}</span></Info>
        </ResultadoDiv>
    )
}

export default Cotizacion
