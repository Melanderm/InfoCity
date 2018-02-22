import React, { Component } from 'react';
import {
  Text,
  View, 
  StyleSheets,
  TouchableHighlight,
    Image
} from 'react-native';

import styles from './styles.js'; 

export const Button = (props) => {

  return(
    <View>
      <TouchableHighlight 
        style={[styles.circleContainer, styles.addButton]}
        onPress={props.onPress}>
        <Image
            style={styles.stretch}
            source={props.image}
        />
        </TouchableHighlight>
    </View>
  );
};


