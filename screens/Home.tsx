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

const StyledResult = styled.ScrollView`
  display: flex;
  border: 1px solid #eee;
  max-height: 100px;
  padding: 10px;
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
          setShowResult(false);
        }}
      />

      {showResult ? (
        <StyledResult onTouchStart={(e) => e.stopPropagation()}>
          <Text>
            I came across a very interesting position on your jobs page and I
            believe it fits me perfectly. I am interested in applying for the
            position of Frontend Software Engineer. I believe my positive drive
            to learn and passion for creative solutions will be a positive
            addition to your team and organization’s goals. I enjoy innovation
            and love to experiment with different ideas. I love coding and
            numbers in general, I have cultivated a habit of learning through
            practice and diverse experiences. I have a deep passion for new
            advancements in technology. These talents, along with my passion in
            this field, align with the qualities you desire in this position. I
            think I will excel in a workplace that promotes a culture of fun,
            consensus-driven, and high-energy teamwork. I have a good knowledge
            of Python, Javascript, Java, React, TypeScript and SQL and I can
            work efficiently with Unix systems and Windows.  I am highly
            motivated by the prospects of learning and providing solutions on a
            daily basis. I have an artistic eye and strong work ethic, but also
            like to foster an element of fun. I strongly believe that my
            creative talents will prove to be a valuable resource for your
            organization. I look forward to an opportunity to grow with your
            organization.
          </Text>
        </StyledResult>
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
