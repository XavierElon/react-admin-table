import Home from "./pages/Home"
import RequestForm from "./pages/RequestForm";
import RequestDetails from "./pages/RequestDetails";
import CitizenRequestDetails from "./pages/CitizenRequestDetails"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router basename={'/wps/myportal/gov/ohid/applications/owt-finder-admin'}>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/citizenrequestdetails/:id" exact component={CitizenRequestDetails}></Route>
        <Route path="/requestform" exact component={RequestForm}></Route>
        <Route path="/requestdetails/:id" exact component={RequestDetails}></Route>
      </Switch>
    </Router>
  );
}

export default App;

