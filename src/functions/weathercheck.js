export default function downloadData(city) {
    const API = process.env.REACT_APP_API_KEY;

    return new Promise((resolve, reject) => {
        fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API}`)
            .then((response) => {
                if (response.status !== 200) {
                    reject('Napotkano zewnętrzny problem z dostępem do danych. Spróbuj ponownie później!');
                }

                else {
                    const data = response.json();
                    let city = null;

                    data
                        .then((res) => {
                            if (res.length === 0) {
                                reject('Nie znaleziono podanej miejscowości. Spróbuj ponownie.');
                            }
                            else {
                                city = res[0].name;
                                const lat = res[0].lat;
                                const lon = res[0].lon;

                                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API}&lang=pl&units=metric`)
                                    .then((response) => {
                                        const data = response.json();

                                        if (response.status !== 200) {
                                            reject('Napotkano zewnętrzny problem z dostępem do danych. Spróbuj ponownie później!');
                                        }

                                        else {
                                            data
                                                .then((response) => {
                                                    const data = {
                                                        city: city,
                                                        description: response.weather[0].description,
                                                        temperature: Math.round(response.main.temp),
                                                        realfeel: Math.round(response.main.feels_like),
                                                        pressure: response.main.pressure,
                                                        windspeed: Math.round(response.wind.speed * 3.6),

                                                    }

                                                    localStorage.setItem('weather-data', JSON.stringify(data));

                                                    resolve(data);
                                                })
                                        }
                                    })
                            }
                        })

                }
            })

    })






}