require('dotenv').config();
const config = require('./config/config');
const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');
const request = require('request');

// var url = config.apiUrl;
// var apiKey = config.apiKeyValue;
// const lat = '47.6587802';
// const lon = '-117.4260465';

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help().alias('help', 'h')
  .argv;

// DEBUGGING CODE
//console.log(argv);

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    // console.log(JSON.stringify(results, undefined, 2));
    console.log(results.address);

    //Gets weather
    weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        //console.log(JSON.stringify(results, undefined, 2));
        console.log(`It's currently ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemperature}.`);
      }
    });
  }
});