// El componente para establecer el nombre del jugador, con un bloque try catch que lanza excepciones si el
// usuario no ingresa un nombre o si el nombre ingresado es muy largo.
/* eslint-disable react-hooks/exhaustive-deps */

import { useRef, useEffect } from "react"
import PropTypes from "prop-types"

const Ready = ({ state, handler }) => {
  const modalRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    modalRef.current.showModal();
  }, [])

  const validate = (event) => {
    try {
      if (!inputRef.current.value || inputRef.current.value === ' ') {
        throw new Error('Oye... para jugar necesitas ingresar un nombre!');
      } else if (inputRef.current.value.length >= 10) {
        throw new Error('Tranqui! El nombre es demasiado largo, intenta algo mas simple.');
      } else {
        document.querySelector('.error') && document.querySelector('.error').remove();
        handler(state, inputRef.current.value);
      }

    } catch (err) {
      document.querySelector('.error') && document.querySelector('.error').remove();
      inputRef.current.insertAdjacentHTML(
        'afterend',
        `<span class='error'>${err.message}</span>`
      );

    } finally {
      state.playerOne.isValidated
        ? modalRef.current.close()
        : event.preventDefault();
    }
  }

  // Este elemento funciona como un modal para que el usuario ingrese su nombre al inicio del juego.
  return (
    <dialog className={"modal"} ref={modalRef} onCancel={(event) => { event.preventDefault() }}>
      <form action={"#"} method={"dialog"}>
        <label htmlFor={inputRef}>
          Bienvenido.
          <br />
          Por favor ingresa tu nombre y haz click en Jugar!
        </label>
        <input type={"text"} ref={inputRef} size={12} placeholder={"ingresa tu nombre aqui"} autoCorrect={"off"}
          autoComplete={"off"} spellCheck={false} name={"input"} />
        <input type={"submit"} value={"Jugar!"} formMethod={"dialog"} name={"submit"}
          onClick={(event) => { validate(event) }} />
      </form>
    </dialog>
  );
}

Ready.propTypes = {
  state: PropTypes.object,
  handler: PropTypes.func,
}

export default Ready;