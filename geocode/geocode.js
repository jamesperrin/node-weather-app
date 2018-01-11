const request = require('request');

var geocodeAddress = (address) => {
  // const address = 'Spokane, WA';
  //const address = argv.address;

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
      console.log(`Unable to connect to Google servers.`);
    } else if (body.status === 'ZERO_RESULTS') {
      console.log(`Unable to find that address.`);
    } else if (body.status === 'OK') {
      console.log(`Address: ${body.results[0].formatted_address}`);
      console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
      console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
    }
  });
};

module.exports = {
  geocodeAddress
};