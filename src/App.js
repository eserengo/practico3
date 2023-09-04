/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import Ready from './components/Ready'
import PlayerOne from './components/PlayerOne'
import PlayerTwo from './components/PlayerTwo'
import './App.css'

const App = () => {

  const initialState = {
    playerOne: {
      alias: '',
      isValidated: false,
      play: '',
      score: 0,
    },
    playerTwo: {
      alias: 'La Compu',
      play: '',
      score: 0,
    },
    round: 1,
    msg: '',
  }

  const [state, setState] = useState(initialState);

  useEffect(() => {
    console.log(state);
    if (state.playerOne.play && state.playerTwo.play) {
      isWinner(state.playerOne.play, state.playerTwo.play);
    }
  }, [state.playerOne.play, state.playerTwo.play])


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
        play: value,
      },
    });
  }

  const setPlayerOneScore = (prevState, value) => {
    setState({
      ...prevState,
      playerOne: {
        ...prevState.playerOne,
        score: value,
      },
    });
  }

  const setPlayerTwoPlay = (prevState, value) => {
    setState({
      ...prevState,
      playerTwo: {
        ...prevState.playerTwo,
        play: value,
      },
    });
  }

  const setPlayerTwoScore = (prevState, value) => {
    setState({
      ...prevState,
      playerTwo: {
        ...prevState.playerTwo,
        score: value,
      },
    });
  }

  const setMessage = (prevState, value) => {
    setState({
      ...prevState,
      msg: value,
    });
  }

  const setRound = (prevState, value) => {
    setState({
      ...prevState,
      round: value,
    });
  }

  // Esta funcion calcula el ganador de cada ronda, generando un mensaje de resultado mas un mensaje random 
  // y actualiza las variables de ronda y score o no en caso de empate, segun lo requerido en la parte 4.
  const isWinner = (p1, p2) => {
    const reRandom = () => {
      const msgOptions = ['Esto se pone interesante...', 'Que suerte!', 'Ya se define...', 'Vamos todavia!'];
      return msgOptions[Math.floor(Math.random() * msgOptions.length)];
    }

    if (p1 === p2) {
      setMessage(state, `Ronda ${state.round}: empate. Todo sigue igual.`);
      return;

    } else if (
      (p1 === 'piedra' && p2 === 'tijeras') ||
      (p1 === 'papel' && p2 === 'piedra') ||
      (p1 === 'tijeras' && p2 === 'papel')
    ) {
      setPlayerOneScore(state, state.playerOne.score + 1);
      setRound(state, state.round + 1);
      setMessage(state, `Ronda ${state.round}: gana ${state.playerOne.alias}. ` + reRandom());
      return;
      
    } else {
      setPlayerTwoScore(state, state.playerTwo.score + 1);
      setRound(state, state.round + 1);
      setMessage(state, `Ronda ${state.round}: gana ${state.playerTwo.alias}. ` + reRandom());
      return;
    }
  }

  return (
    <>
      {
        !state.playerOne.alias
          ? <Ready state={state} handler={setPlayerOneAlias} />
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
