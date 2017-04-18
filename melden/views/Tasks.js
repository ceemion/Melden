/**
 * @class Tasks
 */

import React, { Component } from 'react';
import {
    Text,
    View,
    Button,
    StyleSheet,
    TouchableWithoutFeedback
} from 'react-native';

import {
  titleHeight
} from '../utils/variables';

import * as firebase from "firebase";

class Tasks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: ""
    };
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

  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome to Tasks</Text>
        <Text>Hello UserId: {this.state.uid}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: titleHeight
  }
});

export default Tasks;
