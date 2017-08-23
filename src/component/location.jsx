import {
  h,
  app
} from 'hyperapp';

export const Location = location =>
  location ?
  <span>{location.city}, {location.region} {location.country}</span> :
  <span></span>
