import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import tictactoe from '../../../src/assets/icons/ChatGPTTicTacToe.png';
import RPS from '../../../src/assets/icons/ChatGPTRPS.png';

const Home = () => {
  return (
    <div className={styles.page}>
      <h1 className={`${styles.neonText} ${styles.volacrome}`}>ARCADE</h1>
   
      <div className={styles.gameContainer}>
      <div className={styles.gameRPSBox}>
          <Link to="/rock-paper-scissors">
    
            <img className={styles.gameImage} src={RPS}></img>
            <p className="karmatic-text"> Rock Paper Scissors </p>
       
          </Link>
          </div>
     
          <div className={styles.gameTTTBox}>
          <Link to="/tic-tac-toe">
       
            <img className={styles.gameImage} src={tictactoe}></img>
            <p className="karmatic-text"> Tic Tac Toe </p>
          
          </Link>
          </div>
          {/* <p>Play Tic Tac Toe</p> */}
      </div>
    </div>
  );
};

export default Home;
