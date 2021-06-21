import React from 'react'
import styled from '@emotion/styled'

const MsjError = styled.p`
    background-color: #B7322c;
    padding: 1rem;
    color: #FFF;
    text-transform: uppercase;
    font-size: 30px;
    font-weight: bold;
    font-family: 'Bebas Neue', cursive;
    text-align: center;
`;

const Error = ({mensaje}) => {
    return (
        <MsjError>{mensaje}</MsjError>
    )
}

export default Error
