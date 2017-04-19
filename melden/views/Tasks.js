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

import TopBar from './TopBar';

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
      <View>
        <TopBar title="Tasks" />

        <View style={styles.content}>
          <Text>Welcome to Tasks</Text>
          <Text>Hello UserId: {this.state.uid}</Text>
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

export default Tasks;
