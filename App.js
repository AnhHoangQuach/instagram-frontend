import './App.css';
import Box_left from './components/Box_left';
import Footer from './components/Footer';
import Nav from './components/Nav';
import EditProfile from './components/EditProfile';
import Change_Pwd from './components/Change_Pwd';
import Website from './components/Website';
import Email from './components/Email';
import Dieuhuong from './router/Dieuhuong';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="container">
        <Nav></Nav>
        <div className="row main">
          <div className="col-4"><Box_left></Box_left></div>
          <div className="col-8"><Dieuhuong></Dieuhuong></div>
        </div>
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;
