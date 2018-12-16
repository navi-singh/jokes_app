import firebase from 'firebase';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyC-k09AeWlIemEwSwVZC1dlror-9_GPDfs',
  authDomain: 'jokes-61c6e.firebaseapp.com',
  databaseURL: 'https://jokes-61c6e.firebaseio.com',
  projectId: 'jokes-61c6e',
  storageBucket: 'jokes-61c6e.appspot.com',
  messagingSenderId: '788917046534',
};
firebase.initializeApp(config);
export const auth = firebase.auth();
export const provider = new firebase.auth.FacebookAuthProvider();
export const storage = firebase.storage();
export const fireStore = firebase.firestore();
fireStore.settings({ timestampsInSnapshots: true });
