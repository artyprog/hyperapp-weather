import {
  h,
  app
} from 'hyperapp';

export const Button = (action, text) =>
  <button  class="w3-button w3-theme"  onclick={action}>{text}</button>;
