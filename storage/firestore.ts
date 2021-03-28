import firebase from "firebase";
import { FIREBASE_APP, HISTORY_COLLECTION } from "../constants/Firebase";

class Firestore {
  key: string;

  constructor(key: string) {
    this.key = key;
  }

  getItem(
    userId: string
  ): Promise<
    firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
  > {
    const app = firebase.app(FIREBASE_APP);

    return firebase
      .firestore(app)
      .collection(this.key)
      .where("userId", "==", userId)
      .orderBy("timestamp", "desc")
      .get();
  }

  saveItem(value: Record<string, unknown>): Promise<unknown> {
    const app = firebase.app(FIREBASE_APP);

    return firebase.firestore(app).collection(this.key).add(value);
  }
}

export default new Firestore(HISTORY_COLLECTION);
