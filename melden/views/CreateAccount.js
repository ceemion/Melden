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
import {
  inputBorder
} from '../utils/colors';
import {
  titleHeight
} from '../utils/variables';
import DismissKeyboard from "dismissKeyboard";
import TopBar from './TopBar';

import * as firebase from "firebase";
import Database from '../firebase/database';

class CreateAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      responseType: "",
      response: ""
    };

    this.createAccount = this.createAccount.bind(this);
  }

  async createAccount() {
    DismissKeyboard();
    this.setState({
      responseType: 'busy',
      response: 'Creating your Melden account...'
    })

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
        responseType: error.toString().split(':')[0],
        response: error.message
      })
    }
  }

  render() {
    return (
      <View onPress={() => {DismissKeyboard()}}>
        <TopBar
          title="Create Account"
          leftIcon={true}
          navigator={this.props.navigator}
        />

        <View style={styles.container}>
          <View>
            <Text>{this.state.response}</Text>
          </View>

          <TextInput
            style={styles.textInput}
            onChangeText={(name) => this.setState({name})}
            value={this.state.name}
            autoCapitalize="words"
            placeholder="name"
            autoFocus={true}
          />
          <TextInput
            style={styles.textInput}
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}
            autoCapitalize="none"
            placeholder="email address"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.textInput}
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
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: titleHeight,
    paddingTop: 25
  },
  textInput: {
    borderColor: inputBorder,
    borderWidth: 1,
    height: 40,
    marginBottom: 25,
    marginLeft: 10,
    marginRight: 10,
    padding: 10
  }
});

export default CreateAccount;
