import {useState} from 'react';
import './styles/App.css';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import Weather from './components/weather';
import Error from './components/error';
import downloadData from './functions/weathercheck';


if (localStorage.getItem('weather-data') === null) {
    localStorage.setItem('weather-data', false);
}

function App() {
    const [weather, setWeather] = useState(JSON.parse(localStorage.getItem('weather-data')));
    const [input, setInput] = useState("");
    const [isFormActive, setFormActive] = useState(false);
    const [dataStatus, setDataStatus] = useState(false);
    const [error, setError] = useState(false);


    const checkWeather = (city) => {
        if (city === false) {
            document.querySelector('.form form').classList.add('error');
        } else {
            document.querySelector('.form form').classList.remove('error');
            setInput("");
            setWeather(false);
            setDataStatus(!dataStatus);
            downloadData(input)
                .then((response) => {
                    setWeather(response);
                    setDataStatus(false);
                })
                .catch((error) => {
                    setInput("");
                    setDataStatus(false);
                    setError(error);
                })

        }

    }

    return (
        <div className="App">

            {dataStatus !== false ? <div className="loading">
                <img src="./logo192.png" alt="Loading logo"/>
            </div> : ""}

            {error !== false ? <Error error={error} exit={() => {
                setError(false)
            }}/> : ""}

            <div className="icon">
                <i className="bi bi-search" onClick={() => {
                    setFormActive(!isFormActive)
                }}></i>

                {isFormActive !== false ? <div className="form">
                    <form>
                        <input placeholder="Wprowadź nazwę miejscowości..." value={input} className="city" name="city" onChange={(e) => {
                            setInput(e.target.value)
                        }}/>
                        <button onClick={(e) => {
                            e.preventDefault();
                            checkWeather(input)
                        }}><i className="bi bi-search"></i></button>
                    </form>
                </div> : null}

            </div>
            {weather === false ? <h1 className="hello-header">Witaj! Sprawdź aktualną pogodę!</h1> :
            <>
                <div className="content">
                    <Weather city={weather.city} description={weather.description} temperature={weather.temperature}
                             realfeel={weather.realfeel} pressure={weather.pressure} windspeed={weather.windspeed}/>
                </div>
            </>}
            <h5 className="copyright">Dane dostarczane przez OpenWeather Map</h5>
        </div>
    )
}

export default App;
