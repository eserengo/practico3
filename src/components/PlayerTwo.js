/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import piedra from "../assets/piedra.png"
import papel from "../assets/papel.png"
import tijeras from "../assets/tijeras.png"
import PropTypes from "prop-types"

const PlayerTwo = ({ state, handler }) => {

  const DATA = [
    {
      alt: 'piedra',
      src: { piedra },
    },
    {
      alt: 'papel',
      src: { papel },
    },
    {
      alt: 'tijeras',
      src: { tijeras },
    }
  ];

  useEffect(() => {
    if (state.playerOne.play) {
      const availablePlays = DATA.map(item => item.alt);
      const generateRandom = Math.floor(Math.random() * availablePlays.length);
      handler(state, availablePlays[generateRandom]);
    }
  }, [state.playerOne.play])

  const DisplayHand = () => (
    DATA
      .map((item, index) => {
        return (
          state.playerTwo.play === item.alt &&
          <img key={`p1_hand_${index}`} src={Object.values(item.src)} alt={item.alt} className="play" />
        )
      })
  )

  return (
    <section>
      <h2>{state.playerTwo.alias}</h2>
      <DisplayHand />
      <h2>score: <span>{state.playerTwo.score}</span></h2>
    </section>
  );
}

PlayerTwo.propTypes = {
  state: PropTypes.object,
  handler: PropTypes.func,
}

export default PlayerTwo;