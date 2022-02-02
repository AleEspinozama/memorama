import { useState, useEffect } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const imagenes = [
  {"src": "/Memorama imgs/1.jpg", matched: false },
  {"src": "/Memorama imgs/2.jpg", matched: false },
  {"src": "/Memorama imgs/3.jpg", matched: false },
  {"src": "/Memorama imgs/6.jpg", matched: false },
  {"src": "/Memorama imgs/7.jpg", matched: false },
  {"src": "/Memorama imgs/8.jpg", matched: false },
  {"src": "/Memorama imgs/9.jpg", matched: false },
  {"src": "/Memorama imgs/10.jpg", matched: false },
  {"src": "/Memorama imgs/12.jpg", matched: false },
  {"src": "/Memorama imgs/13.jpg", matched: false },
]

const initialTurns=0;

function App() { 
  const [cards, setCards]= useState([])
  const [turns, setTurns]= useState(initialTurns)
  const [choiceOne, setChoiceOne]= useState(null)
  const [choiceTwo, setChoiceTwo]= useState(null)

  //shuffle cards
  const shuffleCards = ()=> {
    const shuffleCards= [...imagenes, ...imagenes]
      .sort(()=> Math.random() - 0.5)
      .map(card =>({...card, id:Math.random()}))

    setCards(shuffleCards);
    setTurns(initialTurns);
  }

  //handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  //compare two choices
  useEffect(()=> {
    if(choiceOne && choiceTwo){
      if(choiceOne.src === choiceTwo.src){
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src ===  choiceTwo.src){
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn() 
      } else{
        setTimeout(()=>resetTurn(), 1000)
      }

     

    }
  }, [choiceTwo])

  //reset choices and increase turns
  const resetTurn= () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
  }

  return (
    <div className="App">
      <h1>Memorama Animal</h1>
      <button onClick={shuffleCards}>Empezar</button>

      <div className='card-grid'>
        {cards.map(card => (
          <SingleCard 
          key={card.id} 
          card={card} 
          handleChoice={handleChoice}
          flipped= {card === choiceTwo || card===choiceOne || card.matched}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
