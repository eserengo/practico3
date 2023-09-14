/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

// Primero los estilos con styled-components.
const Modal = styled.dialog`
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
text-align: center;
padding: 3rem;
border: 2px solid var(--rojo);
border-radius: 8px;
background-color: var(--blanco);

&::backdrop {
  background-image: linear-gradient(to right, rgba(3, 3, 3, 0.25), rgba(3, 3, 3, 0.25));
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
`;

const Form = styled.form`
display: flex;
flex-direction: column;
align-items: center;
`;

const Label = styled.label`
padding: 0.5rem 1rem;
font-size: 1.5rem;
color: var(--azul);
`;

const TextInput = styled.input`
padding: 0.5rem 1rem;
font-size: 1.5rem;
font-family: serif;
border: 1px solid var(--azul);
border-radius: 4px;
`;

const SubmitInput = styled.input`
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

// El componente para establecer el nombre del jugador, con un bloque try catch que lanza excepciones si el
// usuario no ingresa un nombre o si el nombre ingresado es muy largo. Se carga al inicio.
const Ready = ({ state, helper }) => {
  const modalRef = useRef(null);
  const inputRef = useRef(null);

  // El modal se activa cuando se monta el componente.
  useEffect(() => {
    modalRef.current.showModal();
  }, [])

  // Funcion para validar el nombre ingresado por el usuario.
  const validate = (event) => {
    try {
      if (!inputRef.current.value || inputRef.current.value === ' ') {
        throw new Error('Oye... para jugar necesitas ingresar un nombre!');
      } else if (inputRef.current.value.length >= 10) {
        throw new Error('Tranqui! El nombre es demasiado largo, intenta algo mas simple.');
      } else {
        document.querySelector('.error') && document.querySelector('.error').remove();
        helper(state, inputRef.current.value);
      }

    } catch (err) {
      document.querySelector('.error') && document.querySelector('.error').remove();
      inputRef.current.insertAdjacentHTML(
        'afterend',
        `<span class='error' style='font-size: 0.75rem; color: var(--rojo); display: inline-block; text-align: center;'>
          ${err.message}</span>`
      );

    } finally {
      state.playerOne.isValidated
        ? modalRef.current.close()
        : event.preventDefault();
    }
  }

  // El HTML que renderiza el componente.
  return (
    <Modal ref={modalRef} onCancel={(event) => { event.preventDefault() }}>
      <Form action={'#'} method={'dialog'}>
        <Label htmlFor={inputRef}>
          Bienvenido.
          <br />
          Por favor ingresa tu nombre y haz click en Jugar!
        </Label>
        <TextInput type={'text'} ref={inputRef} size={15} placeholder={'ingresa tu nombre aqui'} autoCorrect={'off'}
          autoComplete={'off'} spellCheck={false} name={'input'} />
        <SubmitInput type={'submit'} value={'Jugar!'} formMethod={'dialog'} name={'submit'}
          onClick={(event) => { validate(event) }} />
      </Form>
    </Modal>
  );
}

Ready.propTypes = {
  state: PropTypes.object,
  helper: PropTypes.func,
}

export default Ready;
