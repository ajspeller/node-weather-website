require('dotenv').config();
const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${process.env.TOKEN}`;
  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback('Unable to connect to location services!', undefined);
      return;
    }
    if (!body.features.length) {
      callback('Unable to find location!', undefined);
      return;
    }
    const [longitude, latitude] = body.features[0].center;
    const { place_name: location } = body.features[0];
    callback(undefined, {
      latitude,
      longitude,
      location
    });
  });
};

module.exports = geocode;
