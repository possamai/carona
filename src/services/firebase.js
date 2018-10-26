// ./src/services/firebase.js
import Firebase from 'firebase'

import firebaseConfig from './firebaseConfig'
const app = Firebase.initializeApp(firebaseConfig)
let db = app.database()
let auth = app.auth()
let provider = new Firebase.auth.GoogleAuthProvider()
let storage = app.storage()

export default {
  getDb () {
    return db
  },
  getDbs (name) {
    return app.database(name)
  },
  getAuth () {
    return auth
  },
  getStorage () {
    return storage
  },
  getGoogleAuthProvider () {
    return provider
  }
}
