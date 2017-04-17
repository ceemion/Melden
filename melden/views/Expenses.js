/**
 * @class Expenses
 */

import React, { Component } from 'react';
import {
    Text,
    View,
} from 'react-native';

class Expenses extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <View>
        <Text>Expenses</Text>
        <Text>All our expenses</Text>
      </View>
    )
  }
}

export default Expenses;
