import piedra from "../assets/piedra.png"
import papel from "../assets/papel.png"
import tijeras from "../assets/tijeras.png"
import PropTypes from "prop-types"

const PlayerOne = ({ state, handler }) => {

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
          state.playerOne.play === item.alt &&
          <img key={`p1_hand_${index}`} src={Object.values(item.src)} alt={item.alt} className="play" />
        )
      })
  )

  return (
    <>
      <section>
        <h2>{state.playerOne.alias}</h2>
        <DisplayHand />
        <h2>score: <span>{state.playerOne.score}</span></h2>
      </section>
      <CreateHands />
    </>
  );
}

PlayerOne.propTypes = {
  state: PropTypes.object,
  handler: PropTypes.func,
}

export default PlayerOne;