import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Platform,
} from 'react-native';

import { colors, margins } from '../lib/styles';

export default class GifList extends Component {

  getItemKey(item) {
    return item.id;
  }

  renderItem = ({ item }) => { // notice difference function declaration style
    const { images: { fixed_width, fixed_width_still } } = item;
    const url = Platform.OS === 'ios' ? fixed_width.url : fixed_width_still.url;
    return this.renderGif(url);
  }

  renderGif(url) {
    return (
      <View style={styles.cell}>
        <Image
          source={{ uri: url }}
          style={styles.gif}
          resizeMode={'contain'}
        />
      </View>
    );
  }

  render() {
    const data = [];
    return (
      <FlatList
        keyExtractor={this.getItemKey}
        renderItem={this.renderItem}
        data={data}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cell: {
    flex: 1,
    marginHorizontal: margins.HORIZONTAL.GUTTER,
    marginVertical: 3,
  },
  gif: {
    width: 300,
    height: 200,
  },
});
