import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
} from 'react-native';

export default class HomeFeed extends Component {

  renderItem() {
    return <View style={styles.cell} />
  }

  render() {
    const gifData = ['sameGifUrl1', 'sameGifUrl2', 'sameGifUrl3', 'sameGifUrl4'];
    return (
      <FlatList
        renderItem={this.renderItem}
        data={gifData}
        style={styles.container}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
  },
  cell: {
    height: 100,
    width: 100,
    margin: 10,
    backgroundColor: 'red',
  },
});
