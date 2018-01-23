require('dotenv').config();
const config = require('./config/config');
const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const request = require('request');

// const argv = yargs
//   .options({
//     a: {
//       demand: true,
//       alias: 'address',
//       describe: 'Address to fetch weather for',
//       string: true
//     }
//   })
//   .help().alias('help', 'h')
//   .argv;

// // DEBUGGING CODE
// //console.log(argv);

// geocode.geocodeAddress(argv.address, (errorMessage, results) => {
//   if (errorMessage) {
//     console.log(errorMessage);
//   } else {
//     console.log(JSON.stringify(results, undefined, 2));
//   }
// });

var url = config.apiUrl;
var apiKey = config.apiKeyValue;
const lat = '47.6587802';
const lon = '-117.4260465';

request({
  url: `${url}/${apiKey}/${lat},${lon}`,
  json: true
}, (error, response, body) => {

  if (!error && response.statusCode === 200) {
    //DEBUGGING CODE
    //console.log(body.currently);

    console.log(`The current temperature is ${body.currently.temperature}.`);
  } else {
    console.error('Unable to fetch weather.');
  }
});