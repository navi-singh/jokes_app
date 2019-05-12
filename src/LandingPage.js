import {
  StyleSheet, View, ScrollView, Text,
} from 'react-native';
import React from 'react';
import { observer, inject } from 'mobx-react';
import { Icon, Font } from 'expo';
import { Button, Toast } from 'native-base';

const HEADER_COLOR = [
  '#1565C0',
  '#f44242',
];
const BACKGROUND_COLOR = [
  '#dbe8ff',
  '#ffe8e8',
];

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
    this.rand = Math.floor(0 + Math.random() * (2));
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
        <View style={[styles.container, { backgroundColor: BACKGROUND_COLOR[1] }]}>

          <View style={[styles.buttonHolder, { backgroundColor: HEADER_COLOR[this.rand] }]}>
            <Button size={48} style={[styles.button, { flex: 1 }]} onPress={this.constructor.favoritesToast} transparent>
              <Icon.Ionicons name="md-arrow-back" size={40} style={styles.buttonIcon} />
            </Button>
            <Text style={[styles.category, { flex: 3 }]}>{store.jokeCategory}</Text>
          </View>
          <ScrollView style={styles.jokeBody} showsVerticalScrollIndicator={false}>
            <View>
              <Text style={styles.joke}>{store.jokeBody}</Text>
            </View>
          </ScrollView>
          <View style={[styles.buttonHolder, { backgroundColor: HEADER_COLOR[this.rand] }]}>
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
              <Icon.Ionicons name="md-arrow-dropleft-circle" size={40} style={styles.buttonIcon} disabled={false} />
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
    // backgroundColor: '#dbe8ff',
    backgroundColor: '#ffe8e8',
  },
  jokeBody: {
    flex: 0.9,
  },
  joke: {
    fontSize: 14,
    fontFamily: 'Roboto_medium',
  },
  category: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Roboto_medium',
  },
  buttonHolder: {
    flex: 0.075,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // backgroundColor: '#1565C0',
    // backgroundColor: '#f44242',
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
