/*
hyperapp min dependencies
 */
const {
  h,
  app
} = require("hyperapp");
const hyperx = require("hyperx");
const html = hyperx(h);
/*
app sepcific dependencies
 */
const {
  get
} = require('axios');
const {
  debounce,
  fromEvent,
  map,
  observe
} = require('most');
const {
  compose,
  cond,
  F,
  isEmpty,
  isNil,
  lensPath,
  split,
  T,
  view
} = require('ramda');

const getForecast = (action, city) => {
  var q = 'select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + city + '")';

  get('https://query.yahooapis.com/v1/public/yql', {
      params: {
        q: q,
        format: 'json',
        env: 'store://datatables.org/alltableswithkeys'
      }
    })
    .then(function(response) {
      action(response.data)
    })
    .catch(function(error) {
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

const box = x => ({
  map: f => box(f(x)),
  fold: f => f(x)
});

const exists = cond([
  [isNil, F],
  [isEmpty, F],
  [T, T]
]);

const parseLink = link =>
  /*
  the link yahoo returns does not work as is so split it and use the end of it.
  this is so much more concise in es2015.
  */
  box(link)
  .map(function(v) {
    return exists(link) ? link : '';
  })
  .map(function(v) {
    return split('*', v);
  })
  .map(function(v) {
    return v.length > 1 ? v[1] : undefined;
  })
  .fold(function(v) {
    return v;
  });

/*
implement functional components vs. components.
see: https://guide.elm-lang.org/reuse/
*/
const Input = (id, placeholder, debounce, action, observable) => {
  const keyup = e => {
    fromEvent('keyup', document.getElementById(e.id))
      .debounce(debounce)
      .map(e => e.target.value)
      .observe(v => observable(action, v));
  };
  return html `
  <input
    id=${id} class="w3-input w3-border" type="text" placeholder=${placeholder ? placeholder : ''}
    oncreate=${keyup}/>
`
};

const Button = (action, text) => html `
<button
  class="w3-button w3-theme"
  onclick=${action}>${text}</button>
`;


const actions = {
  forecast: (state, actions, data) => {
    console.log(data);
    return {
      forecast: data
    }
  }
};
const apis = {
  getForecast: getForecast,
  parseLink: parseLink
};
const components = {
  Condition: (condition, link) =>
    condition ? html `
      <div class="w3-card" ng-show="condition">
        <header class="w3-container w3-theme">
          <h5>Current</h5>
        </header>

        <a class="link-div" href="${link}" target="_blank">
          <div class="w3-container">
            <p>Temperature: ${condition.temp}</p>
            <p>Condition: ${condition.text}</p>
          </div>
        </a>
      </div>
      ` : html `<span></span>`,
  Forecast: (forecast, link) =>
    forecast ? html `
      <div class="w3-card" ng-show="forecast">
        <header class="w3-container w3-theme">
          <h5>Forecast</h5>
        </header>

        <a class="link-div" href="${link}" target="_blank">
          <table class="w3-table">
            <tr>
              <th>Day</th>
              <th></th>
              <th>High</th>
              <th>Low</th>
            </tr>
            ${forecast.map(v=>html`
              <tr>
                <td>${v.day} ${v.date}</td>
                <td>${v.text}</td>
                <td>${v.high}</td>
                <td>${v.low}</td>
              </tr>
            `)}
          </table>
        </a>
      </div>
      ` : html `<span></span>`
};
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

const observables = {
  city: (action, city) => isEmpty(city) ? action({}) : apis.getForecast(action, city)
};
const weather = {
  condition: function(weather) {
    return view(views.condition, weather);
  },
  count: function(weather) {
    return view(views.count, weather);
  },
  description: function(weather) {
    return view(views.description, weather);
  },
  forecast: function(weather) {
    return view(views.forecast, weather);
  },
  link: function(weather) {
    return apis.parseLink(view(views.link, weather));
  },
  location: function(weather) {
    return view(views.location, weather);
  },
  pubDate: function(weather) {
    return view(views.pubDate, weather);
  },
  wind: function(weather) {
    return view(views.wind, weather);
  }
};

const state = {
  city: '',
  forecast: {}
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
app({
  state: state,
  view: (state, actions) =>
    html `
    <main class="w3-container">
      <h1>
        Weather Forecast
      </h1>
      <div class="w3-row-padding">
        <div class="w3-col m8 l6">
          <label class="w3-label" for="city">Location</label>
          ${Input('city', 'City, State', 800, actions.forecast, observables.city)}
        </div>
      </div>
      <div class="w3-margin-top w3-row-padding">
        <div class="w3-col m8 l6">
          ${components.Condition(weather.condition(state.forecast), weather.link(state.forecast))}
        </div>
      </div>
      <div class="w3-margin-top w3-margin-bottom w3-row-padding">
        <div class="w3-col m8 l6">
          ${components.Forecast(weather.forecast(state.forecast), weather.link(state.forecast))}
        </div>
      </div>
    </main>`,
  actions: actions
});
