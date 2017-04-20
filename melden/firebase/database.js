/**
 * @class Database
 */

import * as firebase from 'firebase';

class Database {
  /**
   * Sets the name of a registered user
   * @param userId
   * @param name
   * @param email
   * @returns {firebase.Promise<any>|!firebase.Promise.<void>}
   */

  static setsUserData(userId, name, email) {
    let userPath = 'users/' + userId;

    return firebase.database().ref(userPath).set({
      name: name,
      email: email
    });
  }

  static updateUserData(userId, data) {
    let userPath = 'users/' + userId;

    return firebase.database().ref(userPath).update(data);
  }
}

export default Database;
