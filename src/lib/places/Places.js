/**
 * Created by mikaelmelander on 2017-05-12.
 */
const GOOGLE_PLACES_API_KEY = 'AIzaSyCj2pVcvA3Kcw_wty1xG7NAqB0PKXQ2IoE';

function Places() {

    this.getPlaces = function (location, type, radius) {
        let color;

        if (type === 'restaurant')
            color = 'green';
        else if (type === 'shopping')
            color = 'blue';
        else if (type === 'attraction')
            color = 'red';

        let url = 'https://maps.googleapis.com/maps/api/place/textsearch/json?location=' + location.latitude + ',' + location.longitude + '&query=' + type + '&radius=' + radius + '&key=' + GOOGLE_PLACES_API_KEY;

        return new Promise((resolve, reject) => {
            fetch(url, {headers: {Accept: 'application/json'}}).then((response) => {
                let array = JSON.parse(response._bodyInit).results;
                let placesArr = [];
                let obj = {};

                if (JSON.parse(response._bodyInit).results.length) {
                  for (let i=0; i<array.length; i++ ) {

                      obj = {
                          place_id: array[i].place_id,
                          name: array[i].name,
                          vicinity: array[i].vicinity,
                          rating: array[i].rating,
                          color: color,
                          image: "https://maps.googleapis.com/maps/api/place/photo?maxwidth=50&photoreference=CmRYAAAAKzEp9jsPysZBGAFxGCQi5TkVd7oWYeT9MiN4qgOfSNaV5z1gjh4YHyl0s55PTKHLLNEuFzjzOyGVb8F-YIQYwxxukNUTNWUwJBHOrIumB5jOJpCDl1ArL1VK30cSnS5HEhD46xFOICScHmvvZCjBhp8aGhTlV94R1iXuqagDTOTl7kZ248pGBQ&key=AIzaSyCj2pVcvA3Kcw_wty1xG7NAqB0PKXQ2IoE",
                          geometry: {
                              latitude: array[i].geometry.location.lat,
                              longitude: array[i].geometry.location.lng,
                          },
                          status: 'ok',
                      };
                      placesArr.push(obj);
                  }
                } else {
                    // Create dummy object to not cause error on MapView.Marker in MapView.ios.js.render()
                    obj = {
                        place_id: "none",
                        name: "no name",
                        vicinity: "no vacinity",
                        rating: "no rating",
                        color: "no color",
                        image: "no image",
                        geometry: {
                            latitude: 0,
                            longitude: 0,
                        },
                        status: 'fail',
                    };
                    placesArr.push(obj);
                }

                resolve(placesArr);
            }).catch((e) => {
                reject(e);
            });
        });
    };
}

module.exports = Places;
