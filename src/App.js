import "./App.css";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Table from "./Components/Table";

function App() {
  return (
    <div className="App">
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
  );
}

export default App;
