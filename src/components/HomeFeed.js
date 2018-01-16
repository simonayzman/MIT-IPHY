import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ActivityIndicator,
} from 'react-native';

import { colors, margins } from '../lib/styles';
import GiphyClient from '../lib/GiphyClient';
import GifList from './GifList';

export default class HomeFeed extends Component {

  constructor() {
    super();

    this.state = {
      fetching: false,
      fetchFailed: false,
      gifData: [],
    };
  }

  componentDidMount() {
    this.setState({
      fetching: true,
    });

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

  renderHeader() {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>MIT-IPHY</Text>
      </View>
    );
  }

  renderLoader() {
    return <ActivityIndicator size='large' />;
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

  renderGifList() {
    const { gifData } = this.state;
    return (
      <GifList
        limit={10}
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
      content = this.renderGifList();
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
  giphyAttribution: {
    marginTop: margins.VERTICAL.LARGE,
    height: 50,
    width: 350,
    alignSelf: 'center',
  },
});
