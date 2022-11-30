import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: auto;
`;

export const Score = styled.h2``;

export const PerfectScore = styled.h1`
  margin: 5px auto;
`;

export const StarsEyesEmoji = styled.img`
  height: 100px;
  width: 100px;
  margin: 5px auto;
`;

export const ScoreDetails = styled.h3``;

export const MistakesContainer = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  line-height: 1.3;
  max-height: 10vh;
  overflow-y: auto;
`;

export const MistakeDetails = styled.li`
  font-size: 18px;
`;

export const PlayAgainButton = styled.button`
  position: absolute;
  bottom: 15px;
  margin: auto;
  width: 200px;
  height: 40px;
  font-size: 22px;
  background: antiquewhite;
  font-weight: bold;
  border-radius: 6px;

  &:hover {
    cursor: pointer;
  }
`;
