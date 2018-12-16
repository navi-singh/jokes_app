import {
  StyleSheet, View, Text,
} from 'react-native';
import React from 'react';
import { observer, inject, PropTypes } from 'mobx-react';
// import Loader from './Loader';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 353,
    flexWrap: 'wrap',
    flexDirection: 'column',
    padding: 20,
  },
  // mainText: {
  //   flex: 4,
  //   padding: 20,
  //   backgroundColor: 'red',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // options: {
  //   flex: 3,
  //   backgroundColor: 'blue',
  //   flexWrap: 'wrap',
  //   flexDirection: 'row',
  // },
  // optionsCol: {
  //   flex: 2,
  // },
});

@inject('store')
@observer
class LandingPage extends React.Component {
  componentWillMount() {
    const { store } = this.props;
    store.fetchQuestions();
  }

  render() {
    const {
      container,
    } = styles;
    const { store } = this.props;
    if (store.isReady) {
      console.log(`Store value:${store.length}`);
      const {
        body, category,
      } = store.currentJoke;
      return (
        <View style={container}>
          <Text>{category}</Text>
          <Text>{body}</Text>
          {/* <Text style={mainText}>
            {question}
          </Text>
          <View style={options}>
            <View style={optionsCol}>
              <Button title={opt1} onPress={() => store.validateAnswer()} />
              <Button title={opt2} onPress={() => store.validateAnswer()} />
            </View>
            <View style={optionsCol}>
              <Button title={opt3} onPress={() => store.validateAnswer()} />
              <Button title={opt4} onPress={() => store.validateAnswer()} />
            </View>
          </View> */}
        </View>
      );
    }
    return <Text>LOADING</Text>; // Text> / / <Loader size="large" />;
  }
}
LandingPage.propTypes = {
  store: PropTypes.objectOrObservableObject.isRequired,
};
export default LandingPage;
