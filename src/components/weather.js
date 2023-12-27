import PropTypes from "prop-types";
import Forecast from "./forecast";
import '../styles/App.css';

const Weather = (props) => {
    return (
        <>
            <div className="item">
                <h1 style={{textAlign: "center", fontSize: 56, marginBottom: 0, marginTop: 0}}>{props.city}</h1>
                <div className="weather-info">
                    <h3>{props.description}</h3>
                    <div className="weather-info-item">
                        <p id="temperature">{props.temperature}</p> <p id="st">st. C</p>
                    </div>

                </div>
                <div className="details">
                    <div className="row">
                        <p><b>Odczuwalna</b></p>
                        <p>{props.realfeel} st. C</p>
                    </div>
                    <div className="row">
                        <p><b>Ciśnienie</b></p>
                        <p>{props.pressure} hPa</p>
                    </div>
                    <div className="row">
                        <p><b>Prędkość wiatru</b></p>
                        <p>{props.windspeed} hPa</p>
                    </div>
                </div>

                <Forecast />
            </div>
        </>
    )
}
Weather.propTypes = {
    city: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    temperature: PropTypes.number.isRequired,
    realfeel: PropTypes.number,
    pressure: PropTypes.number,
    windspeed: PropTypes.number


}

export default Weather;