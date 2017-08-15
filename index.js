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
  <main>
    <h1>${state.count}</h1>
    <button onclick=${actions.add}>+</button>
    <button onclick=${actions.sub}>-</button>
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
