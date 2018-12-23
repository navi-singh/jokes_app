import { observable, action } from 'mobx';
import { fireStore } from './Firestore';

class JokeStore {
  @observable jokes = null;

  @observable currentJoke = null;

  @observable isReady = false;

  @observable jokeBody = null;

  @observable jokeCategory = null;

  constructor() {
    this.index = 0;
  }

  @action
  nextJoke() {
    this.isReady = false;
    if (!this.jokes || this.index >= (this.jokes.length - 1)) {
      this.fetchJokes();
    } else {
      this.updateCurrentJoke();
      this.isReady = true;
    }
  }

  updateCurrentJoke() {
    const currentJoke = this.jokes[this.index];
    this.currentJoke = currentJoke;
    this.jokeBody = currentJoke.body;
    this.jokeCategory = currentJoke.category;
    this.index += 1;
  }

  fetchJokes() {
    this.jokes = [];
    this.index = 0;
    const minimumJokeId = this.currentJoke ? this.currentJoke.id : 0;
    fireStore.collection('1').where('id', '>', minimumJokeId).limit(10).get()
      .then((query) => {
        query.forEach((doc) => {
          this.jokes.push(doc.data());
        });
        this.updateCurrentJoke();
        this.isReady = true;
        console.log('fetching');
      })
      .catch((error) => {
        console.log(`Error getting doc ${error}`);
      });
  }
}

const store = new JokeStore();
export default store;
