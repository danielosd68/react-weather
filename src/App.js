import { useState, useEffect } from 'react';
import './styles/App.css';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import Weather from './components/weather';
import Error from './components/error';
import './logo.svg';
const API = "5f924e66209d86f699933ccbf1072991";



if (localStorage.getItem('weather-data') === null) {
  localStorage.setItem('weather-data', false);
}

function App() {
  const [weather, setWeather] = useState(JSON.parse(localStorage.getItem('weather-data')));
  const [input, setInput] = useState(false);
  const [isFormActive, setFormActive] = useState(false);
  const [dataStatus, setDataStatus] = useState(false);
  const [error, setError] = useState(false);


  const checkWeather = (city) => {
    if (city === false) {
      document.querySelector('.form form').classList.add('error');
    }

    else {
      setInput(false);
      setWeather(false);
      setDataStatus(!dataStatus);
      setTimeout(() => {
        fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API}`, { method: 'GET' })
          .then((response) => {
            console.log(response);
            if (response.status !== 200) {
              console.warn('Zapytanie nie zostało zrealizowane z powodu zewnętrznego błędu.');
              setError('Napotkano zewnętrzny problem z dostępem do danych. Spróbuj ponownie później!');
              setDataStatus(false);
              setWeather('false');
            }


            else {
              const data = response.json();

              let city = null;
              let description = null;
              let temperature = null;
              data
                .then((res) => {
                  console.log(res);
                  if (res.length === 0) {
                    console.error('Nie odnaleziono podanej miejscowości');
                    setError('Nie znaleziono podanej miejscowości. Spróbuj ponownie.');
                    setDataStatus(false);
                    setWeather('false');
                  }

                  else {
                    city = res[0].name;
                    const lat = res[0].lat;
                    const lon = res[0].lon;
                    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API}&lang=pl&units=metric`, { method: 'GET' })
                      .then((response) => {
                        const data = response.json();
                        if (response.status !== 200) {
                          console.error('Zapytanie nie zostało zrealizowane z powodu zewnętrznego błędu.');
                          setError('Napotkano zewnętrzny problem z dostępem do danych. Spróbuj ponownie później!');
                          setDataStatus(false);
                          setWeather('false');
                        }

                        else {
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
                              localStorage.setItem('weather-data', JSON.stringify(data));


                            })
                        }



                      })
                  }


                })
            }


          })
      }, 2500)
    }


  }


  return (
    <div className="App">
      {dataStatus !== false ? <div className="loading">
        <img src="./logo192.png" alt="Loading logo" />
      </div> : ""}
      {error !== false ? <Error error={error} exit={() => { setError(false) }} /> : ""}
      <div className="icon">
        <i className="bi bi-binoculars" onClick={() => { setFormActive(!isFormActive) }}></i>
        {isFormActive !== false ? <div className="form">
          <form>
            <input className="city" name="city" onChange={(e) => { setInput(e.target.value) }} />
            <button onClick={(e) => { e.preventDefault(); checkWeather(input) }}><i className="bi bi-search"></i></button>
          </form>
        </div> : ""}
      </div>
      {weather == false ? <h1 className="hello-header">Witaj! Sprawdź aktualną pogodę!</h1> : <>


        <div className="content">
          <Weather city={weather.city} description={weather.description} temperature={weather.temperature} realfeel={weather.realfeel} pressure={weather.pressure} windspeed={weather.windspeed} />
        </div>

      </>}

    </div>
  )

}

export default App;
