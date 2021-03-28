import * as React from "react";
import { FlatList, Keyboard, Pressable, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Text, View } from "../components/Themed";
import styled from "styled-components/native";
import { FC, useState } from "react";
import HistoryList, { StyledHistoryItem } from "../components/HistoryList";

const StyledSection = styled.View`
  display: flex;
  border: 1px solid #eee;
  height: 64px;
  width: 100%;
  flex-direction: row;
`;

const StyledButton = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
  flex: 1;
`;

const StyledTextArea = styled.TextInput`
  height: 150px;
  border: 1px solid #eee;
  padding: 10px 15px;
  width: 100%;
`;

const StyledHistoryView = styled.View`
  flex: 1;
  background-color: #eee;
`;

const Button: FC = ({ children }) => {
  return (
    <StyledButton>
      <Text>{children}</Text>
    </StyledButton>
  );
};

const StyledText = styled.Text`
  font-size: 15px;
  font-weight: 500;
  margin-left: 15px;
`;

const StyledView = styled.TouchableWithoutFeedback`
  flex: 1;
`;

export default function Home() {
  const [showResult, setShowResult] = useState(false);
  return (
    <View style={styles.container} onTouchStart={Keyboard.dismiss}>
      <StyledSection>
        <Button>English</Button>
        <Button>
          <AntDesign name="swap" size={18} color="black" />
        </Button>
        <Button>Estonian</Button>
      </StyledSection>

      <StyledTextArea
        placeholder={"Enter a text"}
        multiline
        numberOfLines={5}
        onFocus={() => setShowResult(true)}
        onBlur={() => {
          console.log("fff");
          Keyboard.dismiss();
          setShowResult(false);
        }}
      />

      {showResult ? (
        <StyledSection>
          <Text>Translate</Text>
        </StyledSection>
      ) : (
        <HistoryList
          translations={[
            { from: "hello", to: "more" },
            { from: "hello", to: "more" },
            { from: "hello", to: "more" },
            { from: "hello", to: "more" },
            { from: "hello", to: "more" },
            { from: "hello", to: "more" },
            { from: "hello", to: "more" },
            { from: "hello", to: "more" },
            { from: "hello", to: "more" },
            { from: "hello", to: "more" },
            { from: "hello", to: "more" },
            { from: "hello", to: "more" },
            { from: "hello", to: "more" },
            { from: "hello", to: "more" },
            { from: "hello", to: "more" },
            { from: "hello", to: "more" },
            { from: "hello", to: "more" },
            { from: "hellttto", to: "more" },
          ]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
