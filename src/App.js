/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Ready from './components/Ready'
import PlayerOne from './components/PlayerOne'
import PlayerTwo from './components/PlayerTwo'
import GameOver from './components/GameOver'
import './App.css'

// Primero los estilos con styled-components.
const Header = styled.header`
text-align: center;
padding: 2vh 2vw;
border: 2px solid var(--azul);
border-radius: 8px;
background-color: var(--blanco);
`;

const Title = styled.h1`
font-size: 1.25rem;
font-weight: 400;
color: var(--azul);

@media screen and (width > 376px) {
  font-size: 4vw;
}
`;

const Main = styled.main`
position: relative;
display: grid;
grid-template-colums: 100%;
grid-template-rows: repeat(2, calc(77% / 2)) 23%;

@media screen and (width > 376px) {
  grid-template-columns: repeat(2, 50%);
  grid-template-rows: 70% 30%;
`;

const Vs = styled.span`
text-transform: uppercase;
font-size: 5vw;
font-weight: 400;
border: 2px solid var(--azul);
border-radius: 50%;
padding: 1rem;
position: absolute;
color: var(--azul);
background-color: var(--amarillo);
z-index: 1;
top: 50%;
left: 50%;
transform: translate(-50%, -150%);

@media screen and (width > 376px) {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -100%);
}
`;

const Footer = styled.footer`
text-align: center;
padding: 2vh 2vw;
border: 2px solid var(--azul);
border-radius: 8px;
background-color: var(--blanco);
`;

const Message = styled.h2`
color: var(--rojo);
font-weight: 400;
font-size: 1.25rem;

@media screen and (width > 376px) {
  font-size: 3vw;
}
`;

// El componente principal, los demas componentes son descendientes de este. Maneja el estado de la App y lo pasa a sus hijos, 
// (junto a la funcion correspondiente para actualizarlo) a traves de props. 
const App = () => {

  // Este objeto representa el estado inicial de la App, se carga en el siguiente hook.
  const initialState = {
    msg: '',
    playerOne: {
      alias: '',
      isValidated: false,
      key: '123',
      play: '',
      score: 0,
    },
    playerTwo: {
      alias: 'La Compu',
      key: '123',
      play: '',
      score: 0,
    },
    round: 1,
  }

  // Estado
  const [state, setState] = useState(initialState);

  // Este hook se ejecuta cada vez que el usuario y la computadora eligen sus manos.
  useEffect(() => {
    Helpers.roundWinner((state.playerOne.play).slice(0, -3), (state.playerTwo.play).slice(0, -3));
  }, [state.playerOne.play && state.playerTwo.play])

  // En este objeto estan almacenadas todas las funciones que se van a ejecutar en la App, se crea solo por cuestion de
  // organizacion. La mayoria son funciones que actualizan el estado, usando el estado anterior como parametro.
  const Helpers = {

    // Esta funcion actualiza el estado con el nombre ingresado por el usuario, valindandolo.
    setPlayerOneAlias: (prevState, value) => {
      setState({
        ...prevState,
        playerOne: {
          ...prevState.playerOne,
          alias: value,
          isValidated: true,
        },
      });
    },

    // Esta funcion actualiza el estado con la jugada seleccionada por el usuario.
    setPlayerOnePlay: (prevState, value) => {
      setState({
        ...prevState,
        playerOne: {
          ...prevState.playerOne,
          key: Math.random().toString().slice(-3),
          play: value + prevState.playerOne.key,
        },
      });
    },

    // Esta funcion actualiza el estado con la jugada de la computadora.
    setPlayerTwoPlay: (prevState, value) => {
      setState({
        ...prevState,
        playerTwo: {
          ...prevState.playerTwo,
          key: Math.random().toString().slice(-3),
          play: value + prevState.playerTwo.key,
        },
      });
    },

    // Esta funcion devuelve un mensaje aleatorio.
    reRandom: () => {
      const msgOptions = ['Esto se pone interesante...', 'Que suerte!', 'Ya se define...', 'Vamos todavia!'];
      return msgOptions[Math.floor(Math.random() * msgOptions.length)];
    },

    // Esta funcion se ejecuta si la mano del usuario y de la computadora es la misma.
    tie: (prevState) => {
      setState({
        ...prevState,
        msg: `Ronda ${state.round}: empate. Todo sigue igual.`,
      })
    },

    // Esta funcion se ejecuta si el usuario tiene la mano ganadora.
    pointForPlayerOne: (prevState) => {
      setState({
        ...prevState,
        msg: `Ronda ${state.round}: gana ${state.playerOne.alias}. ` + Helpers.reRandom(),
        playerOne: {
          ...prevState.playerOne,
          score: prevState.playerOne.score + 1,
        },
        round: prevState.round + 1,
      })
    },

    // Esta funcion se ejecuta si la computadora tiene la mano ganadora.
    pointForPlayerTwo: (prevState) => {
      setState({
        ...prevState,
        msg: `Ronda ${state.round}: gana ${state.playerTwo.alias}. ` + Helpers.reRandom(),
        playerTwo: {
          ...prevState.playerTwo,
          score: prevState.playerTwo.score + 1,
        },
        round: prevState.round + 1,
      })
    },

    // Esta funcion se ejecuta para reiniciar el juego.
    restart: () => {
      setState(initialState);
    },

    // Esta funcion calcula el ganador de cada ronda.
    roundWinner: (p1, p2) => {
      if (!p1 || !p2) {
        return null;
      } else {
        if (p1 === p2) {
          Helpers.tie(state);
          return;
        } else if (
          (p1 === 'rock' && p2 === 'scissors') ||
          (p1 === 'paper' && p2 === 'rock') ||
          (p1 === 'scissors' && p2 === 'paper')
        ) {
          Helpers.pointForPlayerOne(state);
          return;
        } else {
          Helpers.pointForPlayerTwo(state);
          return;
        }
      }
    },
  }

  // El HTML que renderiza el componente.
  return (
    <>
      {
        !state.playerOne.alias
          ? <Ready state={state} helper={Helpers.setPlayerOneAlias} />
          : state.playerOne.score < 3 && state.playerTwo.score < 3
            ? <>
              <Header>
                <Title>Piedra, Papel o Tijeras</Title>
              </Header>
              <Main>
                <PlayerOne state={state} helper={Helpers.setPlayerOnePlay} />
                {(state.playerOne.play && state.playerTwo.play) && <Vs>vs</Vs>}
                <PlayerTwo state={state} helper={Helpers.setPlayerTwoPlay} />
              </Main>
              <Footer>
                <Message>{state.msg}</Message>
              </Footer>
            </>
            : <GameOver state={state} helper={Helpers.restart} />
      }
    </>
  );
} 

export default App;
