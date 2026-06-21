function Result({
  time,
  turns,
  restart,
  goHome
}) {
  return (
    <div className="result">

      <h1>🏆 Félicitations !</h1>

      <p>Vous avez trouvé toutes les paires.</p>

      <h2>Résultats</h2>

      <p>⏱ Temps : {time} secondes</p>

      <p>🎯 Coups : {turns}</p>

      <div className="result-buttons">
        <button onClick={restart}>
          Rejouer
        </button>

        <button onClick={goHome}>
          Retour au menu
        </button>
      </div>

    </div>
  );
}

export default Result;