import {
  h,
  app
} from 'hyperapp';
import {
  debounce,
  fromEvent,
  map,
  observe
} from 'most';

export const Input = (id, placeholder, debounce, action, observable) => {
  const keyup = e => {
    fromEvent('keyup', document.getElementById(e.id))
      .debounce(debounce)
      .map(e => e.target.value)
      .observe(v => observable(action, v));
  };
  return <input id={id} class="w3-input w3-border" type="text" placeholder={placeholder ? placeholder : ''} oncreate={keyup}/>;
};