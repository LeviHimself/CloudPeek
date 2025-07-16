// assests/js/app.js

import { getWeather } from './weatherApi.js';

// -------------------------Default Cities-------------------------
const defaultCities = ['New York', 'Islamabad','London','Shanghai'];
const defaultCardsContainer = document.getElementById('default-cards');
const API_KEY = '4c4f90532fa2eb253fe1e3b4862d4e50'; 

const popularCities = [
    // Pakistan
    "Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", "Multan", "Peshawar", "Quetta",
    // India
    "Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata", "Hyderabad",
    // Bangladesh
    "Dhaka", "Chittagong", "Khulna",
    // Afghanistan
    "Kabul", "Kandahar", "Herat",
    // Iran
    "Tehran", "Mashhad", "Isfahan",
    // China
    "Beijing", "Shanghai", "Guangzhou"
    //US
    , "New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia","San Antonio", "San Diego", "Dallas", "San Jose","Boston"
    //UK
    , "London", "Birmingham", "Manchester", "Glasgow", "Leeds"
    //Canada
    , "Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa"
    //Australia
    , "Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"
    //Europe
    , "Berlin", "Paris", "Madrid", "Rome", "Amsterdam", "Vienna", "Zurich", "Stockholm", "Copenhagen", "Oslo"
    //Africa
    , "Cairo", "Lagos", "Nairobi", "Johannesburg", "Cape Town", "Accra", "Addis Ababa"
    //South America
    , "Sao Paulo", "Buenos Aires", "Rio de Janeiro", "Lima", "Bogota", "Santiago", "Caracas"
    //Middle East
    , "Dubai", "Riyadh", "Istanbul", "Tel Aviv", "Doha", "Muscat", "Amman", "Beirut"
    //Southeast Asia
    , "Bangkok", "Kuala Lumpur", "Singapore", "Jakarta", "Manila", "Hanoi", "Ho Chi Minh City", "Yangon", "Phnom Penh", "Vientiane", "Naypyidaw"
    //Central Asia
    , "Tashkent", "Almaty", "Bishkek", "Dushanbe", "Ashgabat"
    //Russia
    , "Moscow", "Saint Petersburg", "Novosibirsk", "Yekaterinburg", "Nizhny Novgorod", "Kazan", "Chelyabinsk", "Omsk", "Rostov-on-Don", "Ufa"
    //Japan
    , "Tokyo", "Osaka", "Yokohama", "Nagoya", "Sapporo", "Fukuoka", "Kobe", "Kyoto", "Hiroshima", "Sendai"
    //South Korea
    , "Seoul", "Busan", "Incheon", "Daegu", "Daejeon", "Gwangju", "Suwon", "Ulsan", "Changwon", "Seongnam"
    //Turkey
    , "Istanbul", "Ankara", "Izmir", "Bursa", "Antalya", "Adana", "Gaziantep", "Konya", "Mersin", "Kayseri"
    //Philippines
    , "Manila", "Quezon City", "Cebu City", "Davao City", "Zamboanga City", "Taguig", "Pasig", "Cagayan de Oro", "Antipolo", "Iloilo City"
    //Vietnam
    , "Hanoi", "Ho Chi Minh City", "Da Nang", "Hai Phong", "Can Tho", "Nha Trang", "Hue", "Vinh", "Bien Hoa", "Nam Dinh"
    //Malaysia
    , "Kuala Lumpur", "George Town", "Ipoh", "Johor Bahru", "Kota Kinabalu", "Kuching", "Shah Alam", "Petaling Jaya", "Subang Jaya", "Seremban"
    //Indonesia
    , "Jakarta", "Surabaya", "Bandung", "Medan", "Semarang", "Palembang", "Makassar", "Batam", "Malang", "Bandar Lampung", "Depok"
    //Thailand
    , "Bangkok", "Nonthaburi", "Nakhon Ratchasima", "Chiang Mai", "Udon Thani", "Hat Yai", "Khon Kaen", "Nakhon Si Thammarat", "Songkhla", "Rayong"
    //Egypt
    , "Cairo", "Alexandria", "Giza", "Shubra El-Kheima", "Port Said", "Suez", "Luxor", "Aswan", "Mansoura", "Tanta"
    //Nigeria
    , "Lagos", "Kano", "Ibadan", "Port Harcourt", "Benin City", "Kaduna", "Maiduguri", "Zaria", "Aba", "Jos"
    //South Africa
    , "Johannesburg", "Cape Town", "Durban", "Pretoria", "Port Elizabeth", "Bloemfontein", "East London", "Pietermaritzburg", "Soweto", "Tshwane"
    //Brazil
    , "Sao Paulo", "Rio de Janeiro", "Salvador", "Belo Horizonte", "Brasilia", "Fortaleza", "Curitiba", "Recife", "Porto Alegre", "Manaus"
    //Argentina
    , "Buenos Aires", "Cordoba", "Rosario", "La Plata", "Mendoza", "San Miguel de Tucuman", "Mar del Plata", "Salta", "Santa Fe", "Corrientes"
    //Chile
    , "Santiago", "Valparaiso", "Concepcion", "La Serena", "Antofagasta", "Temuco", "Rancagua", "Talca", "Puerto Montt", "Arica"
    //Colombia
    , "Bogota", "Medellin", "Cali", "Barranquilla", "Cartagena", "Bucaramanga", "Pereira", "Santa Marta", "Manizales", "Cucuta"
    //Peru
    , "Lima", "Arequipa", "Trujillo", "Chiclayo", "Piura", "Iquitos", "Cusco", "Chimbote", "Huancayo", "Puno"
    


];

