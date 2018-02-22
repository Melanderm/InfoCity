Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Button = undefined;

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _reactNative = require('react-native');

var _styles = require('./styles.js');

var _styles2 = babelHelpers.interopRequireDefault(_styles);

var Button = exports.Button = function Button(props) {

  return _react2.default.createElement(
    _reactNative.View,
    null,
    _react2.default.createElement(
      _reactNative.TouchableHighlight,
      {
        style: [_styles2.default.circleContainer, _styles2.default.addButton],
        onPress: props.onPress },
      _react2.default.createElement(
        _reactNative.Text,
        { style: _styles2.default.text },
        props.text
      )
    ),
    _react2.default.createElement(
      _reactNative.Text,
      null,
      'iOS component'
    )
  );
};