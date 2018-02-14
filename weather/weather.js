const config = require('../config/config');
const request = require('request');

var getWeather = (latitude, longitde, callback) => {
  let url = config.apiUrl;
  let apiKey = config.apiKeyValue;
  
  request({
    url: `${url}/${apiKey}/${latitude},${longitde}`,
    json: true
  }, (error, response, body) => {

    if (!error && response.statusCode === 200) {
      //DEBUGGING CODE
      //console.log(body.currently);

      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    } else {
      callback('Unable to fetch weather.');
    }
  });
};

module.exports.getWeather = getWeather;