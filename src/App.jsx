import "./App.css";
import Nav from "./components/Nav";
import Home from "./containers/Home";
import Categories from "./containers/Categories";
import Latest from "./containers/Latest";
import Sell from "./containers/Sell";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/categories" element={<Categories />} />
          <Route exact path="/latest" element={<Latest />} />
          <Route exact path="/sell" element={<Sell />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
