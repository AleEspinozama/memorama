import { useState, useEffect } from 'react';
import SingleCard from './SingleCard';
import Button from './Button'
import { getImages } from "../imgs"
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';


const initialTurns=0;

function Grid() {
    const imagenes= getImages();
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

    //check if you win

    useEffect(()=>{
      if(cards.length > 0){
        if(cards.every(card => card.matched === true)){
          Swal.fire(
            '¡Felicidades!',
            '¡Ganaste!',
            'success'
          )}
      }
    }, [cards])
  
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
          resetTurn();
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
    <div >
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

        <Link to="/">
            <Button name="Volver"></Button>
        </Link>
    </div>
  )
}

export default Grid