import {
  h,
  app
} from 'hyperapp';

const components = {
  City: (action, observable) =>
    <div>
      <label class="w3-label" for="city">Location</label>
      {Input('city', 'City, State', 800, action, observable)}
    </div>,
  Condition: (condition, link) =>
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
      </div> : <span></span>,
  Forecast: (forecast, link) =>
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
                <td>{v.low}</td >
              </tr>
            )}
          </table>
        </a>
      </div> : <span></span>,
  Heading: () =>
    <h3>Weather Forecast<a class="w3-right" href="https://www.yahoo.com/?ilc=401" target="_blank"> <img src="https://poweredby.yahoo.com/purple.png" width="134" height="29"/></a></h3>,
  Location: location =>
    location ?
    <span>{location.city}, {location.region} {location.country}</span> : <span></span>,
  PubDate: pubDate =>
    pubDate ?
    <span>{pubDate}</span> : <span></span>
};

export {
  component.City, component.Condition, component.Forecast, component.Heading, component.Input, component.Location, component.PubDate
};
