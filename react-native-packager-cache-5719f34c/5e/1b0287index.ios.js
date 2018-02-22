var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _SimpleView = require('./components/SimpleView');

var _SimpleView2 = babelHelpers.interopRequireDefault(_SimpleView);

var _reactNative = require('react-native');

var RootNav = require('./components/mapView');
var dbPedia = require('./components/dbPedia');

var InfoCity = function (_Component) {
    babelHelpers.inherits(InfoCity, _Component);

    function InfoCity(props) {
        babelHelpers.classCallCheck(this, InfoCity);

        var _this = babelHelpers.possibleConstructorReturn(this, (InfoCity.__proto__ || Object.getPrototypeOf(InfoCity)).call(this, props));

        _this.state = {
            selectedTab: 'map'
        };
        return _this;
    }

    babelHelpers.createClass(InfoCity, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                _reactNative.TabBarIOS,
                { selectedTab: this.state.selectedTab,
                    tintColor: 'black',
                    barTintColor: '#3498db' },
                _react2.default.createElement(
                    _reactNative.TabBarIOS.Item,
                    {
                        title: 'MapView',
                        selected: this.state.selectedTab === 'map',
                        icon: { img: '' },
                        onPress: function onPress() {
                            _this2.setState({
                                selectedTab: 'map'
                            });
                        } },
                    _react2.default.createElement(_reactNative.NavigatorIOS, {
                        style: styles.container,
                        initialRoute: {
                            title: 'map',
                            component: RootNav
                        },
                        barTintColor: '#3498db',
                        titleTextColor: '#FFFFFF'
                    })
                ),
                _react2.default.createElement(
                    _reactNative.TabBarIOS.Item,
                    {
                        title: 'dbPedia',
                        selected: this.state.selectedTab === 'dbPedia',
                        icon: { img: '' },
                        onPress: function onPress() {
                            _this2.setState({
                                selectedTab: 'dbPedia'
                            });
                        } },
                    _react2.default.createElement(_reactNative.NavigatorIOS, {
                        style: styles.container,
                        initialRoute: {
                            title: 'Hello dbPedia world!',
                            component: dbPedia
                        },
                        barTintColor: '#3498db',
                        titleTextColor: '#FFFFFF'
                    })
                ),
                _react2.default.createElement(
                    _reactNative.TabBarIOS.Item,
                    {
                        title: 'SimpleView',
                        selected: this.state.selectedTab === 'SimpleView',
                        icon: { img: '' },
                        onPress: function onPress() {
                            _this2.setState({
                                selectedTab: 'SimpleView'
                            });
                        } },
                    _react2.default.createElement(_reactNative.NavigatorIOS, {
                        style: styles.container,
                        initialRoute: {
                            title: 'Component Playground',
                            component: _SimpleView2.default
                        },
                        barTintColor: '#3498db',
                        titleTextColor: '#FFFFFF'
                    })
                )
            );
        }
    }]);
    return InfoCity;
}(_react.Component);

var styles = _reactNative.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#bdc3c7'
    },
    tabbar: {
        tintColor: '#2ecc71',
        backgroundColor: '#2ecc71'

    }
});

_reactNative.AppRegistry.registerComponent('InfoCity', function () {
    return InfoCity;
});