import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import axios from 'axios';

import image from './cryptocurrency.png'
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;
const Image = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;
const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after{
    content: '';
    width: 230px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
  }
`;


function App() {

  const [moneda, guardarMoneda] = useState('')
  const [crypto, guardarCrypto] = useState('')
  const [resultado, guardarResultado] = useState({})
  const [cargando, guardarCargando] = useState(false)

  useEffect(() => {

    // consultar la API para obtener la cotizacion
    const cotizarCrypto = async () => {
      // evitar la ejecucion la 1º vez
      if (moneda === '') return

      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypto}&tsyms=${moneda}`
      const resultado = await axios.get(url)

      // mostrar Spinner
      guardarCargando(true)

      // ocultar spinner y mostrar resultado
      setTimeout(() => {
        // cambiar el estado de cargando
        guardarCargando(false)

        // guardar cotizacion
        guardarResultado(resultado.data.DISPLAY[crypto][moneda])
      }, 3000);

    }
    cotizarCrypto()
  }, [moneda, crypto])

  const CCC = (cargando) ? <Spinner /> : <Cotizacion resultado={resultado} />

  return (
    <Contenedor>
      <div>
        <Image
          src={image}
          alt="image crypto"
        />
      </div>
      <div>
        <Heading>Crypto Prices</Heading>

        <Formulario
          guardarMoneda={guardarMoneda}
          guardarCrypto={guardarCrypto}
        />

        {CCC}

      </div>
    </Contenedor>
  );
}

export default App;
