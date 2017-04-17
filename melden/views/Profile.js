/**
 * @class Profile
 */

import React, { Component } from 'react';
import {
    Text,
    View,
} from 'react-native';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <View>
        <Text>Profile</Text>
        <Text>the profile</Text>
      </View>
    )
  }
}

export default Profile;
