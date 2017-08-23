import {
  get
} from 'axios';
import {
  compose,
  lensPath,
  split,
  view
} from 'ramda';
import {
  box,
  exists
} from 'service/utils';

const getForecast = (action, city) => {
  var q = 'select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + city + '")';

  get('https://query.yahooapis.com/v1/public/yql', {
      params: {
        q: q,
        format: 'json',
        env: 'store://datatables.org/alltableswithkeys'
      }
    })
    .then(response => {
      action(response.data)
    })
    .catch(error => {
      if (error.response) {
        /* The request was made and the server responded with a status code that falls out of the range of 2xx
         */
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        /* The request was made but no response was received
         `error.request` is an instance of XMLHttpRequest in the browser and an instance of
         http.ClientRequest in node.js
         */
        console.log(error.request);
      } else {
        /* Something happened in setting up the request that triggered an Error
         */
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
};

const parseLink = link =>
  /*
  the link yahoo returns does not work as is so split it and use the end of it.
  this is so much more concise in es2015.
  */
  box(link)
  .map(v => exists(link) ? link : '')
  .map(v => split('*', v))
  .map(v => v.length > 1 ? v[1] : undefined)
  .fold(v => v);


const lens = {
  channel: lensPath(['results', 'channel']),
  count: lensPath(['count']),
  condition: lensPath(['condition']),
  description: lensPath(['description']),
  forecast: lensPath(['forecast']),
  item: lensPath(['item']),
  link: lensPath(['link']),
  location: lensPath(['location']),
  pubDate: lensPath(['pubDate']),
  query: lensPath(['query']),
  wind: lensPath(['wind'])
};

const forecast = {
  condition: forecast => view(views.condition, forecast),
  count: forecast => view(views.count, forecast),
  description: forecast => view(views.description, forecast),
  forecast: forecast => view(views.forecast, forecast),
  link: forecast => parseLink(view(views.link, forecast)),
  location: forecast => view(views.location, forecast),
  pubDate: forecast => view(views.pubDate, forecast),
  wind: forecast => view(views.wind, forecast)
};

const views = {
  condition: compose(lens.query, lens.channel, lens.item, lens.condition),
  count: compose(lens.query, lens.count),
  description: compose(lens.query, lens.channel, lens.description),
  forecast: compose(lens.query, lens.channel, lens.item, lens.forecast),
  link: compose(lens.query, lens.channel, lens.link),
  location: compose(lens.query, lens.channel, lens.location),
  pubDate: compose(lens.query, lens.channel, lens.item, lens.pubDate),
  wind: compose(lens.query, lens.channel, lens.wind)
};

export {
  getForecast,
  forecast
}
