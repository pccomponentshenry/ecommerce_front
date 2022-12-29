import "./App.css";
import Nav from "./components/Nav";
import Home from "./containers/Home";
import OrderForm from "./containers/OrderForm";
import FormContainer from "./containers/formContainer";
import Detail from "./containers/Detail";
import NotFound from "./alerts/NotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { populateDB } from "./redux/actions";
import ShoppingCart from "./containers/ShoppingCart";
import { ProtectedRoute } from "./components/ProtectedRoute";
import ProfileDetail from "./containers/ProfileDetail";
import Favorites from "./containers/Favorites";
import BuyConfirm from "./components/BuyConfirm";
import UpdateProduct from "./containers/UpdateProduct";
<<<<<<< HEAD
import AddReview from "./containers/AddReview";
=======
import DashBoard from "./containers/DashBoard"
import DashBoardSales from "./containers/DashBoardSales"
import DashBoardUsers from "./containers/DashBoardUsers"
>>>>>>> 90f8108dbd0e541d77a3e5b477d319d62466bebb

function App() {
  populateDB();

  return (
    <div>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route exact path="/" element={<Home />} />

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
<<<<<<< HEAD
          <Route exact path="/order" element={<OrderForm />} />
=======
          <Route exact path="/dashboard" element={<DashBoard />} />
          <Route exact path="/dashboard/sales" element={<DashBoardSales />} />
          <Route exact path="/dashboard/users" element={<DashBoardUsers />} />
>>>>>>> 90f8108dbd0e541d77a3e5b477d319d62466bebb
          <Route exact path="/profile" element={<ProfileDetail />} />
          <Route exact path="/detail/:id" element={<Detail />} />
          <Route exact path="/cart" element={<ShoppingCart />} />
          <Route exact path="/success" element={<BuyConfirm />} />
          <Route exact path="/addreview" element={<AddReview />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
