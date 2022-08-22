import { useState, useEffect } from 'react';
import './styles/App.css';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import Weather from './components/weather';
const API = "5f924e66209d86f699933ccbf1072991";

function App() {
  const [weather, setWeather] = useState(false);
  const [input, setInput] = useState(false);
  const [isFormActive, setFormActive] = useState(false);

  const checkWeather = (city) => {
  
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API}`)
      .then((response) => {
        console.log(response.promiseStatus);
        const data = response.json();
        let city = false;
        data
          .then((res) => { city = res[0].name; console.log(city); })
          .catch(err => console.error(err))
      })
  }


  return (
    <div className="App">
      <div className="icon">
        <i className="bi bi-binoculars" onClick={() => { setFormActive(!isFormActive) }}></i>
      </div>
      {weather === false ? <h1 className="hello-header">Witaj! Sprawdź aktualną pogodę!</h1> : <>

        <div className="content">
          <Weather city={weather} />
        </div>
      </>}
      {isFormActive !== false ? <div className="form">
        <form>
          <input className="city" name="city" onChange={(e) => { setInput(e.target.value) }} />
          <button onClick={(e) => { e.preventDefault(); checkWeather(input) }}>Sprawdź pogodę</button>
        </form>
      </div> : ""}
    </div>
  )

}

export default App;
