import {
  StyleSheet, View, Text, Button,
} from 'react-native';
import React from 'react';
import { observer, inject } from 'mobx-react';
// import PropTypes from 'prop-types';
// import Loader from './Loader';

const styles = StyleSheet.create({
  container: {
    // display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    // backgroundColor: 'grey',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    flex: 1,
  },
  footer: {
    flex: 1,
  },
  joke: {
    flex: 14,
    alignSelf: 'center',
    // textAlign: 'center',
    // fontSize: 10,
    // backgroundColor: 'red',
  },
  category: {
    justifyContent: 'flex-start',
  },
});
const NEXT = 'next';

@inject('store')
@observer
class LandingPage extends React.Component {
  componentWillMount() {
    const { store } = this.props;
    store.nextJoke();
  }

  render() {
    const { store } = this.props;
    if (store.isReady) {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Button title={NEXT} onPress={() => store.nextJoke()} />
            <Text style={styles.category}>{store.jokeCategory}</Text>
          </View>
          <Text style={styles.joke}>{store.jokeBody}</Text>
          <View style={styles.footer}>
            <Text>sample</Text>
          </View>
        </View>
      );
    }
    return <Text>LOADING</Text>; // Text> / / <Loader size="large" />;
  }
}

export default LandingPage;
