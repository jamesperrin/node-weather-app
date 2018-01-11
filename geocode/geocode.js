const request = require('request');

var geocodeAddress = (address, callback) => {
  // Check User input ensuring an address was provided.
  if (!address) {
    console.log('Address was not provided');
    process.exit(1);
  }

  var encodedAddress = encodeURIComponent(address);

  // console.log("\n-----\n");
  // console.log(address);
  // console.log(encodedAddress);

  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json: true
  }, (error, response, body) => {
    // Validation
    if (error) {
      callback('Unable to connect to Google servers.');
    } else if (body.status === 'ZERO_RESULTS') {
      callback('Unable to find that address.');
    } else if (body.status === 'OK') {
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      });
    }
  });
};

module.exports = {
  geocodeAddress
};