/**
 * @class Reports
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

class Reports extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Reports</Text>
        <Text>All our reports</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: titleHeight
  }
});

export default Reports;
