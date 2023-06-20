/* eslint-disable react/prop-types */
import styled from "styled-components";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useState, useEffect } from "react";

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

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  gap: 10px;
`;

const EndGameBox = styled.div`
  width: auto;
  background-color: white;
  position: fixed;
  top: 20%;
  border-radius: 25px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

const ScoreBoard = styled.div`
  font-size: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Btn = styled.button`
  background-color: #c4c4c4;
  color: #000000;
  font-size: 16px;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: lightblue;
    color: #000000;
  }

  &:focus {
    outline: none;
  }
`;

const ScoreDetail = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-between;
  font-size: 1rem;
`;

const Detail = styled.p``;

const Input = styled.input`
  outline: none;
  border: none;
  border-bottom: 1px solid black;
  font-size: 1rem;
  padding: 10px;
`;

const Label = styled.label`
  font-size: 1.5rem;
`;

const HighScoreBoard = ({ time, resetGame }) => {
  const [playerName, setPlayerName] = useState(""); // State variable for storing the player's name
  const [scores, setScores] = useState([]); // State variable for storing the high scores
  const [formToggle, setFormToggle] = useState(true); // State variable for controlling the visibility of the name input form

  // Function to sort the scores in ascending order
  function sortScores(arr) {
    let newArr = [...arr];
    return newArr.sort((a, b) => {
      const timeA = a.time.split(":").map(Number); // Convert the time string into an array of numbers [minutes, seconds]
      const timeB = b.time.split(":").map(Number);

      if (timeA[0] === timeB[0]) {
        return timeA[1] - timeB[1];
      }
      return timeA[0] - timeB[0];
    });
  }

  // Function to add the player's time to the database
  async function addTimeDb() {
    await setDoc(doc(db, "scoreBoard", playerName), {
      name: playerName,
      time: time,
    });
  }

  // Function to fetch the scores from the database
  async function fetchScores() {
    const querySnapshot = await getDocs(collection(db, "scoreBoard"));
    const data = querySnapshot.docs.map((score) => score.data());
    const sortedScores = sortScores(data);
    setScores(sortedScores);
  }

  useEffect(() => {
    fetchScores(); // Fetch the scores when the component mounts
  });

  // Function to handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    addTimeDb(); // Add the player's time to the database
    fetchScores(); // Fetch the updated scores
    setFormToggle(false); // Hide the name input form
  };

  return (
    <>
      <Wrapper>
        <EndGameBox>
          {formToggle ? (
            <Form>
              <Label>Input your name:</Label>
              <Input
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
              />
              <Btn onClick={(e) => handleSubmit(e)}>Submit</Btn>
            </Form>
          ) : null}
          {!formToggle ? (
            <ScoreBoard>
              {" "}
              Scoreboard:
              {scores.map((score, index) => {
                return (
                  <ScoreDetail key={index}>
                    <Detail>{`${index + 1}. Player: ${score.name}`}</Detail>
                    <Detail>{`Time: ${score.time}`}</Detail>
                  </ScoreDetail>
                );
              })}
              <Btn onClick={() => resetGame()}>Restart Game</Btn>
            </ScoreBoard>
          ) : null}
        </EndGameBox>
      </Wrapper>
      <Blur></Blur>
    </>
  );
};

export default HighScoreBoard;
