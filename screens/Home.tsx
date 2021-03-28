import * as React from "react";
import { FC, useEffect, useState } from "react";
import { Keyboard, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "../components/Themed";
import styled from "styled-components/native";
import HistoryList from "../components/HistoryList";
import RNPickerSelect from "react-native-picker-select";
import { debounce } from "lodash";
import { translate } from "../api";
import { Domain, Translation } from "../types";
import firestore from "../storage/firestore";
import useAuthentication from "../hooks/useAuthentication";
import { StackNavigationProp } from "@react-navigation/stack";
import dayjs from "dayjs";

const StyledSection = styled.View`
  display: flex;
  border: 1px solid #eee;
  height: 64px;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
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
  border-radius: 5px;
  flex: 1;
  background-color: #1890ff;
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

const Button: FC<TouchableOpacity["props"]> = ({ children, ...props }) => {
  return (
    <StyledButton {...props}>
      <Text style={{ color: "white" }}>{children}</Text>
    </StyledButton>
  );
};

const Home: FC<{ navigation: StackNavigationProp<any> }> = ({ navigation }) => {
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [targetLanguage, setTargetLanguage] = useState("et");
  const [domain, setDomain] = useState<Domain>("auto");
  const [text, setText] = useState("");

  const currentUser = useAuthentication();

  const fetchTranslations = () => {
    if (currentUser) {
      firestore.getItem(currentUser?.uid).then((querySnapshot) => {
        const translations_: Translation[] = [];
        querySnapshot.forEach((doc) => {
          translations_.push(doc.data() as Translation);
        });

        setTranslations(translations_);
      });
    }
  };

  const translateText = (
    text_ = text,
    target = targetLanguage,
    domain_ = domain
  ) => {
    if (!text_) {
      return;
    }

    translate({ text: text_, tgt: target, domain: domain_ }).then(
      (response) => {
        setText(response.result);
        if (currentUser) {
          const translation_: Translation = {
            from: text_,
            to: response.result,
            favorite: false,
            timestamp: dayjs().unix(),
            userId: currentUser?.uid,
          };
          setTranslations((state) => [translation_, ...state]);

          firestore.saveItem(translation_);
        }
      }
    );
  };

  const debouncedTranslateText = debounce(translateText, 750);

  const handleTargetChange = (target_: string) => {
    setTargetLanguage(target_);
    translateText(text, target_);
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

  const textStyle = { color: "white", fontWeight: "500" } as const;
  const pickerStyle = { inputIOS: textStyle, inputAndroid: textStyle } as const;

  return (
    <View style={styles.container} onTouchStart={Keyboard.dismiss}>
      <StyledTextArea
        placeholder={
          "We can automatically translate Estonian, Latvian, Lithuanian, English, Finnish, German and Russian. Write your text here!"
        }
        multiline
        numberOfLines={5}
        onChangeText={debouncedTranslateText}
        maxLength={7000}
      />

      <StyledResult onTouchStart={(e) => e.stopPropagation()}>
        <Text>{text}</Text>
      </StyledResult>

      <StyledSection>
        <Button style={{ marginRight: 10 }}>
          <RNPickerSelect
            onValueChange={handleTargetChange}
            style={pickerStyle}
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
            style={pickerStyle}
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

      <HistoryList translations={translations} />
    </View>
  );
};

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

export default Home;
