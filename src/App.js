import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { TabNavigator, StackNavigator } from 'react-navigation';

import reducers from './reducers';
import MapScreen from './screens/MapScreen';
import DetailsScreen from './screens/DetailsScreen';
//import MapViewer from '../components/mapView';
import LoginForm from './components/LoginForm';


class App extends Component {

  componentWillMount() {
    // If we are authing with an external service (-> firebase?), put init logic here

  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    const MainNavigator = TabNavigator(
      {
        login: { screen: LoginForm },
        map: {
          screen: StackNavigator({
            map: { screen: MapScreen },
            details: { screen: DetailsScreen }

          })
        }
      }, {
         initialRouteName: 'login',
          lazy: true,
          animationEnabled: false,
          navigationOptions: {
            tabBarVisible: false,
          }
      }
    );
    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    );

  }
}

export default App;
