import './App.css';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import UserDash from './components/UserDash';
import AddNew from './components/AddNew';
import Edit from './components/Edit';



function App() {
  return (
    <BrowserRouter>
      <div className="App container">
      </div>
      <Switch>
        <Route exact path="/">
          <Login></Login>
        </Route>
        <Route exact path="/signup">
          <Signup></Signup>
        </Route>
        <Route exact path="/userdash">
          <UserDash></UserDash>
        </Route>
        <Route exact path="/add/new">
          <AddNew></AddNew>
        </Route>
        <Route exact path="/edit/:_id">
          <Edit></Edit>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
