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
    let mitStyle = showsTrendingData ? styles.unselectedHeaderText : styles.selectedHeaderText;
    let giphyStyle = showsTrendingData ? styles.selectedHeaderText : styles.unselectedHeaderText;
    return (
      <TouchableOpacity
        style={styles.header}
        onPress={this.onPressHeader}
        activeOpacity={0.8}
      >
        <Text style={styles.headerText}>
          <Text style={mitStyle}>MIT</Text>
          <Text>-</Text>
          <Text style={giphyStyle}>IPHY</Text>
        </Text>
      </TouchableOpacity>
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
        limit={30}
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
  selectedHeaderText: {
    color: colors.MIT.DARK_GRAY,
  },
  unselectedHeaderText: {
    color: colors.MIT.RED,
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
