import {
  h,
  app
} from 'hyperapp';

import {
  Input
} from './input.jsx';

export const City = (action, observable) =>
  <div>
      <label class="w3-label" for="city">Location</label>
      {Input('city', 'City, State', 800, action, observable)}
  </div>
