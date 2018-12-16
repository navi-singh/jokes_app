import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as MobXProvider } from 'mobx-react/native';
import LandingPage from './src/LandingPage';
import observableJokesStore from './src/store/JokeStore';
import { auth } from './src/store/Firestore';

class App extends React.Component {
  state = {
    loggedIn: null,
  };

  componentWillMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  render() {
    const { loggedIn } = this.state;
    return (
      <MobXProvider store={observableJokesStore}>
        <View style={styles.container}>
          <Text>{loggedIn}</Text>
          <LandingPage />
        </View>
      </MobXProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 4,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;