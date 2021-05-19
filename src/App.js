import "./App.css";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Table from "./Components/Table";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="Content-Wrap">
          <div className="Header">
            <Header></Header>
          </div>
          <div className="DataTable">
            <Table></Table>
          </div>
          <div className="Footer">
            <Footer></Footer>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
