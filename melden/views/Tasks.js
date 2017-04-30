/**
 * @class Tasks
 */

import React, { Component } from 'react';
import {
    Text,
    View,
    Button,
    AlertIOS,
    StyleSheet,
    dismissKeyboard,
    TouchableWithoutFeedback
} from 'react-native';

import {
  titleHeight
} from '../utils/variables';
import {
  text,
  textMute
} from '../utils/colors';
import DismissKeyboard from "dismissKeyboard";

import * as firebase from "firebase";

import TopBar from './TopBar';
import CreateTaskIcon from '../assets/images/header_bar_icons/create_task.png';

class Tasks extends Component {
  constructor(props) {
    super(props);

    // status in pending, completed, deleted

    this.state = {
      dailyTasks: [
        {title: 'Study design patterns in Ruby', status: 'pending', completed_at: null},
        {title: "Listen to Benny Hinn's message on Secrets to Success", status: 'completed', completed_at: new Date().toString()}
      ]
    };

    this.renderTasks = this.renderTasks.bind(this);
    this.createTask = this.createTask.bind(this);
  }

  async componentDidMount() {
    try {
      // Get all tasks for current date

      this.setState({})
    } catch(error) {
      console.log(error);
    }
  }

  renderTasks() {
    return this.state.dailyTasks.map((task, $index) => {
      return (
        <View key={$index} style={styles.taskContainer}>
          <Text style={styles.taskTitle}>{task.title}</Text>
        </View>
      )
    })
  }

  async createTask(promptValue) {
    let all = this.state.dailyTasks;

    all.push(
      {title: promptValue, status: 'pending', completed_at: null}
    )

    this.setState({
      dailyTasks: all
    });

    // try {
    //   let user = await firebase.auth().currentUser;

    //   user.updateProfile({
    //     displayName: this.state.name
    //   });

    //   Database.updateUserData(user.uid, {
    //     name: this.state.name
    //   })
    // }
    // catch(error) {
    //   console.log('update error: ', error)
    // }
  }

  render() {
    const currentDate = new Date().toDateString();

    return (
      <View style={styles.container} onPress={() => {DismissKeyboard()}}>
        <TopBar
          title="Tasks"
          right={true}
          rightIcon={CreateTaskIcon}
          rightOnPress={() => AlertIOS.prompt(
            'Add Task',
            null,
            this.createTask,
            'plain-text'
            )}
        />

        <View style={styles.content}>
          <Text style={styles.currentDate}>Today: {currentDate}</Text>

          <View style={styles.tasksContainer}>
            {this.renderTasks()}
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    marginTop: titleHeight
  },
  currentDate: {
    color: textMute,
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center'
  },
  tasksContainer: {
    marginLeft: 4,
    marginRight: 4
  },
  taskContainer: {
    borderColor: text,
    borderRadius: 6,
    borderWidth: 1,
    marginBottom: 4,
    paddingBottom: 8,
    paddingTop: 12
  },
  taskTitle: {
    color: text,
    fontSize: 20
  }
});

export default Tasks;
