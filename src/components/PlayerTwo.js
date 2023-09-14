/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import rock from '../assets/rock.png'
import paper from '../assets/paper.png'
import scissors from '../assets/scissors.png'
import PropTypes from 'prop-types'

// Primero los estilos con styled-components.
const Popup = keyframes`
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
`;

const Section = styled.section`
grid-column: 1;
grid-row: 2;
border: 2px solid var(--azul);
border-radius: 8px;
background-color: var(--blanco);
width: 100%;
display: flex;
flex-direction: column;
flex-wrap: nowrap;
align-items: center;
justify-content: space-around;
padding: 6vh 2vw 1vh;

@media screen and (width > 376px) {
  grid-column: 2;
  grid-row: 1;
  padding: 1vh 6vw;
}
`;

const Hand = styled.img`
width: max(12vw, 4rem);
border-radius: 50%;
background-color: transparent;
aspect-ratio: 3/3;
animation: ${Popup} 0.4s linear 0s normal 1;
`;

const Subtitle = styled.h2`
color: var(--azul);
font-weight: 400;
font-size: 1rem;
margin: 0.5rem 0rem;

@media screen and (width > 376px) {
  font-size: 2vw;
}
`;

// El componente que representa a la computadora.
const PlayerTwo = ({ state, helper }) => {

  // Array para representar las distintas opciones de mano.
  const DATA = [
    {
      alt: 'rock',
      src: { rock },
    },
    {
      alt: 'paper',
      src: { paper },
    },
    {
      alt: 'scissors',
      src: { scissors },
    }
  ];

  // Este hook genera la eleccion de la computadora de forma aleatoria.
  useEffect(() => {
    if (state.playerOne.play) {
      const availablePlays = DATA.map(item => item.alt);
      const generateRandom = Math.floor(Math.random() * availablePlays.length);
      helper(state, availablePlays[generateRandom]);
    }
  }, [state.playerOne.play])

  // Muestra la imagen de la mano de la computadora.
  const DisplayHand = () => (
    DATA
      .map((item, index) => {
        return (
          (state.playerTwo.play).slice(0, -3) === item.alt &&
            <Hand key={`p2_hand_${index}`} src={Object.values(item.src)} alt={item.alt} />
        )
      }
    )
  )

  // El HTML que renderiza el componente.
  return (
    <Section>
      <Subtitle>{state.playerTwo.alias}</Subtitle>
      <DisplayHand />
      <Subtitle>score: {state.playerTwo.score}</Subtitle>
    </Section>
  );
}

PlayerTwo.propTypes = {
  state: PropTypes.object,
  helper: PropTypes.func,
}

export default PlayerTwo;
