import PropTypes from "prop-types";

const Weather = (props) => {
    return (
        <>
            <div className="item">
                <h1>Miejscowość: {props.city}</h1>
                <div className="weather-info">
                    <div className="weather-info-item">
                        <h3>{props.description}</h3>
                    </div>
                    <div className="weather-info-item">
                        <p id="temperature">{props.temperature}</p> <p id="st">st. C</p>
                    </div>
                </div>
            </div>
            <div className="item">
                <i className="bi bi-cloudy"></i>
            </div>
        </>
    )
}
Weather.propTypes = {
    city: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    temperature: PropTypes.number.isRequired

}

export default Weather;