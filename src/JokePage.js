import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class JokePage extends React.Component {
  render() {
    return (<View style={styles.container}><Text>Landing paeg</Text></View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
