import Display from "./Display";
import AddPointBtn from "./AddPointBtn";
import RestartBtn from "./RestartBtn";
import PlayPauseBtn from "./PlayPauseBtn";

function App() {
  return (
    <div id="root">
      <Display />
      <div className="buttons">
        <div className="buttons-row">
          <AddPointBtn player="player1" />
          <AddPointBtn player="player2" />
        </div>
        <div className="buttons-row">
          <RestartBtn />
          <PlayPauseBtn />
        </div>
      </div>
    </div>
  )
}

export default App;
