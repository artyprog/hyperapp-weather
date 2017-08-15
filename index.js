require("./w3.css");
require("./w3.theme.css");

const {
  h,
  app
} = require("hyperapp")
const hyperx = require("hyperx")
const html = hyperx(h)

app({
  state: {
    count: 0
  },
  view: (state, actions) => html `
  <main class="w3-container">
    <h1>${state.count}</h1>
    <button class="w3-button w3-theme" onclick=${actions.add}>+</button>
    <button class="w3-button w3-theme" onclick=${actions.sub}>-</button>
  </main>
  `,
  actions: {
    add: state => ({
      count: state.count + 1
    }),
    sub: state => ({
      count: state.count - 1
    })
  }
})
