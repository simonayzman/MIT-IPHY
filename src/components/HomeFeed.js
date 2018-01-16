import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Image,
  ActivityIndicator,
  Platform,
} from 'react-native';

import { colors, margins } from '../lib/styles';
import GiphyClient from '../lib/GiphyClient';

export default class HomeFeed extends Component {

  constructor() {
    super();

    this.state = {
      fetching: true,
      fetchFailed: false,
      gifData: [],
    };

    GiphyClient.trending()
      .then(response => {
        console.log(response);
        this.setState({
          fetching: false,
          gifData: response.data,
        });
      })
      .catch(error => {
        console.warn(error);
        this.setState({
          fetching: false,
          fetchFailed: true,
        })
      })

  }

  getItemKey(item) {
    return item.id;
  }

  renderHeader() {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>MIT-IPHY</Text>
      </View>
    );
  }

  renderItem = ({ item }) => { // notice difference function declaration style
    const { images: { fixed_width, fixed_width_still } } = item;
    const url = Platform.OS === 'ios' ? fixed_width.url : fixed_width_still.url;
    return this.renderGif(url);
  }

  renderLoader() {
    return <ActivityIndicator size='large' />;
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

  renderFailureGif() {
    const failureGifUrl = 'https://media3.giphy.com/media/9J7tdYltWyXIY/giphy.gif';
    return (
      <Image
        source={{ uri: failureGifUrl }}
        style={styles.failureGif}
        resizeMode={'contain'}
      />
    )
  }

  renderGifGrid() {
    const { gifData } = this.state;
    return (
      <FlatList
        keyExtractor={this.getItemKey}
        renderItem={this.renderItem}
        data={gifData}
      />
    );
  }

  renderFooter() {
    return (
      <Image
        source={require('../images/powered_by_giphy.gif')}
        style={styles.giphyAttribution}
        resizeMode={'contain'}
      />
    );
  }

  render() {
    const { fetching, fetchFailed } = this.state;

    let content;
    if (fetching === true) {
      content = this.renderLoader();
    } else if (fetchFailed === true) {
      content = this.renderFailureGif();
    } else {
      content = this.renderGifGrid();
    }

    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {content}
        {this.renderFooter()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cell: {
    flex: 1,
    marginHorizontal: margins.HORIZONTAL.GUTTER,
    marginVertical: 3,
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
  failureGif: {
    width: 400,
    height: 500,
  },
  gif: {
    width: 300,
    height: 200,
  },
  giphyAttribution: {
    marginTop: margins.VERTICAL.LARGE,
    height: 50,
    width: 350,
    alignSelf: 'center',
  },
});
