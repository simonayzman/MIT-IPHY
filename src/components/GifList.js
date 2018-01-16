import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Platform,
} from 'react-native';

import { colors, margins } from '../lib/styles';

export default class GifList extends Component {

  static propTypes = {
    limit: PropTypes.number,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        images: PropTypes.shape({
          fixed_width: PropTypes.shape({
            url: PropTypes.string.isRequired,
          }).isRequired,
          fixed_width_still: PropTypes.shape({
            url: PropTypes.string.isRequired,
          }).isRequired,
        }).isRequired,
      })
    ).isRequired,
  }

  static defaultProps = {
    limit: 20,
    data: [],
  };

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
    const { data, limit } = this.props;
    const limitedData = data.slice(0, limit);
    return (
      <FlatList
        keyExtractor={this.getItemKey}
        renderItem={this.renderItem}
        data={limitedData}
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
