import React, { useState } from 'react';

const NumberGuesser: React.FC = () => {
  const [secretNumber, setSecretNumber] = useState<number>(generateRandomNumber());
  const [guess, setGuess] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');
  const [attempts, setAttempts] = useState<number>(0);
  const [maxAttempts] = useState<number>(10);
  const [gameOver, setGameOver] = useState<boolean>(false);

  function generateRandomNumber(): number {
    return Math.floor(Math.random() * 100) + 1;
  }

  const handleGuess = () => {
    if (gameOver) return;

    const guessNumber = parseInt(guess);
    if (isNaN(guessNumber)) {
      setFeedback('Please enter a valid number.');
      return;
    }

    setAttempts(attempts + 1);

    if (guessNumber < secretNumber) {
      setFeedback('Too low!');
    } else if (guessNumber > secretNumber) {
      setFeedback('Too high!');
    } else {
      setFeedback('Congratulations! You guessed the number!');
      setGameOver(true);
      return;
    }

    if (attempts + 1 >= maxAttempts) {
      setFeedback(`You've reached the maximum attempts! The number was ${secretNumber}.`);
      setGameOver(true);
    }
  };

  const handleRestart = () => {
    setSecretNumber(generateRandomNumber());
    setGuess('');
    setFeedback('');
    setAttempts(0);
    setGameOver(false);
  };

  return (
    <div className="number-guesser">
      <h1>Number Guesser Game</h1>
      <p>Guess the number between 1 and 100</p>
      <p>Attempts: {attempts}/{maxAttempts}</p>
      <input
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        disabled={gameOver}
      />
      <button onClick={handleGuess} disabled={gameOver}>Guess</button>
      {gameOver && <button onClick={handleRestart}>Restart</button>}
      <p>{feedback}</p>
    </div>
  );
};

export default NumberGuesser;
