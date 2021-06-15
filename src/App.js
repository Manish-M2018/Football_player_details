import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar";
import addPlayer from "./components/addPlayer";
import deletePlayer from './components/deletePlayer';
import playerDetails from './components/playerDetails';
import updatePlayerDetails from './components/updatePlayerDetails';
import Footer from "./components/footer"

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route path="/" exact component={playerDetails} />
        <Route path="/addPlayer" exact component={addPlayer} />
        <Route path="/deletePlayer" exact component={deletePlayer} />
        <Route path="/updatePlayerDetails" exact component={updatePlayerDetails} />
        <br />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
