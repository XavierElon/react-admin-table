import "./App.css";
import Dashboard from "./pages/Dashboard";
import RequestForm from "./pages/RequestForm";
import RequestDetails from "./pages/RequestDetails";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Dashboard}></Route>
        <Route path="/requestform" exact component={RequestForm}></Route>
        <Route path="/requestdetails" exact component={RequestDetails}></Route>
      </Switch>
    </Router>
  );
}

export default App;
