/**
 * @class SwitchTabs
 */

import React, { Component } from 'react';
import {
    Text,
    View,
    TabBarIOS,
    StyleSheet
} from 'react-native';
import {
  tabBar,
  tabUnselected,
  tabSelected
} from '../utils/colors';

import TopBar from './TopBar'
import Tasks from './Tasks';
import Profile from './Profile';

import TasksIcon from '../assets/images/tab_bar_icons/30 - iPhone Tasks.png';
import TasksIconSelected from '../assets/images/tab_bar_icons/30 - iPhone Tasks Selected.png';
import ProfileIcon from '../assets/images/tab_bar_icons/30 - iPhone Profile.png';
import ProfileIconSelected from '../assets/images/tab_bar_icons/30 - iPhone Profile Selected.png';

class SwitchTabs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 'tasksTab'
    };
  }

  render() {
    return (
      <TabBarIOS
        barTintColor={tabBar}
        unselectedTintColor={tabUnselected}
        tintColor={tabSelected}
        unselectedItemTintColor={tabUnselected}>
        <TabBarIOS.Item
          title="Tasks"
          icon={TasksIcon}
          selectedIcon={TasksIconSelected}
          selected={this.state.selectedTab === 'tasksTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'tasksTab'
            })
          }}>
          <View>
            <TopBar title="Tasks" />
            <Tasks navigator={this.props.navigator} />
          </View>
        </TabBarIOS.Item>

        <TabBarIOS.Item
          title="Profile"
          icon={ProfileIcon}
          selectedIcon={ProfileIconSelected}
          selected={this.state.selectedTab === 'profileTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'profileTab'
            })
          }}>
          <View>
            <TopBar title="Profile" />
            <Profile navigator={this.props.navigator} />
          </View>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

const styles = StyleSheet.create({});

export default SwitchTabs;
