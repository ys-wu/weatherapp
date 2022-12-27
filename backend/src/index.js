// const debug = require('debug')('weathermap');

const Koa = require('koa');
const router = require('koa-router')();
const fetch = require('node-fetch');
const bodyParser = require('koa-body-parser');
const cors = require('kcors');

const appId = process.env.APPID;

const defaultMapEndpoint = 'http://api.openweathermap.org/data/2.5';
const mapURI = process.env.MAP_ENDPOINT || defaultMapEndpoint;

const port = process.env.PORT || 9000;

const app = new Koa();
app.use(bodyParser());
app.use(cors());

const fetchWeather = async (coords, type) => {
  const endpoint = `${mapURI}/${type}?lat=${coords.latitude}&lon=${coords.longitude}&appid=${appId}&`;
  const response = await fetch(endpoint);

  return response.ok ? response.json() : {};
};

router.post('/api/current', async (ctx) => {
  const coords = ctx.request.body;
  const currentData = await fetchWeather(coords, 'weather');
  const weather = currentData && {
    country: currentData.sys.country,
    city: currentData.name,
    description: currentData.weather[0].description,
    icon: currentData.weather[0].icon.slice(0, -1),
    temp: Math.round(currentData.main.temp - 273.15),
    tempMin: Math.round(currentData.main.temp_min - 273.15),
    tempMax: Math.round(currentData.main.temp_max - 273.15),
  };

  ctx.type = 'application/json; charset=utf-8';
  ctx.body = weather;
});

router.post('/api/forecast', async (ctx) => {
  const coords = ctx.request.body;
  const forecastData = await fetchWeather(coords, 'forecast');
  const forecast = forecastData && forecastData.list.map((item) => {
    return {
      key: item.dt,
      datetime: item.dt_txt.slice(0, -3),
      icon: item.weather[0].icon.slice(0, -1),
      temp: Math.round(item.main.temp - 273.15),
    };
  });

  ctx.type = 'application/json; charset=utf-8';
  ctx.body = forecast;
});

app.use(router.routes());
app.use(router.allowedMethods());

const server = app.listen(port);

console.log(`App listening on port ${port}`);

module.exports = server;