// -------------------------Weather GIFs-------------------------

function getWeatherGif(condition) {
    const map = {
        'Thunderstorm': 'thunder.gif',
        'Drizzle': 'cloudy2.gif',
        'Rain': 'rain.gif',
        'Snow': 'snow.gif',
        'Clear': 'sun.gif',
        'Clouds': 'clouds.gif',
        'Mist': 'wind.gif',
        'Fog': ' foggy.gif',
        'Haze': 'cloudy2.gif',
        'Smoke': 'cloudy2.gif',
        'Dust': 'wind.gif',
        'Sand': 'wind.gif',
        'Ash': 'foggy.gif',
        'Squall': 'storm.gif',
        'Tornado': 'storm.gif'
    };

    return `assets/icons/${map[condition] || 'cloudy.gif'}`;
}


// -------------------------Weather API Logic-------------------------
async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('City not found');
    return res.json();
}

// -------------------------Card Logic-------------------------
function createWeatherCard({ name, main, weather, wind, sys }) {
    return `
        <div class="weather-card collapsible-card">
            <div class="card-main">
                <h2>${name}${sys && sys.country ? ', ' + sys.country : ''}</h2>
                <img src="${getWeatherGif(weather[0].main)}" alt="${weather[0].description}" class="animated-weather-icon">
                <div class="temp">${Math.round(main.temp)}°C</div>
                <div class="d-flex">
                <button class="dropdown-toggle" aria-label="Show details">
                    <span class="triangle">&#9660;</span>
                </button>
                <button class="forecast-toggle" data-city="${name}">
                    <span class="forecast-label"><lord-icon
    src="https://cdn.lordicon.com/utdckhgo.json"
    trigger="loop"
    stroke="bold"
    state="loop-cycle"
    style="width:30px;height:30px"
    class="forecast-icon">
</lord-icon></span>
                </button>
                </div>
            </div>
            <div class="card-details">
                <div class="condition">${weather[0].main} - ${weather[0].description}</div>
                <div>Wind: ${Math.round(wind?.speed || 0)} m/s</div>
                <div>Max: ${Math.round(main.temp_max)}°C | Min: ${Math.round(main.temp_min)}°C</div>
                <div class="humidity">Humidity: ${main.humidity}%</div>
            </div>
        </div>
    `;
}



function renderResultWeatherCard(data) {
    return `
        <div class="result-weather-card collapsible-card">
            <div class="card-main">
                <img src="${getWeatherGif(data.weather[0].main)}" alt="${data.weather[0].description}" class="animated-weather-icon">
                <div>
                    <h2>${data.name}, ${data.sys.country}</h2>
                    <div class="temp size">${Math.round(data.main.temp)}°C</div>
                </div>
                <div class="d-flex">
                <button class="dropdown-toggle" aria-label="Show details">
                    <span class="triangle">&#9660;</span>
                </button>
                <button class="forecast-toggle" data-city="${data.name}">
                    <span class="forecast-label"><lord-icon
    src="https://cdn.lordicon.com/utdckhgo.json"
    trigger="loop"
    stroke="bold"
    state="loop-cycle"
    style="width:30px;height:30px"
    class="forecast-icon">
</lord-icon></span>
                </button>
                </div>
            </div>
            <div class="card-details">
                <div class="condition">${data.weather[0].main} - ${data.weather[0].description}</div>
                <div>Wind: ${Math.round(data.wind.speed)} m/s</div>
                <div>Max: ${Math.round(data.main.temp_max)}°C | Min: ${Math.round(data.main.temp_min)}°C</div>
                <div class="humidity">Humidity: ${data.main.humidity}%</div>
            </div>
        </div>
    `;
}

