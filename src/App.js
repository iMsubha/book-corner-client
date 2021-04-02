import { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Admin from "./components/Admin/Admin";
import Deals from "./components/Deals/Deals";
import Home from './components/Home/Home';
import Login from "./components/Login/Login";
import Orders from "./components/Orders/Orders";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";


export const UserContext = createContext();
function App() {
  const [loginUser, setLoginUser] = useState({})
  return (
    <UserContext.Provider value={[loginUser, setLoginUser]}>
    <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <PrivateRoute path="/orders">
            <Orders/>
          </PrivateRoute>
          <PrivateRoute path="/admin">
            <Admin/>
          </PrivateRoute>
          <Route path="/deals">
            <Deals/>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
