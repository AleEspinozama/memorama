import { useState, useEffect } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const imagenes = [
  {"src": "https://github.com/AleEspinozama/memorama/blob/main/public/Memorama%20imgs/1.jpg?raw=true", matched: false },
  {"src": "https://github.com/AleEspinozama/memorama/blob/main/public/Memorama%20imgs/2.jpg?raw=true", matched: false },
  {"src": "https://github.com/AleEspinozama/memorama/blob/main/public/Memorama%20imgs/3.jpg?raw=true", matched: false },
  {"src": "https://github.com/AleEspinozama/memorama/blob/main/public/Memorama%20imgs/6.jpg?raw=true", matched: false },
  {"src": "https://github.com/AleEspinozama/memorama/blob/main/public/Memorama%20imgs/7.jpg?raw=true", matched: false },
  {"src": "https://github.com/AleEspinozama/memorama/blob/main/public/Memorama%20imgs/8.jpg?raw=true", matched: false },
  {"src": "https://github.com/AleEspinozama/memorama/blob/main/public/Memorama%20imgs/9.jpg?raw=true", matched: false },
  {"src": "https://github.com/AleEspinozama/memorama/blob/main/public/Memorama%20imgs/10.jpg?raw=true", matched: false },
  {"src": "https://github.com/AleEspinozama/memorama/blob/main/public/Memorama%20imgs/12.jpg?raw=true", matched: false },
  {"src": "https://github.com/AleEspinozama/memorama/blob/main/public/Memorama%20imgs/13.jpg?raw=true", matched: false },
]

const initialTurns=0;

function App() { 
  const [cards, setCards]= useState([])
  const [turns, setTurns]= useState(initialTurns)
  const [choiceOne, setChoiceOne]= useState(null)
  const [choiceTwo, setChoiceTwo]= useState(null)
  const [disabled, setDisabled]= useState(false)

  //shuffle cards
  const shuffleCards = ()=> {
    const shuffleCards= [...imagenes, ...imagenes]
      .sort(()=> Math.random() - 0.5)
      .map(card =>({...card, id:Math.random()}))

    setChoiceOne(null);
    setChoiceTwo(null);
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
      setDisabled(true);
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
    setDisabled(false);
  }

  //start new game automatically
  useEffect(() => {
    shuffleCards();
  }, [])

  return (
    <div className="App">
      <h1>Memorama Animal</h1>
      {/* <button onClick={shuffleCards}>Empezar</button> */}
      <p>Turnos : {turns}</p>

      <div className='card-grid'>
        {cards.map(card => (
          <SingleCard 
          key={card.id} 
          card={card} 
          handleChoice={handleChoice}
          flipped= {card === choiceTwo || card===choiceOne || card.matched}
          disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
