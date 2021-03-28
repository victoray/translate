import React, { FC } from "react";
import { FlatList, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { Translation } from "../types";

const StyledView = styled.View`
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledText = styled.Text`
  font-size: 14px;
`;

const StyledContainer = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 95%;
  margin-top: 25px;
  align-items: center;
`;

export const StyledHistoryItem = styled.View`
  padding: 8px;
  border: 1px solid #eee;
  border-left-width: 0;
  border-right-width: 0;
  border-bottom-width: 0;
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
  translations: Translation[];
}> = ({ translations }) => {
  return (
    <StyledView>
      <StyledContainer>
        <FlatList
          style={styles.flatList}
          keyExtractor={(_, index) => String(index)}
          data={translations}
          renderItem={({ item, index }) => (
            <StyledHistoryItem key={index}>
              <StyledText>{item.from}</StyledText>
              <StyledText>{item.to}</StyledText>
            </StyledHistoryItem>
          )}
        />
      </StyledContainer>
    </StyledView>
  );
};

export default HistoryList;
