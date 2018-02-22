/**
* A simple route calculator
* @param {latitude: Number, longitude: Number}, {latitude: Number, longitude: Number}
* @return {polyline: [{GeoLocation}], time: Number(seconds), distance: Number(meter)}
**/

function Route(start, end) {

  let settings = require('./settings.json');
  const polyline = require("google-polyline") ;
  const API_KEY = settings.apikey;
  const MODE = 'walking';
  let GeoLocation = require("../geolocation/GeoLocation.js");

  this.getRoute = function (origin, destination) {

    let url = this.buildUrl(origin, destination);

    return new Promise((resolve, reject) => {
      fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.routes.length) {

          // Decode polyline to coordinates array
          let coordinates = polyline.decode(responseJson.routes[0].overview_polyline.points);

          // Empty array to hold [{latLng}]
          let latLng = [];

          // Iterate over array and build latLng-objects
          coordinates.map((c) => {
              var obj = new GeoLocation(c[0], c[1]);
              latLng.push(obj);
            });

          let obj = {
            polyline: latLng,
            distance: this.computeTotalDistance(responseJson),
            time: this.computeTotalTime(responseJson),
          };

          resolve(obj);
        } else {
          reject('no route found, check coordinates');
        }
      }).catch((e) => {
        reject(e);
      });
    });
  };

  this.buildUrl = function(origin, destination) {
    return settings.url + origin.latitude + ',' + origin.longitude + '&destination=' + destination.latitude + ',' + destination.longitude + '&key=' + API_KEY + '&mode=' + MODE;
  };

  this.computeTotalDistance = function(result) {
      let total = 0;
      let myroute = result.routes[0];
      for (var i = 0; i < myroute.legs.length; i++) {
        total += myroute.legs[i].distance.value;
      }

      return total;  //meters
    };

  this.computeTotalTime = function(result) {
      let total = 0;
      let myroute = result.routes[0];

      for (var i = 0; i < myroute.legs.length; i++) {
        total += myroute.legs[i].duration.value;
      }

      return total; // seconds
    };
}

module.exports = Route;
