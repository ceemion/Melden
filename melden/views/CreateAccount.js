/**
 * @class CreateAccount
 */

import React, { Component } from 'react';
import {
    Text,
    View,
    TextInput,
    Button,
    StyleSheet,
    dismissKeyboard,
    TouchableHighlight,
    TouchableWithoutFeedback
} from 'react-native';
import DismissKeyboard from "dismissKeyboard";

import * as firebase from "firebase";
import Database from '../firebase/database';

class CreateAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      response: ""
    };

    this.createAccount = this.createAccount.bind(this);
  }

  async createAccount() {
    DismissKeyboard();
    this.setState({response: 'Creating your Melden account...'})

    try {
      await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);
      let user = await firebase.auth().currentUser;

      Database.setsUserData(user.uid, this.state.name, this.state.email)

      this.setState({
        response: "Account created"
      });

      this.props.navigator.push({
        name: "Tasks"
      })
    }
    catch(error) {
      this.setState({
        response: error.toString()
      })
    }
  }

  render() {      
    return (
      <TouchableWithoutFeedback onPress={() => {DismissKeyboard()}}>
        <View>
          
          <Text>Create Account</Text>
          <View>
            <TouchableHighlight onPress={() => this.props.navigator.pop()}>
              <Text>Back</Text>
            </TouchableHighlight>
          </View>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(name) => this.setState({name})}
            value={this.state.name}
            autoCapitalize="words"
            placeholder="name"
          />
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}
            autoCapitalize="none"
            placeholder="email address"
            keyboardType="email-address"
          />
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
            autoCapitalize="none"
            placeholder="password"
            password={true}
          />

          <View>
            <Button
              onPress={this.createAccount}
              title="Create account"
              color="#4a4a4a"
              accessibilityLabel="create account"
            />
          </View>

          <View>
            <Text>{this.state.response}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default CreateAccount;
