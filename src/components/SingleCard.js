import "./SingleCard.css"

const SingleCard = ({card, handleClick}) => {
    return (
    <div className="card">
        <div>
          <img
            className="front"
            src={card.src}
            alt="card"
            />
          <img
            className="back"
            src="/img/cover.png" 
            alt="card back"
            onClick={() => handleClick(card)}
            />
        </div>
      </div>
    )
}

export default SingleCard
