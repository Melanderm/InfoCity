Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _reactNative = require('react-native');

var _index = require('./AppButton/index.js');

var SimpleView = function (_Component) {
  babelHelpers.inherits(SimpleView, _Component);

  function SimpleView(props) {
    babelHelpers.classCallCheck(this, SimpleView);

    var _this = babelHelpers.possibleConstructorReturn(this, (SimpleView.__proto__ || Object.getPrototypeOf(SimpleView)).call(this, props));

    _this.state = {
      specialText: ''
    };

    _this.changeText = _this.changeText.bind(_this);
    return _this;
  }

  babelHelpers.createClass(SimpleView, [{
    key: 'changeText',
    value: function changeText() {
      return this.state.specialText !== "" ? this.setState({ specialText: "" }) : this.setState({ specialText: "Special" });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _reactNative.View,
        { style: styles.container },
        _react2.default.createElement(_index.Button, {
          text: 'Button',
          onPress: this.changeText
        }),
        _react2.default.createElement(
          _reactNative.Text,
          null,
          this.state.specialText
        )
      );
    }
  }]);
  return SimpleView;
}(_react.Component);

exports.default = SimpleView;


var styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});