/* eslint-disable react-hooks/exhaustive-deps */
import rock from "../assets/rock.png"
import paper from "../assets/paper.png"
import scissors from "../assets/scissors.png"
import PropTypes from "prop-types"

const PlayerOne = ({ state, handler }) => {

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

  const CreateHands = () => (
    <aside>
      {DATA
        .map((item, index) => {
          return (
            <img key={`p1_preview_${index}`} src={Object.values(item.src)} alt={item.alt} className={"hand"}
              onClick={(event) => handler(state, event.target.alt)} />
          )
        })
      }
    </aside>
  )

  const DisplayHand = () => (
    DATA
      .map((item, index) => {
        return (
          (state.playerOne.play).slice(0, -3) === item.alt &&
          <img key={`p1_hand_${index}`} src={Object.values(item.src)} alt={item.alt} className="play" />
        )
      }
    )
  )

  return (
    <section>
      <article>
        <h2>{state.playerOne.alias}</h2>
        <DisplayHand />
        <h2>score: <span>{state.playerOne.score}</span></h2>
      </article>
      <CreateHands />
    </section>
  );
}

PlayerOne.propTypes = {
  state: PropTypes.object,
  handler: PropTypes.func,
}

export default PlayerOne;