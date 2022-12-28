import "./App.css";
import Nav from "./components/Nav";
import Home from "./containers/Home";
import Categories from "./containers/Categories";
import Latest from "./containers/Latest";
import FormContainer from "./containers/formContainer";
import Detail from "./containers/Detail";
import NotFound from "./alerts/NotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { populateDB } from "./redux/actions";
import ShoppingCart from "./containers/ShoppingCart";
import { ProtectedRoute } from "./components/ProtectedRoute";
import ProfileDetail from "./containers/ProfileDetail";
import Favorites from "./containers/Favorites";
import BuyConfirm from "./components/BuyConfirm"
import UpdateProduct from "./containers/UpdateProduct"
import PostReview from "./components/PostReview";

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
          <Route
            exact
            path="/sell"
            element={
              <ProtectedRoute>
                <FormContainer />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/update/:id"
            element={
              <ProtectedRoute>
                <UpdateProduct />
              </ProtectedRoute>
            }
          />
          <Route exact path="/favorites" element={<Favorites />} />
          <Route exact path="/profile" element={<ProfileDetail />} />
          <Route exact path="/detail/:id" element={<Detail />} />
          <Route exact path="/cart" element={<ShoppingCart />} />
          <Route exact path="/success" element={<BuyConfirm />} />
          <Route path="*" element={<NotFound />} />
          <Route exact path="/reviews" element={<PostReview />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
