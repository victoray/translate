import { useEffect, useState } from "react";
import firebase from "firebase";
import { FIREBASE_APP } from "../constants/Firebase";

const useAuthentication = () => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    const app = firebase.app(FIREBASE_APP);
    const user = firebase.auth(app).currentUser;

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  return currentUser;
};

export default useAuthentication;
