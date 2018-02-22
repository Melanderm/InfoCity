/**
 * Created by mikaelmelander on 2017-04-21.
 */
import React, { Component } from 'react';
import {
    View,
    Dimensions,
    NetInfo,
    Alert,
    Text,
    Image,
    ActivityIndicator,
    PropTypes
} from 'react-native';

import {
    Card,
    CardImage,
    CardContent,
} from 'react-native-card-view';
import { connect } from 'react-redux';

import { mapLocationChanged, selectMarker, userPositionChanged, getAsyncPosition, mapRouteChanged, mapRegionChanged, placeMarkersReset, placeMarkersChanged, logOutUser } from '../actions';
import MapView, { PROVIDER_GOOGLE, Polyline } from 'react-native-maps'
import { Button } from '../components/common/AppButton/index.js';

let Places = require("../lib/places/Places.js");
let Route = require("../lib/route/Route");
let GeoLocation = require("../lib/geolocation/GeoLocation.js");
let mapStyle = require("../components/styles/mapStyle");
let styles = require("../components/styles/MapScreenStyle");

const searchTypeVariable = 'restaurant%20shopping%20attraction';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
let hasCalledPlaces = false;

const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.032
const LONGITUTE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

class MapViewer extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerLeft: null,
        header: null
    });

    constructor(props) {
        super(props);
        
        this.state = {
            mapLoaded: false,
            isConnected: null,
            lastConnection: null,
        };
    }

    watchID: ?number = null;

    // gets current position and gives instruction to render
    componentWillMount() {
        this.getCurrentPosition();
    }

    componentWillReceiveProps(nextProps){
        
        if (this.props.route !== nextProps.route) {
            this.props.mapRouteChanged(nextProps.route);
        } 
    }

    getCurrentPosition() {

        navigator.geolocation.getCurrentPosition((position) => {
            let lat = parseFloat(position.coords.latitude);
            let long = parseFloat(position.coords.longitude);

            let initialRegion = {
                latitude: lat,
                longitude: long,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUTE_DELTA
            };

            this.props.userPositionChanged(initialRegion);

            // set the current position as the position of region
            this.props.mapRegionChanged(this.props.currentPosition);
        },
            (error) => alert(JSON.stringify(error)),
            { enableHeigtAccuracy: true, timeout: 20000, maximumAge: 1000 });

        this.watchID = navigator.geolocation.watchPosition((position) => {
            let lat = parseFloat(position.coords.latitude);
            let long = parseFloat(position.coords.longitude);

            let lastRegion = {
                latitude: lat,
                longitude: long,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUTE_DELTA
            };

            this.props.mapRegionChanged(lastRegion);


            // passing the region object just created to compare if it is > than the original region
            // Checks if the user has moved a distance so that it is relevant to update nearby places
            if (this.haveMovedFar(lastRegion)) {
                this.props.userPositionChanged(lastRegion);
                this.getPlaces(searchTypeVariable);
            } 
        })
    }

    resetMap() {
        this.props.mapRegionChanged(this.getCurrentPosition());
    }

    // hämtar events  från APIt
    getPlaces(types) {
        
        hasCalledPlaces = true;
        searchTypeVariable = types;
        
        let places = new Places();
        let location = new GeoLocation(this.props.currentPosition.latitude, this.props.currentPosition.longitude);
        // uses location(Lat,Long), type and radius
        // returns array of places within the search parameters.
        places.getPlaces(location, types, '250').then((a) => {

            this.props.placeMarkersChanged(a);
        }).catch((e) => {
            console.log("ERROR " + e);
        });
    }

    haveMovedFar(markerPosition) {
        
        const lng = this.props.currentPosition.longitude;
        const lat = this.props.currentPosition.latitude;

        const clng = markerPosition.longitude;
        const clat = markerPosition.latitude;
        
        let distance = this.getDistanceFromLatLonInKm(lng, lat, clng, clat);

        return (distance >= 0.5);
    }

    getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    let R = 6371; // Radius of the earth in km
    let dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
    let dLon = this.deg2rad(lon2 - lon1);
    let a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c; // Distance in km
    return d;
}

    deg2rad(deg) {
    return deg * (Math.PI / 180)
}

    componentDidMount() {
        NetInfo.isConnected.addEventListener('change', this.handleConnectivityChange);
        NetInfo.isConnected.fetch().done(
            (isConnected) => { this.setState({ isConnected });
             (this.state.isConnected) ? this.setState({lastConnection: true}) : this.setState({lastConnection: false});
             }

        );

        this.setState({ mapLoaded: true});
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
        
        this.props.placeMarkersReset();
        NetInfo.isConnected.removeEventListener('change', this.handleConnectivityChange)
    }

    handleConnectivityChange = (isConnected) => {
            if (!isConnected) {
            Alert.alert(
                'Connection Lost',
                'Your device has lost connection to the Internet',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
            )
        }
    };

    onRegionChangeComplete(region) {
        this.props.mapRegionChanged(region);
    }

    plotRoute(destination) {
        
        let origin = new GeoLocation(this.props.currentPosition.latitude, this.props.currentPosition.longitude);
        let directions = new Route();
        directions.getRoute(origin, destination).then(response => {
            let obj = {
                ttd: response.time,
                dtd: response.distance,
                polyline: response.polyline,
            };

            this.props.mapRouteChanged(obj);

            // Fit to polyline's lat/lng
            let edgePadding = {
                edgePadding: {
                    top: 100,
                    right: 150,
                    bottom: 100,
                    left: 150}
            };

            this.map.fitToCoordinates(this.props.route.polyline, edgePadding, true);
        }).catch(e => {
            // Will be called when there is no route. Alert traveler!
            Alert.alert(
                'No route found',
                'There is no simple way of reaching your destination :(',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
            )
            console.log("Error " + e);
        });

    }

    onPlaceMarkerDeselect() {
        
        let obj = {
            ttd: '',
            dtd: '',
            polyline: [],
        };
        
        this.props.mapRouteChanged(obj);
    }

    // only activated when user presses on the callout
    onPlaceMarkerPress(arg) {

        this.props.selectMarker(arg);
        this.props.mapLocationChanged(arg);

        const obj = {
            id: arg,
            route: this.props.route
        };

        this.props.getAsyncPosition(obj, () => {
            this.props.navigation.navigate('details');
        });

    }
    render() {

        if (!this.state.mapLoaded){
            return (
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <ActivityIndicator size="large" />
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    ref={ref => { this.map = ref; }}
                    style={styles.map}
                    region={this.props.region}
                    initialRegion={this.props.region}
                    onRegionChangeComplete={this.onRegionChangeComplete.bind(this)}
                    showsUserLocation={true}
                    followsUserLocation={true}
                    customMapStyle={mapStyle}
                >

                    {this.props.markers !== null && this.props.markers.map(place => (
                        <MapView.Marker
                            key={place.place_id}
                            coordinate={place.geometry}
                            title={place.name}
                            pinColor={place.color}
                            onPress={this.plotRoute.bind(this, place.geometry, place)}
                            onDeselect={this.onPlaceMarkerDeselect.bind(this)}
                        >
                            <MapView.Callout tooltip onPress={this.onPlaceMarkerPress.bind(this, place.place_id)}>
                                <Card>
                                    <CardImage>
                                        <Image
                                            source={{uri: place.image}}
                                        />
                                    </CardImage>
                                    <CardContent>
                                        <Text style={styles.cardTitleText}> {place.name} </Text>
                                        { place.rating ?
                                            <View>
                                                <Text style={styles.cardText}>Rating: {place.rating}</Text>
                                                <Text style={styles.cardTextUltraLight}>Press to read more...</Text>
                                            </View>
                                            :
                                            <Text style={styles.cardTextUltraLight}>Press to read more...</Text>
                                        }
                                    </CardContent>
                                </Card>
                            </MapView.Callout>
                        </MapView.Marker>
                    ))}
                    {
                        <MapView.Polyline
                            coordinates={
                                this.props.route.polyline
                            }
                            geodesic
                            strokeColor={"#3498db"}
                            strokeWidth={3}
                        />

                    }
                </MapView>

                <View style={{ position: 'absolute', left: 10, top: 25 }}><Button style={styles.BottomButton} image={require('../../assets/Icons/cross-out.png')} onPress={() => { this.props.logOutUser(this.props.user); this.props.navigation.navigate('login')}} /></View>

                <View style={{ position: 'absolute', right: 10, top: 25 }}><Button style={styles.BottomButton} image={require('../../assets/Icons/gps.png')} onPress={() => this.resetMap()} /></View>

                <View style={{ position: 'absolute', left: 10, bottom: 25 }}><Button style={styles.BottomButton} image={require('../../assets/Icons/food.png')} onPress={() => this.getPlaces('restaurant')} /></View>

                <View style={{ position: 'absolute', left: (width - 50) / 2, bottom: 25 }}><Button style={styles.BottomButton} image={require('../../assets/Icons/attraction.png')} onPress={() =>  this.getPlaces('attraction')} /></View>

                <View style={{ position: 'absolute', left: (width - 10 - 50), bottom: 25 }}><Button style={styles.BottomButton} image={require('../../assets/Icons/shopping.png')} onPress={() => this.getPlaces('shopping')} /></View>

            </View>


        );
    }

}

MapViewer.propTypes = {
    provider: MapView.ProviderPropType,
};

const mapStateToProps = ( state ) => {

    const { locationId, currentPosition, initialPosition, selectedMarkerPosition, route, markers, region } = state.mapView;
    const { user } = state.auth;
    return {
        locationId, currentPosition, initialPosition, selectedMarkerPosition, route, markers, region, user
    };
};

export default connect(mapStateToProps, {mapRouteChanged,  mapLocationChanged, selectMarker, userPositionChanged, getAsyncPosition, mapRegionChanged, placeMarkersChanged ,placeMarkersReset,logOutUser })(MapViewer);
