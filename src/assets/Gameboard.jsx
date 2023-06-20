/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styled from "styled-components";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useRef, useEffect, useState } from "react";

const GameField = styled.div``;
const Board = styled.img`
  width: 100%;
  z-index: 0;
`;

const TargetBox = styled.ul(
  ({ mode, locX, locY }) => `
    position: absolute;
    display: ${mode};
    left: ${locX}px;
    top: ${locY}px;
    border: 4px solid darkred;
    text-align: center;
    border-radius: 10px;
    padding: 10px;
    background: #fff;
    z-index: 999;
`
);

const Option = styled.li`
  list-style: none;
  &:hover {
    color: blue;
  }
`;

const FeedbackMessage = styled.div`
  position: fixed;
  top: 15%;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 999;
  text-align: center;
`;

const Message = styled.h1`
  background-color: darkred;
  color: white;
  border-radius: 10px;
  padding: 5px 10px;
`;

const Gameboard = ({ characters, setCharacters, checkWin }) => {
  const [showBox, setShowBox] = useState(false); // State to control the visibility of the target box
  const [boxLoc, setBoxLoc] = useState({ x: 0, y: 0 }); // State to store the location of the target box
  const [charLoc, setCharLoc] = useState({ x: 0, y: 0 }); // State to store the location of the selected character
  const [isVisible, setIsVisible] = useState(false); // State to control the visibility of the feedback message
  const [feedback, setFeedback] = useState(""); // State to store the feedback message

  useEffect(() => {
    let timer;
    if (isVisible) {
      timer = setTimeout(() => {
        setIsVisible(false);
      }, 1500);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isVisible]);

  const showMessage = () => {
    setIsVisible(true);
  };

  const imageRef = useRef(null);

  useEffect(() => {
    imageRef.current = document.getElementById("board-image");
  }, []);

  let viewMode = "";
  if (showBox) {
    viewMode = ""; // Show the target box
  } else {
    viewMode = "none"; // Hide the target box
  }

  // Records the location of the click and transforms it to percents
  const getClickLocation = (e) => {
    const board = imageRef.current;
    const rect = board.getBoundingClientRect();

    const offSetX = e.clientX - rect.left;
    const offSetY = e.clientY - rect.top;

    const percentX = Math.floor((offSetX / rect.width) * 100);
    const percentY = Math.floor((offSetY / rect.height) * 100);

    return {
      char: {
        x: percentX,
        y: percentY,
      },
      box: { x: e.pageX, y: e.pageY },
    };
  }

  const handleClick = (e) => {
    if (showBox) {
      setShowBox(false); // Hide the target box if clicked outside
    } else {
      const location = getClickLocation(e);
      setBoxLoc({ x: location.box.x, y: location.box.y }); // Set the location of the target box
      setCharLoc({ x: location.char.x, y: location.char.y }); // Set the location of the selected character
      setShowBox(true); // Show the target box
    }
  }

  async function readDatabase() {
    const querySnapshot = await getDocs(collection(db, "heroes"));
    let result = [];
    querySnapshot.forEach((hero) => result.push(hero.data()));
    return result;
  }

  const markChar = (name) => {
    let updateCharacters = [...characters];
    updateCharacters.map((char) => {
      if (char.name === name) {
        char.marked = true; // Mark the character as found
      }
    });
    setCharacters(updateCharacters);
  }

  async function checkMatch(char, locationX, locationY) {
    const data = await readDatabase();
    for (let i = 0; i < data.length; i++) {
      const hero = data[i];
      if (hero.name === char && hero.x === locationX && hero.y === locationY) {
        markChar(char);
        setShowBox(false); // Hide the target box
        setFeedback(`Good job! You found ${char}.`); // Set the feedback message
        showMessage();
        checkWin(); // Check if the player has won the game
        return;
      }
    }
    setFeedback("Nope, keep searching..."); // Set the feedback message
    showMessage();
    setShowBox(false); // Hide the target box
  }

  return (
    <GameField>
      {isVisible ? (
        <FeedbackMessage>
          <Message>{feedback}</Message>
        </FeedbackMessage>
      ) : null}
      <Board
        id="board-image"
        onClick={(e) => handleClick(e)}
        src="./src/cyberpunk.jpg" // Image source for the game board
      ></Board>
      <TargetBox mode={viewMode} locX={boxLoc.x} locY={boxLoc.y}>
        {characters.map((char, index) => {
          return !char.marked ? (
            <Option
              key={index}
              onClick={() => checkMatch(char.name, charLoc.x, charLoc.y)}
            >
              {char.name} {/* Display the name of the character */}
            </Option>
          ) : null;
        })}
      </TargetBox>
    </GameField>
  );
};

export default Gameboard;
