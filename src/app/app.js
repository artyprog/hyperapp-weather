const {
  h,
  app
} = require("hyperapp")
const hyperx = require("hyperx")
const html = hyperx(h)
const {
  debounce,
  fromEvent,
  map,
  observe
} = require('most')

/*
implement functional components vs. components.
see: https://guide.elm-lang.org/reuse/
*/
const InputDebounced = (id, placeholder, action) => {
  const keyup = e => {
    fromEvent('keyup', document.getElementById(e.id))
      .debounce(500)
      .map(e => e.target.value)
      .observe(v => action(v))
  };
  return html `
  <input
    id=${id} class="w3-input w3-border" type="text" placeholder=${placeholder}
    oncreate=${keyup}/>
`
};
const Button = (action, text) => html `
<button
  class="w3-button w3-theme"
  onclick=${action}>${text}</button>
`;
app({
  state: {
    city: '',
    count: 0
  },
  view: (state, actions) =>
    html `
    <main class="w3-container">
      <h1>
        ${state.count}
      </h1>
      ${Button(actions.add, '+')}
      ${Button(actions.sub, '-')}
      ${InputDebounced('city','City...',actions.getForecast)}
    </main>`,
  actions: {
    add: state => ({
      count: state.count + 1
    }),
    sub: state => ({
      count: state.count - 1
    }),
    getForecast: (state, actions, data) => {
      console.log(data);
      return {
        city: data
      }
    }
  }
})
