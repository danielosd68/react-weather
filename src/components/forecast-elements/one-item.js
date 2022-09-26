const ForecastItem = (props) => {
    return (
        <div className="forecast-item">
            <div className="forecast-item-title">
                <h3>{props.day}</h3>
            </div>
            <div className="forecast-item-weather-info">
                <div className="forecast-item-weather-info-temperature">{props.temperature}</div>
                <div className="forecast-item-weather-info-description">{props.description}</div>
            </div>
        </div>
    )
}

export default ForecastItem;