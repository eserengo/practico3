/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import rock from "../assets/rock.png"
import paper from "../assets/paper.png"
import scissors from "../assets/scissors.png"
import PropTypes from "prop-types"

const PlayerTwo = ({ state, handler }) => {

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

  useEffect(() => {
    if (state.playerOne.play) {
      const availablePlays = DATA.map(item => item.alt);
      const generateRandom = Math.floor(Math.random() * availablePlays.length);
      handler(state, availablePlays[generateRandom]);
    }
  }, [state.playerOne.play, state.playerTwo.play])

  const DisplayHand = () => (
    DATA
      .map((item, index) => {
        return (
          (state.playerTwo.play).slice(0, -3) === item.alt &&
          <img key={`p2_hand_${index}`} src={Object.values(item.src)} alt={item.alt} className="play" />
        )
      }
    )
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