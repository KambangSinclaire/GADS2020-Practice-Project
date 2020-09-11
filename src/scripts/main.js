
/** Variable declarations */
let town = document.querySelector('.town');
let current = document.querySelector('.current-day');
let hourly = document.querySelector('.hourly');
let city = document.querySelector('.city');
let daily = document.querySelector('.daily');
let latitude = document.querySelector('#lat');
let clouds = document.querySelector('#clouds');
let temp = document.querySelector('#temp');
let longitude = document.querySelector('#long');
let feelsLike = document.querySelector('#feelsLike');
let pressure = document.querySelector('#pressure');
let humidity = document.querySelector('#humidity');
let ajax = new XMLHttpRequest();
let weatherResponse = {};
let apiKey = 'dd06b34db1b3092a5d1b35f5f679214b';

searchWeather(4.0511, 9.7679);

function searchWeather(defaultLat, defaultLon) {
    let latField = +document.querySelector('.lat-field').value;
    let longField = +document.querySelector('.long-field').value;
    let citySearch = document.querySelector('.citySearch').value;

    if ((latField === 0 || latField === undefined) && (longField === 0 || longField === undefined) && (citySearch === '' || citySearch === undefined)) {
        latField = defaultLat;
        longField = defaultLon;
        baseUrl = 'https://api.openweathermap.org/data/2.5/' + `onecall?lat=${latField}&lon=${longField}&appid=${apiKey}`
    } else {
        if ((latField !== 0 || latField !== undefined) && (longField !== 0 || longField !== undefined) && (citySearch === '' || citySearch === undefined)) {
            baseUrl = 'https://api.openweathermap.org/data/2.5/' + `onecall?lat=${latField}&lon=${longField}&appid=${apiKey}`
        } else {
            baseUrl = 'https://api.openweathermap.org/data/2.5/' + `weather?q=${citySearch}&appid=${apiKey}`
        }
    }

    ajax.open('GET', baseUrl, true);
    ajax.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {

            weatherResponse = JSON.parse(this.responseText);
            console.log(weatherResponse);
            if (typeof weatherResponse.timezone === 'number') {
                city.innerHTML = citySearch;
                latitude.innerHTML = weatherResponse.coord.lat;
                longitude.innerHTML = weatherResponse.coord.lon;
                humidity.innerHTML = weatherResponse.main.humidity;
                pressure.innerHTML = weatherResponse.main.pressure;
                feelsLike.innerHTML = weatherResponse.main.feels_like;
                clouds.innerHTML = weatherResponse.weather[0].description;
                temp.innerHTML = weatherResponse.main.temp;
                latitude.innerHTML += '&deg;' + '(S)';
                longitude.innerHTML += '&deg;' + '(N)';
                temp.innerHTML += '&deg;' + 'C';
            } else {
                city.innerHTML = weatherResponse.timezone;
                latitude.innerHTML = weatherResponse.lat;
                longitude.innerHTML = weatherResponse.lon;
                clouds.innerHTML = weatherResponse.current.weather[0].description;
                temp.innerHTML = weatherResponse.current.temp;
                latitude.innerHTML += '&deg;' + '(S)';
                longitude.innerHTML += '&deg;' + '(N)';
                temp.innerHTML += '&deg;' + 'C';
            }



            // resolve(weatherResponse);
        } else {
            console.log('An unhandled error occured');
            // reject(new Error('An error occured while trying to get weather details from the API'))
        }
    }
    ajax.send();
}
