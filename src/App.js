import { useState, useEffect } from 'react';
import './styles/App.css';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import Weather from './components/weather';
import './logo.svg';
const API = "5f924e66209d86f699933ccbf1072991";

function App() {
  const [weather, setWeather] = useState(false);
  const [input, setInput] = useState(false);
  const [isFormActive, setFormActive] = useState(false);
  const [dataStatus, setDataStatus] = useState(false);

  const checkWeather = (city) => {
    console.log(city);
    if (city === false) {
      document.querySelector('.form form').classList.add('error');
    }

    else {
      setInput(false);
      setWeather(false);
      setDataStatus(!dataStatus);
      setTimeout(() => {
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API}`)
          .then((response) => {
            const data = response.json();
            let city = null;
            let description = null;
            let temperature = null;
            data
              .then((res) => {
                city = res[0].name;
                const lat = res[0].lat;
                const lon = res[0].lon;
                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API}&lang=pl&units=metric`)
                  .then((response) => {
                    const data = response.json();

                    data
                      .then((res) => {

                        const data = {
                          city: city,
                          description: res.weather[0].description,
                          temperature: Math.round(res.main.temp),
                          realfeel: Math.round(res.main.feels_like),
                          pressure: res.main.pressure,
                          windspeed: Math.round(res.wind.speed * 3.6),

                        }

                        setWeather(data);
                        setDataStatus(false);
                      })

                  })
                  .catch((err) => { alert(`Błąd: ${err}`) })


              })
              .catch(err => console.error(err))
          })
      }, 2500)
    }


  }


  return (
    <div className="App">
      {dataStatus !== false ? <div className="loading">
        <img src="./logo192.png" alt="Loading logo" />
      </div> : ""}
      <div className="icon">
        <i className="bi bi-binoculars" onClick={() => { setFormActive(!isFormActive) }}></i>
        {isFormActive !== false ? <div className="form">
          <form>
            <input className="city" name="city" onChange={(e) => { setInput(e.target.value) }} />
            <button onClick={(e) => { e.preventDefault(); checkWeather(input) }}><i className="bi bi-search"></i></button>
          </form>
        </div> : ""}
      </div>
      {weather === false ? <h1 className="hello-header">Witaj! Sprawdź aktualną pogodę!</h1> : <>


        <div className="content">
          <Weather city={weather.city} description={weather.description} temperature={weather.temperature} realfeel={weather.realfeel} pressure={weather.pressure} windspeed={weather.windspeed} />
        </div>

      </>}

    </div>
  )

}

export default App;
