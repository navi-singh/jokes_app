import { observable } from 'mobx';
import { fireStore } from './Firestore';

let index = 0;

class ObservableJokesStore {
  @observable jokes = [];

  @observable currentJoke = null;

  @observable isReady = false;

  constructor() {
    this.index = 0;
  }

  addQuestion(item) {
    this.Questions.push({
      name: item,
      items: [],
      index,
    });
    index += 1;
  }

  fetchQuestions() {
    this.jokes.length = 0;
    this.isReady = false;
    fireStore.collection('1').get()
      .then((query) => {
        query.forEach((doc) => {
          this.jokes.push(doc.data());
          console.log(this.jokes[0].body);
          this.currentJoke = this.jokes[0];
        });
        this.isReady = true;
      })
      .catch((error) => {
        console.log(`Error getting doc ${error}`);
      });
  }
}

const observableJokesStore = new ObservableJokesStore();
export default observableJokesStore;
