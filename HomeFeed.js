import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

export default class HomeFeed extends Component {
  render() {
    return <View style={styles.container} />
  }
}

const styles = StyleSheet.create({
  container: {
    height: 150,
    width: 150,
    backgroundColor: 'green',
  },
});
