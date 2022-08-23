import PropTypes from "prop-types";

const Weather = (props) => {
    return (
        <>
            <div className="item">
                <h1>Miejscowość: {props.city}</h1>
                <div className="weather-info">
                    <div className="weather-info-item">
                        <h3>{props.description}</h3>
                        <ul>
                            <li>Odczuwalna: {props.realfeel} st. C</li>
                            <li>Ciśnienie: {props.pressure} hPa</li>
                            <li>Prędkość wiatru: {props.windspeed} km/h</li>
                        </ul>
                    </div>
                    <div className="weather-info-item">
                        <p id="temperature">{props.temperature}</p> <p id="st">st. C</p>
                    </div>
                </div>
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