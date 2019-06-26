const path = require('path');

const express = require('express');
const debug = require('debug')('app:index');
const morgan = require('morgan');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(morgan('dev'));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'));

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'ajx'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'ajx'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'ajx'
  });
});

app.get('/weather', (req, res) => {
  const { address } = req.query;
  if (!address) {
    return res.send({
      error: 'Address is required'
    });
  }

  geocode(address, (err, data) => {
    if (err) {
      return res.send({ err });
    }
    forecast(data, (err, forecastData) => {
      if (err) {
        return res.send({ err });
      }
      res.send({
        forecast: forecastData,
        location: data.location
      });
    });
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    error: 'Help article not found'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    error: 'Page not found'
  });
});

app.listen(PORT, () => {
  debug(`Web server started successfully on ${PORT}`);
});
