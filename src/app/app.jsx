const {
  h,
  app
} = require('hyperapp');

app({
  state: {
    count: 0
  },
  view: (state, actions) =>
    <main>
      <h1>{state.count}</h1>
      <button onclick={actions.sub}>ー</button>
      <button onclick={actions.add}>＋</button>
    </main>,
  actions: {
    sub: state => ({
      count: state.count - 1
    }),
    add: state => ({
      count: state.count + 1
    })
  }
})
