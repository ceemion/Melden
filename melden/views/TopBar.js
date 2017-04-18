/**
 * @class TopBar
 */

import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions
} from 'react-native';
import {
  topBar,
  topBorder
} from '../utils/colors';

let width = Dimensions.get('window').width;

class TopBar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.text}>
            {this.props.title}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: topBar,
    borderBottomWidth: 0.5,
    borderColor: topBorder,
    flex: 1,
    flexDirection: 'row',
    height: 64,
    left: 0,
    marginBottom: 0,
    paddingTop: 30,
    position: 'absolute',
    top: 0,
    width: width
  },
  title: {
    alignItems: 'center',
    flex: 1,
    width: width - 200
  },
  text: {
    fontSize: 17
  },
});

export default TopBar;
