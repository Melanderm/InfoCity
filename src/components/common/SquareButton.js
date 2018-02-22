import React from 'react';
import { Text, TouchableOpacity, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');
const SquareButton = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#000',
    fontFamily: 'Avenir-Book',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  buttonStyle: {
    width: width / 3,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#000',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom:10
  }
};

export { SquareButton };