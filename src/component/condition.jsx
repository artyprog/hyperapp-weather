import {
  h,
  app
} from 'hyperapp';

export const Condition = (condition, link) =>
  condition ?
  <div class="w3-card" ng-show="condition">
    <header class="w3-container w3-theme">
      <h5>Current</h5>
    </header>

    <a class="link-div" href={link} target="_blank">
      <div class="w3-container">
        <p>Temperature: {condition.temp}</p>
        <p>Condition: {condition.text}</p>
      </div>
    </a>
  </div> :
  <span></span>
