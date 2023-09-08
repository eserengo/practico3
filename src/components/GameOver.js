
/* eslint-disable react-hooks/exhaustive-deps */

import { useRef, useEffect } from "react"
import PropTypes from "prop-types"

const GameOver = ({ state, handler }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    modalRef.current.showModal();
  }, [])

  //Este elemento tambien tipo modal, muestra quien es el ganador del juego y da opciones al usuario para reiniciarlo.
  return (
    <dialog className={"modal"} ref={modalRef} onCancel={(event) => { event.preventDefault() }}>
      <h3>Game Over</h3>
      <h2>
        {state.playerOne.score === 3 && <span>Felicitaciones, gano {state.playerOne.alias}!</span>}
        {state.playerTwo.score === 3 && <span>Que pena, gano {state.playerTwo.alias}!</span>}
      </h2>
      <button type={"button"} onClick={() => { handler(); modalRef.current.close() }}>Reiniciar el juego</button>
    </dialog>
  )
}

GameOver.propTypes = {
  state: PropTypes.object,
  handler: PropTypes.func,
}

export default GameOver;