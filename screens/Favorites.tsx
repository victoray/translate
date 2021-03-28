import * as React from "react";
import { FC, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { View } from "../components/Themed";
import HistoryList from "../components/HistoryList";
import firestore from "../storage/firestore";
import { Translation } from "../types";
import useAuthentication from "../hooks/useAuthentication";
import { StackNavigationProp } from "@react-navigation/stack";

const Favorites: FC<{ navigation: StackNavigationProp<any> }> = ({
  navigation,
}) => {
  const [translations, setTranslations] = useState<Translation[]>([]);

  const currentUser = useAuthentication();

  const fetchTranslations = () => {
    if (currentUser) {
      firestore.getItem(currentUser?.uid, true).then((querySnapshot) => {
        const translations_: Translation[] = [];
        querySnapshot.forEach((doc) => {
          translations_.push(doc.data() as Translation);
        });

        setTranslations(translations_);
      });
    }
  };

  useEffect(() => {
    fetchTranslations();
  }, []);

  useEffect(() => {
    const onFocus = () => {
      fetchTranslations();
    };

    navigation.addListener("focus", onFocus);

    return () => {
      navigation.removeListener("focus", onFocus);
    };
  }, [currentUser]);

  return (
    <View style={styles.container}>
      <HistoryList
        onSelect={(translation) => console.log(translation)}
        translations={translations}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

export default Favorites;
