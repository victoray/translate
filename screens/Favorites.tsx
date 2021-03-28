import * as React from "react";
import { FC } from "react";
import { StyleSheet } from "react-native";
import { View } from "../components/Themed";
import HistoryList from "../components/HistoryList";
import { StackNavigationProp } from "@react-navigation/stack";

const Favorites: FC<{ navigation: StackNavigationProp<any> }> = ({
  navigation,
}) => {
  return (
    <View style={styles.container}>
      <HistoryList
        onSelect={(translation) =>
          navigation.navigate("HomeScreen", translation)
        }
        favorites
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