// -------------------------Refresh Btn-------------------------
document.addEventListener('DOMContentLoaded', () => {
    

     document.body.addEventListener('click', async (e) => {
    if (e.target.closest('.forecast-toggle')) {
        const city = e.target.closest('.forecast-toggle').dataset.city;
        try {
            showAlert('Loading forecast...');
            const forecast = await fetch5DayForecast(city);
            showForecastPopup(forecast, city);
        } catch {
            showAlert('Forecast unavailable.', 'error');
        }
    }
});



    
    const refreshBtn = document.getElementById('refresh-btn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => window.location.reload());
    }
   
});
// -------------------------Default Cards Loader-------------------------
async function loadDefaultCards() {
    defaultCardsContainer.innerHTML = '';
    for (const city of defaultCities) {
        try {
            const data = await fetchWeather(city);
            defaultCardsContainer.innerHTML += createWeatherCard(data);
        } catch (err) {
            defaultCardsContainer.innerHTML += `
                <div class="weather-card">
                    <h2>${city}</h2>
                    <div style="color:#ffb3b3;">Weather data unavailable</div>
                </div>
            `;
        }
    }
    addMoreInfoLabels();
}

// -------------------------Suggestion Logic-------------------------
document.addEventListener('DOMContentLoaded', () => {
    const fetchBtn = document.getElementById('fetch-weather');
    const cityInput = document.getElementById('city-input');
    const weatherDisplay = document.getElementById('weather-display');
    const suggestionsContainer = document.getElementById('city-suggestions');

    // Suggestions for popular cities
    cityInput.addEventListener('input', function() {
        const value = this.value.trim().toLowerCase();
        suggestionsContainer.innerHTML = '';
        if (value.length === 0) return;

        const matches = popularCities.filter(city =>
            city.toLowerCase().startsWith(value)
        ).slice(0, 6);

        if (matches.length > 0) {
            const ul = document.createElement('ul');
            matches.forEach(city => {
                const li = document.createElement('li');
                li.textContent = city;
                li.addEventListener('click', function() {
                    cityInput.value = city;
                    suggestionsContainer.innerHTML = '';
                });
                ul.appendChild(li);
            });
            suggestionsContainer.appendChild(ul);
        }
    });

    document.addEventListener('click', function(e) {
        if (e.target !== cityInput) {
            suggestionsContainer.innerHTML = '';
        }
    });

    // -------------------------Search Button Logic-------------------------
    fetchBtn.addEventListener('click', async () => {
        const city = cityInput.value.trim();
        if (!city) {
            showAlert('Please enter a city name.', 'error');
            weatherDisplay.textContent = '';
            return;
        }
        weatherDisplay.textContent = showAlert('Just a moment, fetching weather...');
        try {
            const data = await getWeather(city);
            weatherDisplay.innerHTML = renderResultWeatherCard(data);
            showAlert(`Weather loaded for ${data.name}!`, 'success');
        } catch (error) {
            weatherDisplay.innerHTML = `<div style="color:#ffb3b3;">Weather data unavailable</div>`;
            showAlert('City not found or weather data unavailable.', 'error');
        }
        addMoreInfoLabels();
    });
// -------------------------Alert Logic-------------------------
function showAlert(message, type = "success") {
    const alertContainer = document.getElementById('alert-container');

    // Lordicon SVGs for success/loading and error
    const icon = type === "success"
        ? `<lord-icon
              src="https://cdn.lordicon.com/ygymzvsj.json"
              trigger="loop"
              stroke="bold"
              state="hover-loading"
              style="width:64px;height:64px;">
           </lord-icon>`
        : `<lord-icon
              src="https://cdn.lordicon.com/gdfrsvpt.json"
              trigger="loop"
              stroke="bold"
              style="width:64px;height:64px;">
           </lord-icon>`;

    const alertDiv = document.createElement('div');
    alertDiv.className = `custom-alert ${type}`;
    alertDiv.innerHTML = `<span class="alert-icon">${icon}</span><span>${message}</span>`;

    alertContainer.appendChild(alertDiv);

    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}


    // -------------------------Initial Load of Default Cards-------------------------
    loadDefaultCards();

    document.getElementById('weather-form').addEventListener('submit', function(e) {
        e.preventDefault();
        document.getElementById('fetch-weather').click();
    });
});

