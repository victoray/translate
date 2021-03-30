import * as React from "react";
import { FC, useCallback, useEffect, useState } from "react";
import {
  Keyboard,
  Route,
  StyleSheet,
  TouchableOpacity,
  unstable_batchedUpdates,
} from "react-native";
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
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const StyledSection = styled.View`
  display: flex;
  border: 1px solid #eee;
  height: 64px;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
`;

const StyledResult = styled.ScrollView`
  display: flex;
  border: 1px solid #eee;
  height: 100px;
  padding: 10px;
  background-color: white;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
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
  flex-wrap: wrap;
  background-color: white;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
`;

const StyledActivityIndicator = styled.ActivityIndicator`
  position: absolute;
  right: 0;
`;

const Button: FC<TouchableOpacity["props"]> = ({ children, ...props }) => {
  return (
    // @ts-ignore
    <StyledButton {...props}>
      <Text style={{ color: "white" }}>{children}</Text>
    </StyledButton>
  );
};

const useTranslate = () => {
  const [loading, setLoading] = useState();
  const fetchTranslation = (text: string, tgt: string, domain: Domain) => {
    setLoading(true);
    return translate({ text, tgt, domain }).finally(() => setLoading(false));
  };

  return { loading, fetchTranslation };
};

const Home: FC<{ navigation: StackNavigationProp<any>; route: Route }> = ({
  route,
}) => {
  const [targetLanguage, setTargetLanguage] = useState("et");
  const [domain, setDomain] = useState<Domain>("auto");
  const [result, setResult] = useState("");
  const [text, setText] = useState("");

  const currentUser = useAuthentication();
  const { from, to, target, domain: domain_ } = route.params || {};
  const { loading, fetchTranslation } = useTranslate();

  useEffect(() => {
    if ([from, to, target, domain_].every((v) => v)) {
      unstable_batchedUpdates(() => {
        setTargetLanguage(target);
        setDomain(domain_);
        setResult(to);
        setText(from);
      });
    }
  }, [from, to, target, domain_]);

  const translateText = (
    text_ = text,
    target = targetLanguage,
    domain_ = domain
  ) => {
    if (!text_) {
      return;
    }

    fetchTranslation(text_, target, domain_)
      .then((response) => {
        setResult(response.result);
        if (currentUser) {
          const translation_: Translation = {
            id: uuidv4(),
            from: text_,
            to: response.result,
            target,
            domain,
            favorite: false,
            timestamp: dayjs().unix(),
            userId: currentUser?.uid,
          };

          firestore.saveItem(translation_);
        }
      })
      .catch(console.log);
  };

  const debouncedTranslateText = useCallback(debounce(translateText, 750), []);

  const handleTargetChange = (target_: string) => {
    setTargetLanguage(target_);
    debouncedTranslateText(text, target_);
  };

  const handleDomainChange = (domain_: Domain) => {
    setDomain(domain_);
    debouncedTranslateText(text, target, domain_);
  };

  const textStyle = { color: "white", fontWeight: "500" } as const;
  const pickerStyle = { inputIOS: textStyle, inputAndroid: textStyle } as const;

  return (
    <View style={styles.container} onTouchStart={Keyboard.dismiss}>
      <View style={styles.shadow}>
        <StyledTextArea
          placeholder={
            "We can automatically translate Estonian, Latvian, Lithuanian, English, Finnish, German and Russian. Write your text here!"
          }
          multiline
          numberOfLines={5}
          onChangeText={(text_) => {
            setText(text_);
            debouncedTranslateText(text_);
          }}
          value={text}
          maxLength={7000}
        />

        <StyledResult onTouchStart={(e) => e.stopPropagation()}>
          {loading && <StyledActivityIndicator />}
          <Text>{result}</Text>
        </StyledResult>
      </View>

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
            onValueChange={handleDomainChange}
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

      <HistoryList
        onSelect={(translation) => {
          setResult(translation.to);
          setText(translation.from);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    paddingTop: 8,
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
  shadow: {
    width: "95%",
    borderRadius: 10,
    shadowColor: "#eee",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
});

export default Home;
