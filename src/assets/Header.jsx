/* eslint-disable react/prop-types */
import styled from "styled-components";

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: black;
  width: 30%;
`;

const LogoText = styled.h1`
  font-size: 2rem;
`;

const Heroes = styled.div`
  background-color: spacegray;
  width: 40%;
  display: flex;
  justify-content: center;
  padding: 5px;
  gap: 20px;
`;

const Timer = styled.div`
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Time = styled.h1`
  font-size: 2rem;
`;

const HeroImg = styled.img(
  ({ isMarked }) => `
  border: solid 3px black;
  border-radius: 10px;
  background-color: gray;
  padding: 10px 20px;
  opacity: ${isMarked ? "50%" : "100"} 
  `
);

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  background: linear-gradient(#c2c2c2, lightblue);
  height: 11vh;
  width: 100vw;
  position: fixed;
  border-bottom: 3px solid black;
`;

const Header = ({ char, time }) => {
  return (
    <Wrapper>
      <Logo>
        <LogoText>Hero Hunter</LogoText>
      </Logo>
      <Heroes>
        {char.map((ch, index) => {
          return <HeroImg isMarked={ch.marked} key={index} src={ch.image} />;
        })}
      </Heroes>
      <Timer>
        <Time>{time}</Time>
      </Timer>
    </Wrapper>
  );
};

export default Header;
