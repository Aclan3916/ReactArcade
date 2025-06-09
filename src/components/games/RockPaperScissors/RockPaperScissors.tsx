import { useState } from 'react';
import fistIcon from '../../../assets/icons/Fist.png';
import paperIcon from '../../../assets/icons/Paper.png';
import scissorsIcon from '../../../assets/icons/Scissors.png';
import styles from './RockPaperScissors.module.css';
import { Link } from 'react-router-dom';
const winningChoices: Record<string, string> = {
  rock: 'scissors',
  paper: 'rock',
  scissors: 'paper'
}

const RockPaperScissors = () => {
  const [playerChoice, setPlayerChoice] = useState('');
  const [computerChoice, setComputerChoice] = useState('');
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [result, setResult] = useState('');
  const [countdown, setCountDown] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [showHands, setShowHands] = useState(true);
  const [showPlayingHands, setShowPlayingHands] = useState(false);

  const playGame = (playersChoice: string) => {
    
    setResult('');
    setShowHands(false);
    setShowPlayingHands(true);
    setPlayerChoice(playersChoice)
    setCountDown('');

    const words = ['Rock...', 'Paper...', 'Scissors...'];

    let i = 0;

    const interval = setInterval(() => {
      setIsAnimating(true);
      setCountDown(words[i]);
      i++;

      if (i === words.length) {
        clearInterval(interval);

        setTimeout(() => {
          const computerOptions = ['rock', 'paper', 'scissors'];
          const randomIndex = Math.floor(Math.random() * computerOptions.length);
          const computerChoice = computerOptions[randomIndex];

          setComputerChoice(computerChoice);
          let outcome = '';

          if (playersChoice === computerChoice) {
            outcome = "Draw!";
          }
          else if (winningChoices[playersChoice] === computerChoice) {
            setPlayerScore(prev => prev + 1);
            outcome = "You Win!"
          } else {
            setComputerScore(prev => prev + 1);
            outcome= "You Lost!"
          }
          
          setShowHands(true);
          setResult(outcome);
          setIsAnimating(false);
          setCountDown('');
          
          
        }, 500);
      }
    }, 600);
  }

  const getIcon = (choice: string) =>
  {
    switch(choice) {
      case 'rock':
        return fistIcon;
      case 'paper':
        return paperIcon;
      case 'scissors':
        return scissorsIcon;
      default: 
        return fistIcon;

    }
  } 

  return (
    
    <div className={styles.page}>
      <div className={styles.container}>
      <Link to="/"><button>Return to Arcade</button></Link>
        <h1> Rock, Paper, Scissors</h1>

        <button className={styles.restartBtn}
    onClick={() => {
    setPlayerChoice('');
    setComputerChoice('');
    setResult('');
    setShowHands(true);
    setShowPlayingHands(false);
    setCountDown('');
    setIsAnimating(false);
    setPlayerScore(0);
    setComputerScore(0);
  }}>
  Restart
  </button>

        <div className={styles.score}>
          <p>Player {playerScore} </p>
          <p>Computer {computerScore}</p>
        </div>

        <div className={`${styles.choices} ${showHands ? styles.show : styles.hide}`}>

          <div className={styles.choiceContainer}>
            <img className={styles.choiceIcon} src={fistIcon} onClick={() => playGame('rock')} alt="Fist" />
            <label>Rock</label>
          </div>

          <div className={styles.choiceContainer}>
            <img className={styles.choiceIcon} src={paperIcon} onClick={() => playGame('paper')} alt="Paper" />
            <label>Paper</label>
          </div>

          <div className={styles.choiceContainer}>
            <img className={styles.choiceIcon} src={scissorsIcon} onClick={() => playGame('scissors')} alt="Scissors" />
            <label>Scissors</label>
          </div>

        </div>

        <p className={styles.result}>{result}</p>

        <div className={`${styles.handscontainer} ${showPlayingHands ? styles.show : styles.hide}`}>
          <img className={`${styles.playerHand} ${isAnimating ? styles.animateHand : ''}`} src={result && !isAnimating? getIcon(playerChoice) : fistIcon} alt="Fist" />
          <div className={styles.countdownText}>{countdown}</div>
          <img className={`${styles.computerHand} ${isAnimating ? styles.animateHand : ''}`} src={result && !isAnimating ? getIcon(computerChoice) : fistIcon} alt="Fist" />
        </div>
      </div>
      </div>
    
  )
}

export default RockPaperScissors;
