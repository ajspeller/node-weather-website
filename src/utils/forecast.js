require('dotenv').config();
const request = require('request');

const forecast = ({ longitude: lon, latitude: lat }, callback) => {
  const url = `https://api.darksky.net/forecast/${
    process.env.APIKEY
  }/${lat},${lon}`;
  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback('Unable to connect to weather service!', undefined);
      return;
    }
    if (body.error) {
      callback('Unable to find location!', undefined);
      return;
    }
    const { temperature, precipProbability } = body.currently;
    const { summary } = body.daily.data[0];
    callback(undefined, {
      summary,
      temperature,
      precipProbability
    });
  });
};

module.exports = forecast;
