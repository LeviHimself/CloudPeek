const API_KEY = '4c4f90532fa2eb253fe1e3b4862d4e50';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export async function getWeather(city) {
    const response = await axios.get(BASE_URL, {
        params: {
            q: city,
            appid: API_KEY,
            units: 'metric'
        }
    });
    return response.data;
}