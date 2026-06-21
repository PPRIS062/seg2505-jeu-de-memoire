import Card from "./Card";

function GameBoard({
  cards,
  handleChoice,
  turns,
  time,
  disabled,
  quitGame
}) {
  return (
    <div>

      <div className="stats">
        <p>⏱ Temps : {time}s</p>
        <p>🎯 Coups : {turns}</p>

        <button
          className="quit-btn"
          onClick={quitGame}
        >
          Quitter
        </button>
      </div>

      <div className="board">
        {cards.map(card => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            disabled={disabled}
          />
        ))}
      </div>

    </div>
  );
}

export default GameBoard;