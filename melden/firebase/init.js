import * as firebase from 'firebase';

class Firebase {
    /**
     * Initialises Firebase
     */

    static initialise() {
        const config = {
            apiKey: "AIzaSyDjbfZXj7fAjHBENsRbPWfkW7TTBQShAEc",
            authDomain: "melden-92903.firebaseapp.com",
            databaseURL: "https://melden-92903.firebaseio.com",
            storageBucket: "melden-92903.appspot.com",
            messagingSenderId: "92942149499"
        };

        firebase.initializeApp(config);
    }
}

export default Firebase;