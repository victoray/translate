import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

import "./firebase";
import { FIREBASE_APP } from "./constants/Firebase";
import firebase from "firebase";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const app = firebase.app(FIREBASE_APP);
    firebase
      .auth(app)
      .signInAnonymously()
      .then(() => setIsAuthenticated(true));
  }, []);

  if (!isAuthenticated) {
    return null;
  }

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
