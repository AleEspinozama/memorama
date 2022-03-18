import './App.css';
import { Link } from "react-router-dom";
import Button from './components/Button';


function App() { 

  return (
    <div className="App">
      <img  className= "full-image"
      src="https://github.com/AleEspinozama/memorama/blob/main/public/Memorama%20imgs/12.jpg?raw=true"></img>
      <h1>Memorama Animal</h1>
      <Link to="play">
            <Button name="Empezar"></Button>
        </Link>
    </div>
  );
}

export default App;
