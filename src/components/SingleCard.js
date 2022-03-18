import './SingleCard.css'

function SingleCard({card, handleChoice, flipped, disabled }) {
  
const handleClick= () => {
  if(!disabled){
    handleChoice(card)
  } 
}

  return (
    <div className='card'>
      <div className={flipped ? 'flipped': ""}>
        <img className='front' src={card.src} alt="card front"/>
        <img 
        className='back' 
        onClick={handleClick} 
        src="https://github.com/AleEspinozama/memorama/blob/main/public/Memorama%20imgs/back_2.jpg?raw=true" 
        alt="card back"
        />
      </div>
    </div>
  )
  
}

export default SingleCard;
