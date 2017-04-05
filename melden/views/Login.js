/**
 * @class Login
 */

import React, { Component } from 'react';
import {
    Text,
    View,
    TextInput,
    Button,
    StyleSheet,
    dismissKeyboard,
    TouchableWithoutFeedback
} from 'react-native';
import DismissKeyboard from "dismissKeyboard";
import * as firebase from "firebase";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
        email: "",
        password: "",
        response: ""
    };

    this.login = this.login.bind(this);
    this.createAccount = this.createAccount.bind(this);
  }

  async login() {
    DismissKeyboard();

    try {
      await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);

      this.setState({
        response: "Logged in!"
      });

      setTimeout(() => {
        this.props.navigator.push({
          name: "Home"
        })
      }, 1500);
    }
    catch(error) {
      this.setState({
        response: error.toString()
      })
    }
  }

  createAccount() {
    this.props.navigator.push({
      name: "CreateAccount"
    })
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => {DismissKeyboard()}}>
        <View>
          <Text>melden</Text>

          <View>
            <Text>{this.state.response}</Text>
          </View>

          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
            autoCapitalize="none"
            password={true}
          />

          <View>
            <Button
              onPress={this.login}
              title="Login"
              color="#841584"
              accessibilityLabel="login"
            />
          </View>

          <Button
            onPress={this.createAccount}
            title="Create account"
            color="#00797f"
            accessibilityLabel="create account"
          />
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default Login;
