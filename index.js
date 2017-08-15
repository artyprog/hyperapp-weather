const {
  h,
  app
} = require("hyperapp")
const hyperx = require("hyperx")
const html = hyperx(h)

app({
  state: {
    message: "Hi."
  },
  view: state => html `<h1>${state.message}</h1>`
})
