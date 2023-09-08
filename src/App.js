/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import Ready from './components/Ready'
import PlayerOne from './components/PlayerOne'
import PlayerTwo from './components/PlayerTwo'
import GameOver from './components/GameOver'
import './App.css'

const App = () => {

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

  const [state, setState] = useState(initialState);

  useEffect(() => {
    console.log((state.playerOne.play).slice(0, -3), (state.playerTwo.play).slice(0, -3));
    console.log(state.playerOne.key, state.playerTwo.key);
    roundWinner((state.playerOne.play).slice(0, -3), (state.playerTwo.play).slice(0, -3));
  }, [state.playerOne.play && state.playerTwo.play])


  const setPlayerOneAlias = (prevState, value) => {
    setState({
      ...prevState,
      playerOne: {
        ...prevState.playerOne,
        alias: value,
        isValidated: true,
      },
    });
  }

  const setPlayerOnePlay = (prevState, value) => {
    setState({
      ...prevState,
      playerOne: {
        ...prevState.playerOne,
        key: Math.random().toString().slice(-3),
        play: value + prevState.playerOne.key,
      },
    });
  }

  const setPlayerTwoPlay = (prevState, value) => {
    setState({
      ...prevState,
      playerTwo: {
        ...prevState.playerTwo,
        key: Math.random().toString().slice(-3),
        play: value + prevState.playerTwo.key,
      },
    });
  }

  const reRandom = () => {
    const msgOptions = ['Esto se pone interesante...', 'Que suerte!', 'Ya se define...', 'Vamos todavia!'];
    return msgOptions[Math.floor(Math.random() * msgOptions.length)];
  }

  const tie = (prevState) => {
    setState({
      ...prevState,
      msg: `Ronda ${state.round}: empate. Todo sigue igual.`,
    })
  }

  const pointForPlayerOne = (prevState) => {
    setState({
      ...prevState,
      msg: `Ronda ${state.round}: gana ${state.playerOne.alias}. ` + reRandom(),
      playerOne: {
        ...prevState.playerOne,
        score: prevState.playerOne.score + 1,
      },
      round: prevState.round + 1,
    })
  }

  const pointForPlayerTwo = (prevState) => {
    setState({
      ...prevState,
      msg: `Ronda ${state.round}: gana ${state.playerTwo.alias}. ` + reRandom(),
      playerTwo: {
        ...prevState.playerTwo,
        score: prevState.playerTwo.score + 1,
      },
      round: prevState.round + 1,
    })
  }

  const restart = () => {
    setState(initialState);
  }

  // Esta funcion calcula el ganador de cada ronda, generando un mensaje de resultado mas un mensaje random 
  // y actualiza las variables de ronda y score o no en caso de empate, segun lo requerido en la parte 4.
  const roundWinner = (p1, p2) => {

    if (!p1 || !p2) {
      return null;
    } else {
      if (p1 === p2) {
        tie(state);
        return;

      } else if (
        (p1 === 'rock' && p2 === 'scissors') ||
        (p1 === 'paper' && p2 === 'rock') ||
        (p1 === 'scissors' && p2 === 'paper')
      ) {
        pointForPlayerOne(state);
        return;
      
      } else {
        pointForPlayerTwo(state);
        return;
      }
    }
  }

  return (
    <>
      {
        !state.playerOne.alias
          ? <Ready state={state} handler={setPlayerOneAlias} />
          : state.playerOne.score === 3 || state.playerTwo.score === 3
            ? <GameOver state={state} handler={restart} />
            : <>
              <header>
                <h1>Piedra, Papel o Tijeras</h1>
              </header>
              <main>
                <PlayerOne state={state} handler={setPlayerOnePlay} />
                <PlayerTwo state={state} handler={setPlayerTwoPlay} />
              </main>
              <footer>
                {state.msg}
              </footer>
            </>
      }      
    </>
  );
}

export default App;
