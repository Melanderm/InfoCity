/**
* A location object
* @param  Number, Number
* @return {latitude: Number, longitude: Number}, {latitude: Number, longitude: Number}
**/

function GeoLocation(la, lo) {

  if (isValid(la, lo)) {
    return {
      latitude: la,
      longitude: lo,
    };

  } else {
    throw new Error('Not correct longitude/latitude values');
  }
}

this.isValid = function(latitude, longitude) {
  return ((latitude >= -90 && latitude <= 90) && (longitude >= -180 && longitude <= 180));
};

module.exports = GeoLocation;
