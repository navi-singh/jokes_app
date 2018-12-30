import {
  StyleSheet, View, Text,
} from 'react-native';
import React from 'react';
import { observer, inject } from 'mobx-react';
import { Icon, Font } from 'expo';
import { Button, Toast } from 'native-base';

@inject('store')
@observer
class LandingPage extends React.Component {
  static favoritesToast() {
    Toast.show({
      text: 'Added to favorities',
      buttonText: 'Okay',
      duration: 1500,
    });
  }

  async componentWillMount() {
    const { store } = this.props;
    store.nextJoke();
    /* eslint-disable */
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    /* eslint-enable */
  }

  next = () => {
    const { store } = this.props;
    store.nextJoke();
  }

  previous = () => {
    const { store } = this.props;
    store.previousJoke();
  }

  render() {
    const { store } = this.props;
    if (store.isReady) {
      return (
        <View style={styles.container}>
          <View style={styles.buttonHolder}>
            <Button size={48} style={[styles.button, { flex: 1 }]} onPress={this.constructor.favoritesToast} transparent>
              <Icon.Ionicons name="md-arrow-back" size={40} style={styles.buttonIcon} />
            </Button>
            <Text style={[styles.category, { flex: 3 }]}>{store.jokeCategory}</Text>
          </View>
          <Text style={styles.joke}>{store.jokeBody}</Text>
          <View style={styles.buttonHolder}>
            <Button size={48} style={styles.button} onPress={this.constructor.favoritesToast} transparent>
              <Icon.Ionicons name="md-home" size={40} style={styles.buttonIcon} />
            </Button>
            <Button
              size={48}
              style={styles.button}
              onPress={this.constructor.favoritesToast}
              transparent
            >
              <Icon.Ionicons name="ios-star-outline" size={40} style={styles.buttonIcon} />
            </Button>
            <Button size={48} style={styles.button} onPress={this.previous} transparent>
              {/* { if(store.joke) */}
              <Icon.Ionicons name="md-arrow-dropleft-circle" size={40} style={styles.buttonIcon} />
            </Button>
            <Button size={48} style={styles.button} onPress={this.next} transparent>
              <Icon.Ionicons name="md-arrow-dropright-circle" size={40} style={styles.buttonIcon} />
            </Button>
          </View>
        </View>
      );
    }
    return <Text>LOADING</Text>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#dbe8ff',
  },
  header: {
    flex: 1,
  },
  joke: {
    flex: 14,
    fontFamily: 'Roboto_medium',
    justifyContent: 'center',
  },
  category: {
    color: '#ffffff',
  },
  buttonHolder: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#1565C0',
    borderRadius: 6,
    marginBottom: 15,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonIcon: {
    height: 42,
    width: 42,
    color: '#fffcfc',
  },
});

export default LandingPage;
