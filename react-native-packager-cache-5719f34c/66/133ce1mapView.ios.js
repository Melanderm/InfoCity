Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _reactNative = require('react-native');

var _reactNativeMaps = require('react-native-maps');

var _reactNativeMaps2 = babelHelpers.interopRequireDefault(_reactNativeMaps);

var width = _reactNative.Dimensions.get('window').width;
var height = _reactNative.Dimensions.get('window').height;

var SCREEN_HEIGHT = height;
var SCREEN_WIDTH = width;
var ASPECT_RATIO = width / height;
var LATITUDE_DELTA = 0.092;
var LONGITUTE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

var mapView = function (_Component) {
    babelHelpers.inherits(mapView, _Component);

    function mapView(props) {
        babelHelpers.classCallCheck(this, mapView);

        var _this = babelHelpers.possibleConstructorReturn(this, (mapView.__proto__ || Object.getPrototypeOf(mapView)).call(this, props));

        _this.watchID = null;


        _this.state = {
            initialPosition: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0,
                longitudeDelta: 0
            },
            markerPosition: {
                latitude: 0,
                longitude: 0
            }

        };
        return _this;
    }

    babelHelpers.createClass(mapView, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            navigator.geolocation.getCurrentPosition(function (position) {
                var lat = parseFloat(position.coords.latitude);
                var long = parseFloat(position.coords.longitude);

                var initialRegion = {
                    latitude: lat,
                    longitude: long,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUTE_DELTA
                };

                _this2.setState({ initialPosition: initialRegion });
                _this2.setState({ markerPosition: initialRegion });
            }, function (error) {
                return alert(JSON.stringify(error));
            }, { enableHeigtAccuracy: true, timeout: 20000, maximumAge: 1000 });

            this.watchID = navigator.geolocation.watchPosition(function (position) {
                var lat = parseFloat(position.coords.latitude);
                var long = parseFloat(position.coords.longitude);

                var lastRegion = {
                    latitude: lat,
                    longitude: long,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUTE_DELTA
                };

                _this2.setState({ initialPosition: lastRegion });
                _this2.setState({ markerPosition: lastRegion });
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            navigator.geolocation.clearWatch(this.watchID);
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _reactNative.View,
                { style: styles.container },
                _react2.default.createElement(
                    _reactNativeMaps2.default,
                    {
                        provider: _reactNativeMaps.PROVIDER_GOOGLE,
                        style: styles.map,
                        region: this.state.initialPosition
                    },
                    _react2.default.createElement(_reactNativeMaps2.default.Marker, {
                        coordinate: this.state.markerPosition,
                        title: "Current position",
                        description: "My current position"
                    })
                ),
                _react2.default.createElement(
                    _reactNative.Text,
                    null,
                    _react2.default.createElement(
                        _reactNative.Text,
                        { style: styles.title },
                        'Initial position: '
                    ),
                    this.state.lastPosition
                )
            );
        }
    }]);
    return mapView;
}(_react.Component);

exports.default = mapView;


mapView.propTypes = {
    provider: _reactNativeMaps2.default.ProviderPropType
};

var styles = _reactNative.StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    map: {
        height: height - 200,
        width: width
    }
});

module.exports = mapView;