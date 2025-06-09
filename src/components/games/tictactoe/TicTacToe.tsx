import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './TicTacToe.module.css'

type Player = 'circle' | 'cross' | ''; // possible values for a cell
type Winner = Player | null;

const comboMap: Record<string, number[]> = {
    row1: [0, 1, 2],
    row2: [3, 4, 5],
    row3: [6, 7, 8],
    col1: [0, 3, 6],
    col2: [1, 4, 7],
    col3: [2, 5, 8],
    diag1: [0, 4, 8],
    diag2: [2, 4, 6],
  };

  const winningCombos = Object.values(comboMap);

const TicTacToe = () => {
    const [board, setBoard] = useState<Player[]>(Array(9).fill(''));
    const [go, setGo] = useState<Player>('circle');
    const [winner, setWinner] = useState<Winner>(null);
    const[winningCombo, setWinningCombo] = useState<number[] | null>(null);

    const handleClick = (index : number) : void => {
        if(board[index] !== "" || winner) return;

        const newBoard = [...board]; // make a shallow copy of the current board so we don't mutate the original directly which react doesn't like
        newBoard[index] = go; //update the clicked square with the current player on that index
        setBoard(newBoard); // save new board in state
        setGo(go === "circle" ? "cross" : "circle");

        checkWinner(newBoard);
    }

    //loop through each winning combo
    //if all 3 squares at those positions are filled
    //if all 3 squares have the same value as circle or cross
    //set winner
    //updatedBoard[a] returns 'circle or cross' // a is the index same as updatedBoard[combo[0]]
    const checkWinner = (updatedBoard : Player[]) : void => {
        
        //looping through each combo and checking inside an if it is a winningcombo
        winningCombos.forEach((combo) => {

           const[ a, b, c ]= combo;

            if(
                updatedBoard[a] &&
                updatedBoard[a] === updatedBoard[b] &&
                updatedBoard[a] === updatedBoard[c] 
            )
            {
                //if so then set the winner
                setWinner(updatedBoard[a]);
                setWinningCombo([a,b,c]); 
                return; //stops checking further combos
            }
        });
    };

    const handleRestart = () => {
        setBoard(Array(9).fill('')); //reset board
        setWinner(null);
        setGo('circle');
    }

    const getLineClass = (combo : number[]) : string | null => {

        //Object.entries(comboMap) turn comboMap into an array of key,value.. key is "row1", value is [0,1,2]
        //ignore key by leaving it blank
        //to string because [0 ,1,2] === [0,1,2] are different references
        //but "0,1,2" === "0,1,2"
        //if find returns matching than it grabs KEY aka row1
        const match = Object.entries(comboMap).find(([ , value]) => value.toString() ===  combo.toString());

        if (match && match[0].startsWith("diag")) {
            return null;
          }
        
          return match?.[0] || null;
    }

  return (
    <div className={styles.page}>
      <Link to="/"> <button> Return to Arcade</button></Link> 
        <h1>Tic Tac Toe</h1>
        <div className={styles.info}> 
            {winner ? 
            `${winner === 'circle' ? "O" : "X"} wins!`
             : `It is ${go === 'circle' ? "O" : "X"}'s turn`}
        </div>

        <div className={styles.gameboard}>

            {board.map((cell, index) => (
                <div key={index} className={styles.square} onClick={() => handleClick(index)}>
                    {cell && <div className={styles[cell]}> </div>} 
                </div>
            ))}
       
            {winner && winningCombo && <div className={`${styles.line} ${styles[`line-${getLineClass(winningCombo)}`]} ${styles.active}`} />}
            </div>
        <button onClick={handleRestart}>Restart</button>
    </div>
  )
}

export default TicTacToe
