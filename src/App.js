import './App.css'
import { useState, useEffect } from 'react'
import SingleCard from './components/SingleCard'

const cardImages = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false }
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [firstCard, setFirstCard] = useState(null)
  const [secondCard, setSecondCard] = useState(null)
  const [disabled, setDisabled] = useState(false)

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({...card, id: Math.random()}))

      setCards(shuffledCards)
      setTurns(0)
  }

  const handleChoice = card => {
    firstCard ? setSecondCard(card) : setFirstCard(card)
  }

  useEffect(() => {
    const checkCards = () => {
      if (!firstCard || !secondCard) return
      setDisabled(true)
      if (firstCard.src === secondCard.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === firstCard.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
      }
      setTimeout(() => resetTurn(), 1000)
    }
    checkCards()
  }, [firstCard, secondCard])

  const resetTurn = () => {
    setFirstCard(null)
    setSecondCard(null)
    setTurns(prevCount => prevCount + 1)
    setDisabled(false)
  }

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard
            card={card}
            key={card.id} 
            handleChoice={handleChoice}
            flipped={
              card === firstCard ||
              card === secondCard ||
              card.matched}
            disabled={disabled}
            />
        ))}
      </div>
    </div>
  );
}

export default App
