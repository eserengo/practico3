/* eslint-disable react-hooks/exhaustive-deps */
import styled, { keyframes } from 'styled-components'
import rock from '../assets/rock.png'
import paper from '../assets/paper.png'
import scissors from '../assets/scissors.png'
import PropTypes from 'prop-types'

// Primero los estilos con styled-components.
const Pulse = keyframes`
from {
  transform: scale(1.2);
}
to {
  transform: scale(0.9);
}
`;

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
grid-row: 1;
border: 2px solid var(--azul);
border-radius: 8px;
background-color: var(--blanco);
width: 100%;
display: flex;
flex-direction: column;
flex-wrap: nowrap;
align-items: center;
justify-content: space-around;
padding: 1vh 2vw 6vh;

@media screen and (width > 376px) {
  padding: 1vh 6vw;
}
`;

const Aside = styled.aside`
position: relative;
grid-column: 1;
grid-row: 3;
display: flex;
flex-flow: column nowrap;
align-items: center;
justify-content: center;
border: 2px solid var(--azul);
border-radius: 8px;
background-color: var(--blanco);
padding: 2vh 2vw 4vh;

@media screen and (width > 376px) {
  flex-direction: row;
  grid-column: 1 / span 2;
  grid-row: 2;
  gap: 2vw;
  min-height: 15vh;
  padding: 2vh 2vw;
}
`;

const Wrapper = styled.div`
display: flex;
flex-flow: row nowrap;
align-items: center;
gap: 1rem;
`;

const Icon = styled.img`
width: max(6vw, 3rem);
border-radius: 50%;
background-color: transparent;
aspect-ratio: 3/3;
transition: all 1.6s ease;

&:hover {
  animation: ${Pulse} 1.6s linear 0s normal infinite;
  cursor: pointer;
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

// El componente que representa al usuario.
const PlayerOne = ({ state, helper }) => {

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

  // Este componente crea las imagenes en los que el usuario puede seleccionar su mano.
  const CreateHands = () => (
    <Aside>
      <Subtitle>Seleccione su mano:</Subtitle>
      <Wrapper>
        {DATA
          .map((item, index) => {
            return (
              <Icon key={`p1_preview_${index}`} src={Object.values(item.src)} alt={item.alt}
                onClick={(event) => helper(state, event.target.alt)} />
            )
          })
        }
      </Wrapper>
    </Aside>
  )

  // Muestra la imagen de la mano del usuario.
  const DisplayHand = () => (
    DATA
      .map((item, index) => {
        return (
          (state.playerOne.play).slice(0, -3) === item.alt &&
          <Hand key={`p1_hand_${index}`} src={Object.values(item.src)} alt={item.alt} />
        )
      }
    )
  )

  // El HTML que renderiza el componente.
  return (
    <>
      <Section>
        <Subtitle>{state.playerOne.alias}</Subtitle>
        <DisplayHand />
        <Subtitle>score: {state.playerOne.score}</Subtitle>
      </Section>
      <CreateHands />
    </>
  );
}

PlayerOne.propTypes = {
  state: PropTypes.object,
  helper: PropTypes.func,
}

export default PlayerOne;
