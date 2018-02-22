var React = require('react-native');

var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: '#F5FCFF'
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    BottomButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
    },
    cardTitleText: {
        fontSize: 20,
        color: "#3498db",
        fontFamily: 'Ubuntu-Medium'

    },
    cardText:  {
        fontSize: 16,
        color: "#3498db",
        fontFamily: 'Ubuntu-Medium'
    },
    cardTextLight:  {
        fontSize: 15,
        color: "#3498db",
        fontFamily: 'Ubuntu-Light'
    },
    cardTextUltraLight:  {
        top: 5,
        fontSize: 12,
        color: "#3498db",
        fontFamily: 'Ubuntu-Light'
    },
    card: {
        width: 300
    }
});
