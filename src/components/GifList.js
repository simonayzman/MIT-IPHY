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
          fixed_width_small: PropTypes.shape({
            url: PropTypes.string.isRequired,
            width: PropTypes.string.isRequired,
            height: PropTypes.string.isRequired,
          }).isRequired,
          fixed_width_small_still: PropTypes.shape({
            url: PropTypes.string.isRequired,
            width: PropTypes.string.isRequired,
            height: PropTypes.string.isRequired,
          }).isRequired,
        }).isRequired,
      })
    ).isRequired,
  }

  static defaultProps = {
    limit: 21,
    data: [],
  };

  getItemKey(item) {
    return item.id;
  }

  renderItem = ({ item }) => { // notice difference function declaration style
    const { images: { fixed_width_small, fixed_width_small_still } } = item;
    const imageVersion = Platform.OS === 'ios' ? fixed_width_small : fixed_width_small_still;
    const { url, width, height } = imageVersion;
    const dimensions = {
      width: parseInt(width),
      height: parseInt(height),
    };
    return (
      <View style={styles.cell}>
        <Image
          source={{ uri: url }}
          style={dimensions}
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
        numColumns={3}
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
    alignSelf: 'center',
    marginHorizontal: margins.HORIZONTAL.GUTTER,
    marginVertical: 5,
  },
});
