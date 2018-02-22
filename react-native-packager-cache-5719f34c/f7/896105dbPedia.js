Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _reactNative = require('react-native');

var parseString = require('react-native-xml2js').parseString;

var dbPedia = function (_Component) {
  babelHelpers.inherits(dbPedia, _Component);

  function dbPedia(props) {
    babelHelpers.classCallCheck(this, dbPedia);

    var _this = babelHelpers.possibleConstructorReturn(this, (dbPedia.__proto__ || Object.getPrototypeOf(dbPedia)).call(this, props));

    _this.onPressButton = function () {
      var url = 'http://lookup.dbpedia.org/api/search.asmx/KeywordSearch?QueryClass=place&QueryString=san%20francisco';

      fetch(url, { headers: { Accept: 'application/json' } }).then(function (response) {
        _this.setState({ article: JSON.parse(response._bodyInit).results[0].description });
      }).catch(function (e) {
        console.log(e);
      });
    };

    _this.state = {
      article: 'This will be an article'
    };
    return _this;
  }

  babelHelpers.createClass(dbPedia, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _reactNative.View,
        { style: styles.container },
        _react2.default.createElement(
          _reactNative.TouchableHighlight,
          { style: styles.button, onPress: this.onPressButton },
          _react2.default.createElement(
            _reactNative.Text,
            null,
            'Click me'
          )
        ),
        _react2.default.createElement(
          _reactNative.Text,
          null,
          this.state.article
        )
      );
    }
  }]);
  return dbPedia;
}(_react.Component);

exports.default = dbPedia;


var styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    padding: 20,
    paddingTop: 55
  },
  button: {
    padding: 12,
    backgroundColor: 'lightblue'
  }
});

module.exports = dbPedia;