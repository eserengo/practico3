/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect } from 'react'
import styled from 'styled-components'
import trophy from '../assets/trophy.png'
import PropTypes from 'prop-types'

// Primero los estilos con styled-components.
const Modal = styled.dialog`
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
text-align: center;
border: 2px solid var(--rojo);
border-radius: 8px;
background-color: var(--blanco);
background-image: url(${trophy});
background-repeat: no-repeat;
background-size: 90% 90%;
background-position: center;
padding: 10vh 10vw;

@media screen and (width > 768px) {
  padding: 25vh 5vw;
}
`;

const Subtitle = styled.h2`
color: var(--rojo);
font-weight: 400;
font-size: 1.25rem;
`;

const Para = styled.p`
color: var(--rojo);
font-weight: 400;
font-size: 1rem;
margin-bottom: 0.5rem;
`;

const Button = styled.button`
font-family: 'Peralta';
font-size: min(4vw, 2rem);
color: var(--azul);
background-color: var(--blanco);
border: 1px solid var(--azul);
border-radius: 8px;
padding: 1rem 2rem;
margin-top: 1rem;
text-align: center;

&:hover {
  background-color: var(--azul);
  color: var(--blanco);
  cursor: pointer;
  box-shadow: 0px 2px 4px rgba(3, 3, 3, 0.5);
}
`;

// El componente que anuncia el final del juego, quien el el ganador y da la opcion de una nueva partida.
const GameOver = ({ state, helper }) => {
  const modalRef = useRef(null);

  // El modal se activa cuando se monta el componente.
  useEffect(() => {
    modalRef.current.showModal()
  }, [])

  // El HTML que renderiza el componente.
  return (
    <Modal ref={modalRef} onCancel={(event) => { event.preventDefault() }}>
      <Para>Game Over</Para>
      <Subtitle>
        {state.playerOne.score === 3 && <span>Felicitaciones, ganó {state.playerOne.alias}!</span>}
        {state.playerTwo.score === 3 && <span>Que pena, {state.playerTwo.alias} gana.</span>}
      </Subtitle>
      <Button type={'button'} onClick={() => { helper(); modalRef.current.close() }}>Reiniciar el juego</Button>
    </Modal>
  )
}

GameOver.propTypes = {
  state: PropTypes.object,
  helper: PropTypes.func,
}

export default GameOver;