import {
  h,
  app
} from 'hyperapp';

export const Forecast = (forecast, link) =>
  forecast ?
  <div class="w3-card" ng-show="forecast">
    <header class="w3-container w3-theme">
      <h5>Forecast</h5>
    </header>

    <a class="link-div" href={link} target="_blank">
      <table class="w3-table">
        <tr>
          <th>Day</th>
          <th></th>
          <th>High</th>
          <th>Low</th>
        </tr>
        {forecast.map(v=>
          <tr>
            <td>{v.day} {v.date}</td>
            <td>{v.text}</td>
            <td>{v.high}</td>
            <td>{v.low}</td>
          </tr>
        )}
      </table>
    </a>
  </div> : <span></span>
