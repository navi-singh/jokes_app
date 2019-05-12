import { observable, action } from 'mobx';
import { fireStore } from './Firestore';

class JokeStore {
  @observable jokes = null;

  @observable currentJoke = null;

  @observable isReady = false;

  @observable jokeBody = null;

  @observable jokeCategory = null;

  @observable firstJokeId = null;

  jokeId = null;

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

  @action
  previousJoke() {
    this.isReady = false;
    if (!this.jokes || this.index <= 1) {
      this.fetchJokes();
    } else {
      this.updateCurrentJoke();
      this.isReady = true;
    }
  }

  updateCurrentJoke(indexDeltaIfPrevious) {
    const currentJoke = this.jokes[this.index - (indexDeltaIfPrevious || 0)];
    this.currentJoke = currentJoke;
    // console.log(`${this.jokes.length} -- ${this.index} ++ ${this.jokes[0].body}`);
    this.jokeBody = currentJoke.body;
    this.jokeCategory = currentJoke.category;
    this.jokeId = currentJoke.id;
    this.index = this.index + 1 - (indexDeltaIfPrevious || 0);
  }

  fetchJokes() {
    this.jokes = [];
    this.index = 0;
    const minimumJokeId = this.currentJoke ? this.currentJoke.id : 0;
    console.log('fetching');
    fireStore.collection('2').where('id', '>', minimumJokeId).limit(10).get()
      .then((query) => {
        query.forEach((doc) => {
          this.jokes.push(doc.data());
        });
        this.updateCurrentJoke();
        this.isReady = true;
        console.log('fetched');
      })
      .catch((error) => {
        console.log(`Error getting doc ${error}`);
      });
  }
}

const store = new JokeStore();
export default store;
