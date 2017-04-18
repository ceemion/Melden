/**
 * @class Expenses
 */

import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';

import {
  titleHeight
} from '../utils/variables';

class Expenses extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Expenses</Text>
        <Text>All our expenses</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: titleHeight
  }
});

export default Expenses;
