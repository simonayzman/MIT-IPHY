import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Image,
} from 'react-native';

import { colors, margins } from '../lib/styles';

export default class HomeFeed extends Component {

  getItemKey(item, index) {
    return item;
  }

  renderHeader() {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>MIT-IPHY</Text>
      </View>
    );
  }

  renderItem() {
    return <View style={styles.cell} />
  }

  renderFooter() {
    return (
      <View style={styles.giphyAttributionView}>
        <Image
          source={require('../images/powered_by_giphy.gif')}
          style={styles.giphyAttribution}
          resizeMode={'contain'}
        />
      </View>
    );
  }

  render() {
    const gifData = [
      'gifUrl1',
      'gifUrl2',
      'gifUrl3',
      'gifUrl4',
      'gifUrl5',
      'gifUrl6',
      'gifUrl7',
      'gifUrl8',
      'gifUrl9',
      'gifUrl10',
      'gifUrl11',
      'gifUrl12',
    ];
    return (
      <FlatList
        ListHeaderComponent={this.renderHeader}
        ListFooterComponent={this.renderFooter}
        numColumns={3}
        keyExtractor={this.getItemKey}
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
  },
  cell: {
    height: 100,
    width: 100,
    marginHorizontal: margins.HORIZONTAL.GUTTER,
    marginVertical: margins.VERTICAL.MEDIUM,
    backgroundColor: colors.MIT.RED,
  },
  header: {
    alignItems: 'center',
    borderWidth: 10,
    marginTop: margins.VERTICAL.STATUS_BAR,
    marginBottom: margins.VERTICAL.LARGE,
    borderColor: colors.MIT.RED,
  },
  headerText: {
    color: colors.MIT.RED,
    fontSize: 65,
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowRadius: 1,
    textShadowOffset: {
      width: 2,
      height: 2,
    }
  },
  giphyAttributionView: {
    marginTop: margins.VERTICAL.LARGE,
  },
  giphyAttribution: {
    height: 50,
    width: 350,
    alignSelf: 'center',
  },
});
