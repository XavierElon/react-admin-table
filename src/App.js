import Home from "./pages/Home"
import RequestForm from "./pages/RequestForm";
import RequestDetails from "./pages/RequestDetails";
import CitizenRequestDetails from "./pages/CitizenRequestDetails"
import RequestApproved from "./pages/RequestApproved"
import RequestDenied from "./pages/RequestDenied"
import DenyDetails from "./pages/DenyDetails"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router basename={'/wps/myportal/gov/ohid/applications/owt-finder-admin'}>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/citizenrequestdetails/:id" exact component={CitizenRequestDetails}></Route>
        <Route path="/requestform" exact component={RequestForm}></Route>
        <Route path="/requestdetails/:id" exact component={RequestDetails}></Route>
        <Route path="/requestapproved/:id" exact component={RequestApproved}></Route>
        <Route path="/requestdenied/:id" exact component={RequestDenied}></Route>
        <Route path="/denydetails/:id" exact component={DenyDetails}></Route>
      </Switch>
    </Router>
  );
}

export default App;

