import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import RockPaperScissors from './components/games/RockPaperScissors/RockPaperScissors';
import TicTacToe from './components/games/tictactoe/TicTacToe';

function App() {
 

  return (
    
    <Router basename='/ReactArcade'>
      <Routes>
       <Route path='/' element={<Home />} ></Route>
       <Route path='/rock-paper-scissors' element={<RockPaperScissors />} ></Route>
       <Route path='/tic-tac-toe' element={<TicTacToe />}></Route>
      </Routes>
    </Router>
   
  )
}

export default App
