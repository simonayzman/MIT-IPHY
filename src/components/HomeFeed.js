import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import { colors, margins } from '../lib/styles';
import GiphyClient from '../lib/GiphyClient';
import GifList from './GifList';

export default class HomeFeed extends Component {

  constructor() {
    super();

    this.state = {
      showsTrendingData: true,
      fetching: false,
      fetchFailed: false,
      gifData: [],
    };
  }

  componentDidMount() {
    const { showsTrendingData } = this.state;
    this.fetchGifs(showsTrendingData);
  }

  fetchGifs(trending) {
    this.setState({ fetching: true });
    if (trending) {
      this.fetchTrendingGifs();
    } else {
      this.fetchMITGifs();
    }
  }

  fetchTrendingGifs() {
    GiphyClient.trending({ limit: 50 })
      .then(response => this.onFetchGifsSuccess(response.data))
      .catch(error => this.onFetchGifsFailure(error));
  }

  fetchMITGifs() {
    const searchQuery = 'Massachusetts Institute of Technology';
    GiphyClient.search({ q: searchQuery, limit: 50 })
      .then(response => this.onFetchGifsSuccess(response.data))
      .catch(error => this.onFetchGifsFailure(error));
  }

  onFetchGifsSuccess(gifData) {
    this.setState({
      fetching: false,
      gifData,
    });
  }

  onFetchGifsFailure(error) {
    console.warn(error);
    this.setState({
      fetching: false,
      fetchFailed: true,
    });
  }

  onPressHeader = () => {
    const { showsTrendingData } = this.state;
    this.setState({
      showsTrendingData: !showsTrendingData,
    });
    this.fetchGifs(!showsTrendingData);
  }

  renderHeader() {
    const { showsTrendingData } = this.state;
    let logoSource;
    let logoStyle;
    if (showsTrendingData) {
      logoSource = require('../images/giphy-logo.png');
      logoStyle = styles.giphyLogo;
    } else {
      logoSource = require('../images/mit-logo.png');
      logoStyle = styles.mitLogo;
    }
    return (
      <TouchableOpacity
        style={styles.header}
        onPress={this.onPressHeader}
        activeOpacity={0.7}
      >
        <Image
          source={logoSource}
          style={logoStyle}
          resizeMode={'contain'}
        />
      </TouchableOpacity>
    );
  }

  renderLoader() {
    return <ActivityIndicator size='large' />;
  }

  renderFailureGif() {
    return (
      <Image
        source={require('../images/not-found.gif')}
        resizeMode={'contain'}
      />
    )
  }

  renderGifList() {
    const { gifData } = this.state;
    return (
      <GifList
        limit={30}
        data={gifData}
      />
    );
  }

  renderFooter() {
    return (
      <View style={styles.footer}>
        <Text style={styles.footerText}>Powered by </Text>
        <Image
          source={require('../images/giphy-name-inverted.png')}
          style={styles.giphyAttribution}
          resizeMode={'contain'}
        />
      </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 10,
    borderColor: colors.MIT.RED,
    paddingBottom: 10,
    marginTop: margins.VERTICAL.STATUS_BAR,
    marginBottom: margins.VERTICAL.LARGE,
  },
  mitLogo: {
    width: 194, // 800 original
    height: 100, // 414 original
  },
  giphyLogo: {
    width: 83, // 152 original
    height: 100, // 184 original
  },
  footer: {
    marginTop: margins.VERTICAL.MEDIUM,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  giphyAttribution: {
    height: 38,
    width: 100,
  },
});
