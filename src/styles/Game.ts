import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ExplainSection = styled.h3`
  margin: 0;
  font-weight: normal;
`;

export const TypingInput = styled.input`
  width: 50vw;
  height: 20px;
  margin: auto;
  margin-bottom: 20px;
  padding: 5px;
  border-radius: 8px;
  text-align: center;
  font-size: 22px;
`;

export const WordsContainer = styled.div`
  height: 42vh;
  width: 50vw;
  margin: auto;
  background: burlywood;
  border: 1px solid gray;
  border-radius: 10px;
  overflow: hidden;
  padding: 5px 10px;
`;

export const WordChip = styled.span`
  padding: 0 5px;
  display: inline-block;
  text-align: left;
  font-size: 22px;
  line-height: 1.5;
`;