// -------------------------Event Delegation for Card Dropdowns-------------------------
document.addEventListener('click', function (e) {
    const toggle = e.target.closest('.dropdown-toggle');
    if (toggle) {
        const card = toggle.closest('.collapsible-card');
        const details = card.querySelector('.card-details');
        const triangle = toggle.querySelector('.triangle');
        if (card && details && triangle) {
            const expanded = card.classList.toggle('expanded');
            if (expanded) {
                details.style.maxHeight = details.scrollHeight + 'px';
                triangle.style.transform = 'rotate(180deg)';
            } else {
                details.style.maxHeight = '0';
                triangle.style.transform = 'rotate(0deg)';
            }
        }
    }
});

// Auto-show tooltip 3 seconds after DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  const target = document.getElementById('fetch-weather');
  if (target) {
    setTimeout(() => {
      showTooltip(target, 'Press this button to fetch the weather or hit the Enter');
    }, 3000); // 3 seconds delay
  }
});


// Add "More info" label to all dropdown-toggles (run after DOM updates)
function addMoreInfoLabels() {
    document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
        if (!toggle.querySelector('.more-info-label')) {
            const label = document.createElement('span');
            label.className = 'more-info-label';
            label.textContent = 'info';
            toggle.appendChild(label);
        }
    });
}
// -------------------------5-Day Forecast Logic-------------------------
async function fetch5DayForecast(city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Forecast not available');
    const data = await res.json();

    // Filter: get one forecast per day at 12:00 PM
    const daily = data.list.filter(entry => entry.dt_txt.includes("12:00:00")).slice(0, 5);

    return daily.map(entry => ({
        date: new Date(entry.dt_txt).toLocaleDateString(undefined, { weekday: 'short' }),
        temp: Math.round(entry.main.temp),
        icon: getWeatherGif(entry.weather[0].main),
        desc: entry.weather[0].main
    }));
}
function showForecastPopup(forecast, cityName) {
    const existing = document.getElementById('forecast-popup');
    if (existing) existing.remove();

    const container = document.createElement('div');
    container.id = 'forecast-popup';
    container.className = 'forecast-popup-overlay';

    const card = document.createElement('div');
    card.className = 'forecast-popup-card';
    card.innerHTML = `<h2>5-Day Forecast for ${cityName}</h2>`;

    const forecastHTML = document.createElement('div');
    forecastHTML.className = 'forecast-container';

    forecast.forEach(day => {
        forecastHTML.innerHTML += `
            <div class="forecast-card">
                <div>${day.date}</div>
                <img src="${day.icon}" class="small-weather-icon" alt="${day.desc}">
                <div>${day.temp}°C</div>
                <div>${day.desc}</div>
            </div>
        `;
    });
const closeBtn = document.createElement('span');
closeBtn.className = 'forecast-close-btn';
closeBtn.innerHTML = '&times;';
closeBtn.setAttribute('aria-label', 'Close forecast popup');
closeBtn.addEventListener('click', () => container.remove());

    card.appendChild(closeBtn);
card.appendChild(forecastHTML);
container.appendChild(card);
document.body.appendChild(container);

}

// -------------------------Alert Logic-------------------------
function showAlert(message, type = "success") {
    const alertContainer = document.getElementById('alert-container');

    // Lordicon SVGs for success/loading and error
    const icon = type === "success"
        ? `<lord-icon
              src="https://cdn.lordicon.com/ygymzvsj.json"
              trigger="loop"
              stroke="bold"
              state="hover-loading"
              style="width:64px;height:64px;">
           </lord-icon>`
        : `<lord-icon
              src="https://cdn.lordicon.com/gdfrsvpt.json"
              trigger="loop"
              stroke="bold"
              style="width:64px;height:64px;">
           </lord-icon>`;

    const alertDiv = document.createElement('div');
    alertDiv.className = `custom-alert ${type}`;
    alertDiv.innerHTML = `<span class="alert-icon">${icon}</span><span>${message}</span>`;

    alertContainer.appendChild(alertDiv);

    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}


