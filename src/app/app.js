const {
  h,
  app
} = require("hyperapp")
const hyperx = require("hyperx")
const html = hyperx(h)

const City = (getForecast) => html `
<input class="w3-input w3-border" type="text" placeholder="City..." onkeyup=${getForecast}/>
`;


app({
  state: {
    city: '',
    count: 0
  },
  view: (state, actions) =>
    html `
    <main class="w3-container">
      ${City(actions.getForecast)}
      <h1>
        ${state.count}
      </h1>
      <button
        class="w3-button w3-theme"
        onclick=${actions.add}>+</button>
      <button
        class="w3-button w3-theme"
        onclick=${actions.sub}>-</button>
    </main>`,
  actions: {
    add: state => ({
      count: state.count + 1
    }),
    sub: state => ({
      count: state.count - 1
    }),
    getForecast: (state, actions, {
      target
    }) => {
      console.log(target.value);
      return {
        city: target.value
      }
    }
  }
})
