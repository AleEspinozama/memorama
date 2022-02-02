import './SingleCard.css'

function SingleCard({card, handleChoice, flipped }) {
const handleClick= () => {
 handleChoice(card)
}

  return (
    <div className='card'>
      <div className={flipped ? 'flipped': ""}>
        <img className='front' src={card.src} alt="card front"/>
        <img 
        className='back' 
        onClick={handleClick} 
        src="/Memorama imgs/back_2.jpg" 
        alt="card back"
        />
      </div>
    </div>
  )
  
}

export default SingleCard;
