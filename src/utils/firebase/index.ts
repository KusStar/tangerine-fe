import * as firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyA0XhKVQXyGt9ofuPr79zSJNxvkUvKGPKo',
  authDomain: 'tangerine-2ce02.firebaseapp.com',
  databaseURL: 'https://tangerine-2ce02.firebaseio.com',
  projectId: 'tangerine-2ce02',
  storageBucket: 'tangerine-2ce02.appspot.com',
  messagingSenderId: '90770187341',
  appId: '1:90770187341:web:e0c85d7a2b3124bbc26804',
  measurementId: 'G-3HXPNHRS20'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export default firebase
