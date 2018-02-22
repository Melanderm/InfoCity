/**
 * Created by mikaelmelander on 2017-05-04.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { mapLocationChanged } from '../actions';
import MapView, { PROVIDER_GOOGLE, Polyline } from 'react-native-maps'
let Route = require("../lib/route/Route");
let GeoLocation = require("../lib/geolocation/GeoLocation.js");
let mapStyle = require("./styles/mapStyle");

let Article = require("../lib/article/Article.js");
let PlaceDetails = require("../lib/places/placeDetails.js");

let width = Dimensions.get('window').width;

class detailedPlaceView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            open: '',
            adress: '',
            phonenumber: '',
            pedia: '',
            geometry: {
                latitude: 0,
                longitude: 0,
            },
            region: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0,
                longitudeDelta: 0
            }
        };
    }

    componentDidMount() {
        this.getPlaceDetails();
    }

    getPlaceDetails() {

        let placeDetail = new PlaceDetails();
        let placeid = this.props.locationId || 'ChIJ1fg-z2okV0YRYjB6-gZye-k';
        console.log("This is the current placeID: ", placeid);
        placeDetail.getDetails(placeid).then((a) => {
            // returns object of place details
            this.setState(a);
            this.getDBPedia(this.state.name);
        }).catch((e) => {
            console.log("ERROR " + e);
        });
    }

    isOpen() {
            if (this.state.open)
                return '(Open)';
            else
                return '(Closed)';

    }

    colorFunction(text) {
        if (text==='(Open)')
            return 'green';
        else
            return 'red';
    }

    getDBPedia(queryString) {

        let dbPedia = new Article();
        dbPedia.getArticle(queryString).then((a) => {
            // returns array of articles with label, payload and a status that can be used for further functionality
            this.setState({pedia: a[0].payload});
        }).catch((e) => {
            console.log("ERROR " + e);
        });

    }


    render() {
        return (
            <View style={styles.container}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    region={this.state.region}
                    showsUserLocation={true}
                    followsUserLocation={true}
                    customMapStyle={mapStyle}
                    showsPointsOfInterest={false}
                    zoomEnabled={false}
                    rotateEnabled={false}
                    scrollEnabled={false}
                    pitchEnabled={false}
                    >
                     <MapView.Marker
                        key={this.state.place_id}
                        coordinate={this.state.geometry}
                        title={this.state.name}
                        pinColor="blue"
                    />
                </MapView>

                <View style={{position: 'absolute', right: 10, top: 115}}><Text style={styles.boldtextSmall}>Distance: </Text>
                    <Text style={styles.text}>{this.props.route.dtd}m</Text><Text style={styles.boldtextSmall}>Time: </Text>
                    <Text style={styles.text}>{Math.floor(this.props.route.ttd / 60)}m {this.props.route.ttd - Math.floor(this.props.route.ttd / 60) * 60} s</Text>
                </View>


                <View style={{flexDirection: 'row'}}><Text style={styles.headline}>{this.state.name}</Text></View>
                <Text style={styles.open}>{this.isOpen()}</Text>


                { this.state.adress.length > 1 ?
                    <View>
                        <Text style={styles.boldText}>Adress:</Text>
                        <Text style={styles.text}>{this.state.adress}</Text>
                    </View>
                    :
                    <Text></Text>
                }



                { this.state.phonenumber.length > 1 ?
                    <View>
                        <Text style={styles.boldText}>Phone number:</Text>
                        <Text style={styles.text}>{this.state.phonenumber}</Text>
                    </View>
                    :
                    <Text></Text>
                }


                { this.state.pedia.length > 1 ?
                    <View>
                        <Text style={styles.boldText}>Intresting facts:</Text>
                        <ScrollView bounces={false}
                                    automaticallyAdjustContentInsets={false}
                                    contentInset={{top: 2, left: 0, bottom: 2, right: 0}}
                        >
                            <Text style={styles.text}>{this.state.pedia}</Text>
                        </ScrollView>
                    </View>
                    :
                    <Text></Text>
                }




            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        padding: 0,
        paddingTop: 0,
    },
    map: {
         height: 200,
         width: width
    },
    headline: {
        fontSize: 25,
        padding: 4,
        color: "#3498db",
        fontFamily: 'Ubuntu-Bold'
    },
    boldText: {
        fontSize: 20,
        padding: 4,
        color: "#3498db",
        fontFamily: 'Ubuntu-Medium'
    },
    text: {
        fontSize: 15,
        padding: 2,
        fontFamily: 'Ubuntu-Light',
        backgroundColor: 'rgba(0,0,0,0)'
    },
    boldtextSmall: {
        fontSize: 15,
        padding: 2,
        color: "#3498db",
        fontFamily: 'Ubuntu-Medium',
        backgroundColor: 'rgba(0,0,0,0)'
    },
    open: {
        fontSize: 15,
        padding: 4,
        color: this.colorFunction,
        fontFamily: 'Ubuntu-Light'
    }
});

const mapStateToProps = ({mapView}) => {
    const {locationId, route} = mapView;

    return {
        locationId, route
    };
};

export default connect(mapStateToProps, { mapLocationChanged })(detailedPlaceView);
