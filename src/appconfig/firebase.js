import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyACJ2Z3X0HA7hR0mybPJ9qAMBwmroVtFTk',
  authDomain: 'vrcard-5bd33.firebaseapp.com',
  databaseURL: 'https://vrcard-5bd33.firebaseio.com',
  storageBucket: 'vrcard-5bd33.appspot.com',
  messagingSenderId: '1040504692906',
};

const firebaseApp = firebase.initializeApp(config);

export default {
  firebase: firebaseApp,
  panoramasRef: firebaseApp.storage().ref('panoramas'),
};
