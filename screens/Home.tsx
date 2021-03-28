import * as React from "react";
import { FlatList, Keyboard, Pressable, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Text, View } from "../components/Themed";
import styled from "styled-components/native";
import { FC, useEffect, useState } from "react";
import HistoryList, { StyledHistoryItem } from "../components/HistoryList";
import RNPickerSelect from "react-native-picker-select";
import { debounce } from "lodash";
import { translate } from "../api";
import { Domain } from "../types";

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
  flex-wrap: wrap;
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
  const [targetLanguage, setTargetLanguage] = useState("et");
  const [domain, setDomain] = useState<Domain>("auto");
  const [text, setText] = useState("");

  const translateText = (
    text_ = text,
    target = targetLanguage,
    domain_ = domain
  ) => {
    translate({ text: text_, tgt: target, domain: domain_ }).then(
      (response) => {
        setText(response.result);
      }
    );
  };

  const debouncedTranslateText = debounce(translateText, 750);

  const handleTargetChange = (target_: string) => {
    setTargetLanguage(target_);
    translateText(text, target_);
  };

  return (
    <View style={styles.container} onTouchStart={Keyboard.dismiss}>
      <StyledTextArea
        placeholder={
          "We can automatically translate Estonian, Latvian, Lithuanian, English, Finnish, German and Russian. Write your text here!"
        }
        multiline
        numberOfLines={5}
        onChangeText={debouncedTranslateText}
        onFocus={() => setShowResult(true)}
        onBlur={() => {
          setShowResult(false);
        }}
        maxLength={7000}
      />

      <StyledResult onTouchStart={(e) => e.stopPropagation()}>
        <Text>{text}</Text>
      </StyledResult>

      <StyledSection>
        <Button>
          <RNPickerSelect
            onValueChange={handleTargetChange}
            value={targetLanguage}
            placeholder={{}}
            items={[
              { label: "Estonian", value: "et" },
              { label: "English", value: "en" },
              { label: "Latvian", value: "lv" },
              { label: "Lithuanian", value: "lt" },
              { label: "Finnish", value: "fi" },
              { label: "German", value: "de" },
              { label: "Russian", value: "ru" },
            ]}
          />
        </Button>

        <Button>
          <RNPickerSelect
            onValueChange={setDomain}
            value={domain}
            placeholder={{}}
            items={[
              { label: "Auto", value: "auto" },
              { label: "Formal", value: "fml" },
              { label: "Informal", value: "inf" },
            ]}
          />
        </Button>
      </StyledSection>

      <HistoryList
        translations={[
          { from: "hello", to: "more" },
          { from: "hello", to: "more" },
        ]}
      />
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
