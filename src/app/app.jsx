/*
hyperapp dependencies
 */
import {
  h,
  app
} from 'hyperapp';
/*
app sepcific dependencies
 */
import {
  City,
  Condition,
  Forecast,
  Heading,
  Location,
  PubDate
} from 'component';
import {
  exists
} from 'service/utils';
import {
  getForecast,
  forecast
} from 'service/forecast';

/*
implement functional components vs. components.
see: https://guide.elm-lang.org/reuse/
*/

const actions = {
  forecast: (state, actions, data) => {
    console.log(data);
    return {
      forecast: data
    }
  }
};

const observables = {
  city: (state, actions) => city => exists(city) ? getForecast(actions.forecast, city) : actions.forecast({})
};

const state = {
  city: '',
  forecast: {}
};

const view = (state, actions) =>
  <main class="w3-container">
     <div class="w3-row-padding">
       <div class="w3-col m8 l6">
         {Heading()}
       </div>
     </div>
     <div class="w3-row-padding">
       <div class="w3-col m8 l6">
         {City(observables.city(state, actions))}
       </div>
     </div>
     <div class="w3-margin-top w3-row-padding">
       <div class="w3-col m12 l3">
         <div class="w3-large">
           {Location(forecast.location(state.forecast))}
         </div>
       </div>
     </div>
     <div class="w3-margin-top w3-row-padding">
       <div class="w3-col m12 l3">
         <div>
           {PubDate(forecast.pubDate(state.forecast))}
         </div>
       </div>
     </div>
     <div class="w3-margin-top w3-row-padding">
       <div class="w3-col m8 l6">
         {Condition(forecast.condition(state.forecast), forecast.link(state.forecast))}
       </div>
     </div>
     <div class="w3-margin-top w3-margin-bottom w3-row-padding">
       <div class="w3-col m8 l6">
         {Forecast(forecast.forecast(state.forecast), forecast.link(state.forecast))}
       </div>
     </div>
   </main>;

app({
  actions: actions,
  state: state,
  view: view
});
