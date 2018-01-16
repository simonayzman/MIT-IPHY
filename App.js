import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import HomeFeed from './src/components/HomeFeed';
import { colors }  from './src/lib/styles';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <HomeFeed />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.MISCELLANEOUS.CHARCOAL,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
