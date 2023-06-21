import Header from "./Header";
import Gameboard from "./Gameboard";
import StartModal from "./StartModal";
import HighScoreBoard from "./HighScoreBoard";
import GlobalStyle from "./GlobalStyle";
import { useState, useEffect } from "react";
import Tom from "./images/tom.png";
import Brian from "./images/brian.webp"
import Imposter from "./images/imposter.webp"

const App = () => {
  const [startModalToggle, setStartModalToggle] = useState(true); // State variable for controlling the start modal visibility
  const [scoreBoardToggle, setScoreBoardToggle] = useState(false); // State variable for controlling the score board visibility
  const [timer, setTimer] = useState(0); // State variable for the game timer
  const [isRunning, setIsRunning] = useState(false); // State variable for tracking if the game is running or not
  const [characters, setCharacters] = useState([
    // State variable for storing the characters in the game
    {
      name: "Tom",
      marked: false,
      image: Tom,
    },
    {
      name: "Imposter",
      marked: false,
      image: Imposter,
    },
    {
      name: "Brian",
      marked: false,
      image: Brian,
    },
  ]);

  useEffect(() => {
    // Timer effect using useEffect hook
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  const formatTime = (time) => {
    // Helper function to format the time as mm:ss
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleStart = () => {
    // Event handler for starting the game
    setIsRunning(true);
  };

  const handleStop = () => {
    // Event handler for stopping the game
    setIsRunning(false);
  };

  const startGame = () => {
    // Function for starting the game and hiding the start modal
    setStartModalToggle(false);
    handleStart();
  }

  const checkWin =() => {
    // Function for checking if the game is won
    const result = characters.filter((char) => char.marked !== true);
    if (result.length === 0) {
      handleStop();
      setScoreBoardToggle(true);
    }
  }

  const resetMarkedCharacters = () => {
    // Function for resetting the marked characters
    let resetCharacters = [...characters];
    resetCharacters.forEach((char) => {
      char.marked = false;
    });
    setCharacters(resetCharacters);
  }

  const resetGame = () => {
    // Function for resetting the game
    resetMarkedCharacters();
    setTimer(0);
    setIsRunning(true);
    setScoreBoardToggle(false);
  }
  return (
    <>
      <GlobalStyle />
      <Header time={formatTime(timer)} char={characters} />
      <Gameboard
        characters={characters}
        setCharacters={setCharacters}
        checkWin={checkWin}
      />
      {startModalToggle ? <StartModal start={startGame} /> : null}
      {scoreBoardToggle ? (
        <HighScoreBoard resetGame={resetGame} time={formatTime(timer)} />
      ) : null}
    </>
  );
}

export default App;
