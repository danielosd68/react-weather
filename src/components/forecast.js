import ForecastItem from "./forecast-elements/one-item";

const Forecast = (props) => {
    return (
        <div className="forecast-template">
            <ForecastItem day="Poniedziałek" temperature="15 st. C" description="Pochmurnie" />
        </div>
    )
}

export default Forecast;