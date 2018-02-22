/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

//Imports
import React, { Component } from 'react';
var RootNav = require('./components/mapView');
var dbPedia = require('./components/dbPedia');
import SimpleView from './components/SimpleView';
import GooglePlaces from './components/googlePlaces';

import {
    AppRegistry,
    StyleSheet,
    NavigatorIOS,
    TabBarIOS,
    StatusBar

} from 'react-native';


class InfoCity extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'map'
        };
    }

    render() {
        return (

            <TabBarIOS selectedTab={this.state.selectedTab}
                       tintColor="black"
                       barTintColor="#3498db">

                <TabBarIOS.Item
                    title="MapView"
                    selected={this.state.selectedTab === 'map'}
                    icon={{img: ''}}
                    onPress={() => {
                     this.setState({
                     selectedTab: 'map'
                     });
                    }}>
                    <NavigatorIOS
                        style={styles.container}
                        initialRoute={{
                          title: 'map',
                          component: RootNav
                          }}
                        barTintColor="#3498db"
                        titleTextColor="#FFFFFF"
                    />
                </TabBarIOS.Item>

                <TabBarIOS.Item
                    title="dbPedia"
                    selected={this.state.selectedTab === 'dbPedia'}
                    icon={{img: ''}}
                    onPress={() => {
                     this.setState({
                     selectedTab: 'dbPedia'
                     });
                    }}>
                    <NavigatorIOS
                        style={styles.container}
                        initialRoute={{
                          title: 'Hello dbPedia world!',
                          component: dbPedia,
                          }}
                        barTintColor="#3498db"
                        titleTextColor="#FFFFFF"
                    />
                </TabBarIOS.Item>
                <TabBarIOS.Item
                title="SimpleView"
                selected={this.state.selectedTab === 'SimpleView'}
                icon={{img: ''}}
                onPress={() => {
                     this.setState({
                     selectedTab: 'SimpleView'
                     });
                    }}>
                <NavigatorIOS
                    style={styles.container}
                    initialRoute={{
                          title: 'Component Playground',
                          component: SimpleView,
                          }}
                    barTintColor="#3498db"
                    titleTextColor="#FFFFFF"
                />
            </TabBarIOS.Item>

                <TabBarIOS.Item
                    title="Places"
                    selected={this.state.selectedTab === 'Places'}
                    icon={{img: ''}}
                    onPress={() => {
                     this.setState({
                     selectedTab: 'Places'
                     });
                    }}>
                    <NavigatorIOS
                        style={styles.container}
                        initialRoute={{
                          title: 'Google Places',
                          component: GooglePlaces,
                          }}
                        barTintColor="#3498db"
                        titleTextColor="#FFFFFF"
                    />
                </TabBarIOS.Item>



            </TabBarIOS>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#bdc3c7',
    },
    tabbar: {
        tintColor: '#2ecc71',
        backgroundColor: '#2ecc71',
        
    }
});

AppRegistry.registerComponent('InfoCity', () => InfoCity);
