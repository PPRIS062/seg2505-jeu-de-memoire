function Home({
  level,
  setLevel,
  theme,
  setTheme,
  startGame
}) {
  return (
    <div className="home">

      <h1>🧠 Jeu de mémoire</h1>

      <p>
        Testez votre mémoire et trouvez toutes les paires !
      </p>

      <div className="config">

        <label>Niveau</label>

        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        >
          <option value="easy">Débutant</option>
          <option value="medium">Intermédiaire</option>
          <option value="hard">Expert</option>
        </select>

        <label>Thème</label>

        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        >
          <option value="animals">Animaux</option>
          <option value="nature">Nature</option>
          <option value="fruits">Fruits</option>
        </select>

        <button onClick={startGame}>
          Commencer
        </button>

      </div>

    </div>
  );
}

export default Home;