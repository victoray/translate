import React, { FC, useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { Translation } from "../types";
import { AntDesign } from "@expo/vector-icons";
import { View } from "./Themed";
import firebase from "firebase";
import { FIREBASE_APP, HISTORY_COLLECTION } from "../constants/Firebase";
import useAuthentication from "../hooks/useAuthentication";

const StyledView = styled.View`
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eee;
`;

const StyledText = styled.Text`
  font-size: 14px;
`;

const StyledEmpty = styled.View`
  justify-content: center;
  align-items: center;
`;

const StyledTitle = styled.Text`
  font-size: 18px;
  font-weight: 500;
  color: #bfbfbf;
`;

const StyledDescription = styled.Text`
  font-size: 14px;
  color: #bfbfbf;
`;

const StyledContainer = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 95%;
  margin-top: 25px;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
`;

export const StyledHistoryItem = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 8px;
  border: 1px solid #eee;
  border-left-width: 0;
  border-right-width: 0;
  border-top-width: 0;
`;

const styles = StyleSheet.create({
  flatList: {
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    borderColor: "#eee",
    width: "100%",
  },
});

const HistoryList: FC<{
  favorites?: boolean;
  onSelect(translation: Translation): void;
}> = ({ onSelect, favorites }) => {
  const [translations, setTranslations] = useState<Translation[]>([]);

  const currentUser = useAuthentication();

  useEffect(() => {
    const app = firebase.app(FIREBASE_APP);
    let unsubscribe: () => void;

    if (currentUser) {
      let baseQuery = firebase
        .firestore(app)
        .collection(HISTORY_COLLECTION)
        .where("userId", "==", currentUser.uid);

      if (favorites) {
        baseQuery = baseQuery.where("favorite", "==", true);
      }

      unsubscribe = baseQuery
        .orderBy("timestamp", "desc")
        .onSnapshot((querySnapshot) => {
          const translations_: Translation[] = [];
          querySnapshot.forEach((doc) => {
            translations_.push({ ...doc.data(), id: doc.id } as Translation);
          });
          setTranslations(translations_);
        });
    }

    return () => {
      unsubscribe?.();
    };
  }, [currentUser, favorites]);

  const onToggleFavorite = (translation: Translation) => {
    const app = firebase.app(FIREBASE_APP);

    firebase
      .firestore(app)
      .collection(HISTORY_COLLECTION)
      .doc(translation.id)
      .update({
        favorite: !translation.favorite,
      });
  };

  return (
    <StyledView>
      <StyledContainer>
        {favorites && !translations.length ? (
          <StyledEmpty>
            <AntDesign name={"star"} size={64} color={"#bfbfbf"} />

            <StyledTitle>No Favorites</StyledTitle>
            <StyledDescription>
              Your favorite translations will appear here.
            </StyledDescription>
          </StyledEmpty>
        ) : (
          <FlatList
            style={styles.flatList}
            keyExtractor={(_, index) => String(index)}
            data={translations}
            renderItem={({ item, index }) => (
              <StyledHistoryItem key={index} onPress={() => onSelect(item)}>
                <View>
                  <StyledText numberOfLines={1}>{item.from}</StyledText>
                  <StyledText numberOfLines={1}>{item.to}</StyledText>
                </View>
                <AntDesign
                  name={item.favorite ? "star" : "staro"}
                  size={24}
                  color={item.favorite ? "gold" : "black"}
                  onPress={() => onToggleFavorite(item)}
                />
              </StyledHistoryItem>
            )}
          />
        )}
      </StyledContainer>
    </StyledView>
  );
};

export default HistoryList;
