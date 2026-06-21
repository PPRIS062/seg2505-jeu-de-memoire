import { useState, useEffect } from "react";

import "./App.css";

import Home from "./components/Home";
import GameBoard from "./components/GameBoard";
import Result from "./components/Result";

import { themes } from "./data/theme";

function App() {

  const [level, setLevel] = useState("easy");
  const [theme, setTheme] = useState("animals");

  const [started, setStarted] = useState(false);

  const [cards, setCards] = useState([]);

  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  const [turns, setTurns] = useState(0);
  const [time, setTime] = useState(0);

  const [disabled, setDisabled] = useState(false);

  const createCards = () => {

    let pairs = 8;

    if (level === "medium") pairs = 10;
    if (level === "hard") pairs = 18;

    const selected = themes[theme].slice(0, pairs);

    return [...selected, ...selected]
      .map(item => ({
        value: item,
        matched: false,
        flipped: false,
        id: Math.random()
      }))
      .sort(() => Math.random() - 0.5);
  };

  const startGame = () => {

    setCards(createCards());

    setTurns(0);
    setTime(0);

    setChoiceOne(null);
    setChoiceTwo(null);

    setStarted(true);
  };

  const quitGame = () => {

    const confirmQuit = window.confirm(
      "Voulez-vous vraiment quitter la partie ?"
    );

    if (!confirmQuit) return;

    setStarted(false);
    setCards([]);

    setChoiceOne(null);
    setChoiceTwo(null);

    setTurns(0);
    setTime(0);
  };

  const goHome = () => {

    setStarted(false);

    setCards([]);

    setChoiceOne(null);
    setChoiceTwo(null);

    setTurns(0);
    setTime(0);
  };

  const handleChoice = (card) => {

    setCards(prev =>
      prev.map(c =>
        c.id === card.id
          ? { ...c, flipped: true }
          : c
      )
    );

    if (!choiceOne) {
      setChoiceOne(card);
    } else {
      setChoiceTwo(card);
    }
  };

  const resetTurn = () => {

    setChoiceOne(null);
    setChoiceTwo(null);

    setTurns(prev => prev + 1);

    setDisabled(false);
  };

  useEffect(() => {

    if (choiceOne && choiceTwo) {

      setDisabled(true);

      if (choiceOne.value === choiceTwo.value) {

        setCards(prev =>
          prev.map(card =>
            card.value === choiceOne.value
              ? { ...card, matched: true }
              : card
          )
        );

        resetTurn();

      } else {

        setTimeout(() => {

          setCards(prev =>
            prev.map(card =>
              card.id === choiceOne.id ||
              card.id === choiceTwo.id
                ? { ...card, flipped: false }
                : card
            )
          );

          resetTurn();

        }, 1000);
      }
    }

  }, [choiceOne, choiceTwo]);

  const won =
    cards.length > 0 &&
    cards.every(card => card.matched);

  useEffect(() => {

    if (!started || won) return;

    const interval = setInterval(() => {
      setTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);

  }, [started, won]);

  return (
    <div className="container">

      {!started && (
        <Home
          level={level}
          setLevel={setLevel}
          theme={theme}
          setTheme={setTheme}
          startGame={startGame}
        />
      )}

      {started && !won && (
        <GameBoard
          cards={cards}
          handleChoice={handleChoice}
          turns={turns}
          time={time}
          disabled={disabled}
          quitGame={quitGame}
        />
      )}

      {won && (
        <Result
          time={time}
          turns={turns}
          restart={startGame}
          goHome={goHome}
        />
      )}

    </div>
  );
}

export default App;