function Card({ card, handleChoice, disabled }) {

  const handleClick = () => {
    if (!disabled && !card.flipped && !card.matched) {
      handleChoice(card);
    }
  };

  return (
    <div
      className={`card ${
        card.flipped || card.matched
          ? "flipped"
          : ""
      }`}
      onClick={handleClick}
    >
      {card.flipped || card.matched
        ? card.value
        : "❓"}
    </div>
  );
}

export default Card;