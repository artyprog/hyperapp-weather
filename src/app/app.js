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
  isEmpty
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

const apis = {
  getForecast: getForecast
};

const actions = {
  add: state => ({
    count: state.count + 1
  }),
  sub: state => ({
    count: state.count - 1
  }),
  forecast: (state, actions, data) => {
    console.log(data);
    return {
      forecast: data
    }
  }
};

const observables = {
  city: (action, city) => isEmpty(city) ? action({}) : apis.getForecast(action, city)
};

const state = {
  city: '',
  count: 0,
  forecast: {}
}
app({
  state: state,
  view: (state, actions) =>
    html `
    <main class="w3-container">
      <h1>
        ${state.count}
      </h1>
      ${Button(actions.add, '+')}
      ${Button(actions.sub, '-')}
      ${Input('city', 'City...', 800, actions.forecast, observables.city)}
      <p>${JSON.stringify(state.forecast)}</p>
    </main>`,
  actions: actions
});
