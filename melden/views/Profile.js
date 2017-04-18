/**
 * @class Profile
 */

import React, { Component } from 'react';
import {
    Text,
    View,
    Button,
    StyleSheet
} from 'react-native';

import * as firebase from "firebase";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: null,
      name: null,
      email: null
    };

    this.logout = this.logout.bind(this);
  }

  async componentDidMount() {
    try {
      let user = await firebase.auth().currentUser;

      this.setState({
        uid: user.uid
      })
    } catch(error) {
      console.log(error);
    }
  }

  async logout() {
    try {
      await firebase.auth().signOut();

      this.props.navigator.push({
        name: "Login"
      })
    }
    catch(error) {
      console.log(error)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Profile</Text>
        <Text>the profile of {this.state.uid}</Text>

        <Button
          onPress={this.logout}
          title="Logout"
          color="#841584"
          accessibilityLabel="logout"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 64
  }
});

export default Profile;
