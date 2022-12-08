import "./App.css";
import Nav from "./components/Nav";
import Home from "./containers/Home";
import Categories from "./containers/Categories";
import Latest from "./containers/Latest";
import Form from "./components/Form";
import Detail from "./containers/Detail";
import NotFound from "./alerts/NotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { populateDB } from "./redux/actions";



function App() {
  populateDB();

  return (
    <div>
      <BrowserRouter>
        <Nav />
        
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/categories" element={<Categories />} />
          <Route exact path="/latest" element={<Latest />} />
          <Route exact path="/sell" element={<Form />} />
          <Route exact path="/detail/:id" element={<Detail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
