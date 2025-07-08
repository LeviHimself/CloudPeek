// src/app.js

import { getWeather } from './weatherApi.js';

// -------------------------Default & Popular Cities-------------------------
const defaultCities = ['Karachi', 'Los angeles','London','Dehli'];
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
];

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
                <img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="${weather[0].main}">
                <div class="temp">${Math.round(main.temp)}°C</div>
                <button class="dropdown-toggle" aria-label="Show details">
                    <span class="triangle">&#9660;</span>
                </button>
            </div>
            <div class="card-details">
                <div class="condition">${weather[0].main} - ${weather[0].description}</div>
                <div>Wind: ${wind ? Math.round(wind.speed) : '-'} m/s</div>
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
                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" alt="${data.weather[0].main}">
                <div>
                    <h2>${data.name}, ${data.sys.country}</h2>
                    <div class="temp size">${Math.round(data.main.temp)}°C</div>
                </div>
                <button class="dropdown-toggle" aria-label="Show details">
                    <span class="triangle">&#9660;</span>
                </button>
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
    // ...existing code...
    const refreshBtn = document.getElementById('refresh-btn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => window.location.reload());
    }
    // ...existing code...
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
    enableCardDropdowns();
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
        weatherDisplay.textContent = 'Loading...';
        try {
            const data = await getWeather(city);
            weatherDisplay.innerHTML = renderResultWeatherCard(data);
            enableCardDropdowns();
            showAlert(`Weather loaded for ${data.name}!`, 'success');
        } catch (error) {
            weatherDisplay.innerHTML = `<div style="color:#ffb3b3;">Weather data unavailable</div>`;
            showAlert('City not found or weather data unavailable.', 'error');
        }
    });
// -------------------------Alert Logic-------------------------
function showAlert(message, type = "success") {
    const alertContainer = document.getElementById('alert-container');
    const icon = type === "success" ? "✅" : "⚠️";
    const alertDiv = document.createElement('div');
    alertDiv.className = `custom-alert ${type}`;
    alertDiv.innerHTML = `<span class="alert-icon">${icon}</span>${message}`;
    alertContainer.appendChild(alertDiv);

    // Remove alert after animation
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

    // -------------------------Initial Load of Default Cards-------------------------
    loadDefaultCards();

    document.getElementById('weather-form').addEventListener('submit', function(e) {
        e.preventDefault();
        // Call your weather fetch logic here, e.g.:
        document.getElementById('fetch-weather').click();
    });
});

function enableCardDropdowns() {
    document.querySelectorAll('.collapsible-card').forEach(card => {
        const toggle = card.querySelector('.dropdown-toggle');
        const details = card.querySelector('.card-details');
        const triangle = card.querySelector('.triangle');
        // Add "More info" label if not already present
        if (toggle && !toggle.querySelector('.more-info-label')) {
            const label = document.createElement('span');
            label.className = 'more-info-label';
            label.textContent = 'More info';
            toggle.appendChild(label);
        }
        if (toggle && details) {
            details.style.maxHeight = '0';
            details.style.overflow = 'hidden';
            details.style.transition = 'max-height 0.3s cubic-bezier(.4,0,.2,1)';
            toggle.addEventListener('click', () => {
                const expanded = card.classList.toggle('expanded');
                if (expanded) {
                    details.style.maxHeight = details.scrollHeight + 'px';
                    triangle.style.transform = 'rotate(180deg)';
                } else {
                    details.style.maxHeight = '0';
                    triangle.style.transform = 'rotate(0deg)';
                }
            });
        }
    });
}



