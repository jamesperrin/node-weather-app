require('dotenv').config();
const config = require('./config/config');
const yargs = require('yargs');
const axios = require('axios');

// var url = config.apiUrl;
// var apiKey = config.apiKeyValue;
// const lat = '47.6587802';
// const lon = '-117.4260465';

// Receive User input
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


const url = config.apiUrl;
const apiKey = config.apiKeyValue;
const encodedAddress = encodeURIComponent(argv.address);
const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Call Google Maps API
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
axios.get(geocodeUrl).then((response) => {

  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find that address.');
  }

  // DEBUGGING CODE
  //console.log(response.data);

  const latitude = response.data.results[0].geometry.location.lat;
  const longitude = response.data.results[0].geometry.location.lng;
  const weatherUrl = `${url}/${apiKey}/${latitude},${longitude}`;

  console.log(`\nAddress: ${response.data.results[0].formatted_address}`);
  
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Call Weather API - Creating new Promise
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  return axios.get(weatherUrl);

}).then((response) => {
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Receive data from Weather API
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const temperature = response.data.currently.temperature;
  const apparentTemperature = response.data.currently.apparentTemperature;

  console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.\n`);

}).catch((e) => {
  if (e.code === 'ENOTFOUND') {
    console.log('Unable to connect to API severs.');
  } else {
    console.log(e.message);
  }
});