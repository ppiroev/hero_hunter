/* eslint-disable react/prop-types */
import styled from "styled-components";

const Blur = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 70%;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 9;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 10;
`;

const StartBox = styled.div`
  width: max(700px);
  height: 550px;
  background-color: white;
  position: fixed;
  top: 15%;
  border-radius: 25px;
  padding: 25px 50px;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

const Header = styled.h1`
  text-align: center;
  font-size: 1rem;
`;
const Info = styled.p`
  font-size: 0.7rem;
  text-align: center;
`;

const CharWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  text-align: center;
`;

const CharImg = styled.img`
  width: 100px;
  height: 100px;
`;
const CharDetail = styled.p`
  width: max(400px);
  text-align: center;
`;
const StartButton = styled.button`
  border: none;
  height: 50px;
  background-color: lightblue;
  border-radius: 15px;
  &:hover {
    background-color: #6988a8;
    color: #000000;
  }

  &:focus {
    outline: none;
  }
`;

const StartModal = ({ start }) => {
  return (
    <div>
      <Wrapper>
        <StartBox>
          <Header>Character Hunter</Header>
          <Info>
            Find the characters below as quickly as possible. Click the START
            button when ready.
          </Info>
          <CharWrap>
            <CharImg src="./src/assets/images/tom.png" />
            <CharDetail>Tom from Tom & Jerry</CharDetail>
          </CharWrap>
          <CharWrap>
            <CharImg src="./src/assets/images/imposter.webp" />
            <CharDetail>The yellow Imposter from the Imposter game.</CharDetail>
          </CharWrap>
          <CharWrap>
            <CharImg src="./src/assets/images/brian.webp" />
            <CharDetail>Brian the dog from Family Guy.</CharDetail>
          </CharWrap>
          <StartButton onClick={() => start()}>Start</StartButton>
        </StartBox>
      </Wrapper>
      <Blur></Blur>
    </div>
  );
};

export default StartModal;
