import PropTypes from "prop-types";

const Weather = (props) => {
    return (
        <>
            <div className="item">
                <h1>{props.city}</h1>
                <div className="weather-info">
                    <div className="weather-info-item">
                        <h3>{props.description}</h3>

                        <div className="weather-info-item-box">
                            <p>Odczuwalna: </p>{props.realfeel} st. C <i className="bi bi-thermometer-half"></i>
                        </div>
                        <div className="weather-info-item-box">
                            <p>Ciśnienie: </p>{props.pressure} hPa <i className="bi bi-arrow-down-up"></i>
                        </div>
                        <div className="weather-info-item-box">
                            <p>Prędkość wiatru: </p>{props.windspeed} km/h <i className="bi bi-speedometer"></i>
                        </div>


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