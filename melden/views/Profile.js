/**
 * @class Profile
 */

import React, { Component } from 'react';
import {
    Text,
    View,
    Button,
    AlertIOS,
    StyleSheet
} from 'react-native';

import {
  titleHeight
} from '../utils/variables';

import * as firebase from "firebase";
import Database from '../firebase/database';

import TopBar from './TopBar';
import UpdateProfileIcon from '../assets/images/header_bar_icons/update_profile.png';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: null,
      name: null,
      email: null
    };

    this._updateProfile = this._updateProfile.bind(this);
    this.logout = this.logout.bind(this);
  }

  async componentDidMount() {
    try {
      let user = await firebase.auth().currentUser;

      this.setState({
        uid: user.uid,
        email: user.email,
        name: user.displayName
      })
    } catch(error) {
      console.log(error);
    }
  }

  async _updateProfile(promptValue) {
    this.setState({
      name: promptValue
    });

    try {
      let user = await firebase.auth().currentUser;

      user.updateProfile({
        displayName: this.state.name
      });

      Database.updateUserData(user.uid, {
        name: this.state.name
      })
    }
    catch(error) {
      console.log('update error: ', error)
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
      <View>
        <TopBar
          title="Profile"
          right={true}
          rightIcon={UpdateProfileIcon}
          rightOnPress={() => AlertIOS.prompt(
            'Update Your Profile',
            this.state.name ? null : "What's your name?",
            this._updateProfile,
            'plain-text',
            this.state.name ? this.state.name : ''
            )}
        />

        <View style={styles.content}>
          <Text>Profile</Text>
          <Text>the profile of {this.state.uid}</Text>
          <Text>email: {this.state.email}</Text>
          <Text>name: {this.state.name}</Text>

          <Button
            onPress={this.logout}
            title="Logout"
            color="#841584"
            accessibilityLabel="logout"
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    marginTop: titleHeight
  }
});

export default Profile;
