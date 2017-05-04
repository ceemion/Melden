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
    ActivityIndicator,
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
import moment from 'moment';

import * as firebase from "firebase";
import Database from '../firebase/database';

import TopBar from './TopBar';
import CreateTaskIcon from '../assets/images/header_bar_icons/create_task.png';

class Tasks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      working: true,
      dailyTasks: []
    };

    Database.listenForUserTasks().on('value', snapshot => {
        let taskArray = [];

        if (snapshot.val()) {
          let keys = Object.keys(snapshot.val());

          for (const key of keys) {
            let i = snapshot.val()[key];
            i.taskId = key;
            taskArray.push(i)
          }
        }

        this.setState({
          working: false,
          dailyTasks: taskArray
        })
      })

    this.renderTasks = this.renderTasks.bind(this);
    this.createTask = this.createTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
  }

  renderTasks(tasks) {
    if (!this.state.working && this.state.dailyTasks.length === 0) {
      return (
        <View>
          <Text style={styles.noTask}>You're all set, no tasks at this time!</Text>
        </View>
      )
    }

    return this.state.dailyTasks.map((task, $index) => {
      return (
        <View key={$index} style={styles.taskContainer}>
          <Text style={styles.taskTitle}>{task.title}</Text>
          <Text onPress={() => this.removeTask(task.taskId)}>Delete</Text>
        </View>
      )
    })
  }

  async createTask(promptValue) {
    try {
      let user = await firebase.auth().currentUser;

      Database.createTask(user, promptValue)
    }
    catch(error) {
      console.log('update error: ', error)
    }
  }

  async removeTask(taskId) {
    try {
      Database.removeTask(taskId)
    }
    catch(error) {
      console.log('delete error: ', error)
    }
  }

  render() {
    const currentDate = moment().format('dddd, MMMM Do YYYY');

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

          <View style={styles.working}>
            { this.state.working ?
                <ActivityIndicator animating={true}/> : null
            }
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
  },
  noTask: {
    color: textMute,
    marginTop: 20,
    textAlign: 'center'
  },
  working: {
    marginTop: 10
  }
});

export default Tasks;
