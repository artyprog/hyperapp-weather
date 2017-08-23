import {
  h,
  app
} from 'hyperapp';

export const PubDate = pubDate =>
  pubDate ?
  <span>{pubDate}</span> :
  <span></span>
