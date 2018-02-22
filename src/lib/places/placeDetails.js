/**
 * Created by mikaelmelander on 2017-05-12.
 */

import {
    Dimensions
} from 'react-native';

const GOOGLE_PLACES_API_KEY = 'AIzaSyCj2pVcvA3Kcw_wty1xG7NAqB0PKXQ2IoE';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.022;
const LONGITUTE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

function placeDetails() {

    this.checkIfValueExists = function (variable) {
        console.log(variable);

        if (variable != null)
            return variable;
        else
            return '';
    };

    this.getDetails = function (placeid) {
        let url = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=' + placeid + '&key=' + GOOGLE_PLACES_API_KEY;
        console.log(url);
        return new Promise((resolve, reject) => {
            fetch(url, {Accept: 'application/json'}).then((response) => {
                let details = JSON.parse(response._bodyInit).result;

                let obj = {};

                    // Checks if items exist to not cause error when building obj
                    let name = this.checkIfValueExists(details.name);
                    let adress = this.checkIfValueExists(details.formatted_address);
                    let number = this.checkIfValueExists(details.formatted_phone_number);
                    let raiting = this.checkIfValueExists(details.rating);
                    let open = this.checkIfValueExists(details.opening_hours.open_now);

                    obj = {
                        name: name,
                        adress: adress,
                        phonenumber: number,
                        raiting: raiting,
                        open: open,
                        geometry: {
                            latitude: details.geometry.location.lat,
                            longitude: details.geometry.location.lng,
                        },
                        region: {
                            latitude: details.geometry.location.lat,
                            longitude: details.geometry.location.lng,
                            latitudeDelta: LATITUDE_DELTA,
                            longitudeDelta: LONGITUTE_DELTA
                        },
                        status: 'ok',
                    };

                console.log('Details: ' + obj);
                resolve(obj);
            }).catch((e) => {
                reject(e);
            });
        });
    };

}

module.exports = placeDetails;


