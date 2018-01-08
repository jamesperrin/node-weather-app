const request = require('request');

const address = 'Spokane, WA';

request({
  url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
  json: true
}, (error, response, body) => {

  if (error) {
    console.log(error);
  } else {
    // console.log(JSON.stringify(body, undefined, 2));

    console.log("\n-----\n");

    console.log(`Address: ${body.results[0].formatted_address}`);
    console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
    console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
  }

});