import {
  h,
  app
} from 'hyperapp';

import {
  Input
} from './input.jsx';

export const City = (observable) =>
  <div>
      <label class="w3-label" for="city">Location</label>
      {Input('city', observable, 'City, State', 800 )}
  </div>
