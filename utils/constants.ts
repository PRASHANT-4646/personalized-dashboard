export const API_ENDPOINTS = {
  WEATHER: 'https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&current=temperature_2m,weather_code',
  NEWS: 'https://newsapi.org/v2/top-headlines?country=us&apiKey=YOUR_NEWS_API_KEY',
  CRYPTO: 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd',
  DOG: 'https://dog.ceo/api/breeds/image/random',
};
export const WIDGET_CONFIGS = {
  weather: { title: 'Weather', minW: 2, minH: 2 },
  news: { title: 'Top News', minW: 4, minH: 3 },
  crypto: { title: 'Crypto Prices', minW: 2, minH: 2 }, 
  dog: { title: 'Random Dog', minW: 2, minH: 2 },
};