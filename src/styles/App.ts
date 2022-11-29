import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 100vh;
  background: beige;
`;

export const Title = styled.h1`
  margin: 8vh auto;
  font-size: 50px;
`;

export const StartButton = styled.button`
  margin: 10vh auto;
  width: 15vw;
  height: 6vh;
  font-size: 22px;
  background: burlywood;
  font-weight: bold;
  border-radius: 6px;

  &:hover {
    cursor: pointer;
  }
`;
