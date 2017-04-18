/**
 * @class TopBar
 */

import React, { Component, PropTypes } from 'react';
import {
    Text,
    View,
    Image,
    Dimensions,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {
  primary,
  topBar,
  topBorder
} from '../utils/colors';
import leftIcon from '../assets/images/left_icon.png';

let width = Dimensions.get('window').width;

class TopBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      leftIcon: this.props.leftIcon
    }

    this._renderLeftNav = this._renderLeftNav.bind(this);
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
    leftIcon: PropTypes.bool,
    leftText: PropTypes.string,
    navigator: PropTypes.object
  }

  _renderLeftNav() {
    if (this.state.leftIcon) {
      return (
        <TouchableOpacity onPress={() => this.props.navigator.pop()}>
          <View style={styles.leftContainer}>
            <Image style={styles.leftIcon} source={leftIcon} />
            { this.props.leftText ?
              <Text style={styles.leftText}>{this.props.leftText}</Text> : null }
          </View>
        </TouchableOpacity>
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this._renderLeftNav()}

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
  leftIcon: {
    marginLeft: 8
  }
});

export default TopBar;
