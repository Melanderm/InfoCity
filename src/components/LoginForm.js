import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  AsyncStorage,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { loginUser, mailChanged, passwordChanged } from '../actions';
import { Container, ContainerSection, Input, SquareButton } from './common';
const { width, height } = Dimensions.get('window');
let count = 0;

class LoginForm extends Component {


  constructor(props) {
    super(props);
    this.state = {
      messageError: '',
      showWarning: false
    };
  }

  componentWillMount() {
    try {
      if (count == 0) {
          AsyncStorage.getItem('InfoCityUser').then((user) => {
              if (user !== null)
                  this.props.navigation.navigate('map');
          });
          count++;
      }
    } catch (err) {
      this.setState({ showWarning: true, messageError: 'Error while logging in' });
    }
  }
  onButtonPress() {

    if (this.props.email === 'Demo' && this.props.password === 'demo') {
      
      const { email, password } = this.props;
      
      this.props.loginUser({ email, password })
      this.props.navigation.navigate('map');

    } else {
      this.setState({ showWarning: true, messageError: 'Wrong credentials' });
    }
  }

  onMailChange(text) {
    this.props.mailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }
  showWarning() {
    if (this.state.showWarning) {
      return (
        <View style={styles.warning}>
          <Text style={styles.warningText}>{this.state.messageError}</Text>
        </View>
      )
    }
  }
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
      <Container>
        <ContainerSection>

          <Input
            title=""
            placeholder="Username"
            onChangeText={this.onMailChange.bind(this)}
            value={this.props.mail}
          />
        </ContainerSection>
        <ContainerSection>
          <Input
            title=""
            secureTextEntry
            label="Password"
            placeholder="password"
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
          />
        </ContainerSection>
        <ContainerSection style={{ alignItems: 'center', justifyContent: 'center' }}>
          <SquareButton onPress={this.onButtonPress.bind(this)}>
            Login
          </SquareButton>
        </ContainerSection>
       
      </Container>
       {this.showWarning()}
       </View>
    );
  }
}

const styles = StyleSheet.create({
  warning: {
    width: width,
    height: 100,
    backgroundColor: '#f55',
    position: 'absolute',
    left: 0, 
    bottom: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  warningText: {
    fontSize: 30,
    color: '#fff',
    fontFamily: 'Avenir Book'
  }
})

const mapStateToProps = ({ auth }) => {
  const { email, password, loading } = auth;

  return { email, password, loading };
}

export default connect(mapStateToProps, { loginUser, mailChanged, passwordChanged })(LoginForm);