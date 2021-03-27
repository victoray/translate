import * as React from "react";
import { Keyboard, Pressable, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Text, View } from "../components/Themed";
import styled from "styled-components/native";
import { FC } from "react";

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
`;

const Button: FC = ({ children }) => {
  return (
    <StyledButton>
      <Text>{children}</Text>
    </StyledButton>
  );
};

export default function Home() {
  return (
    <Pressable onPress={Keyboard.dismiss} style={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <StyledSection>
          <Button>English</Button>
          <Button>
            <AntDesign name="swap" size={24} color="black" />
          </Button>
          <Button>Estonian</Button>
        </StyledSection>

        <StyledTextArea
          placeholder={"Enter a text"}
          multiline
          numberOfLines={5}
        />
      </View>
    </Pressable>
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
