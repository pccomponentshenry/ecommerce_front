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
import UpdateProduct from "./containers/UpdateProduct";
import AddReview from "./containers/AddReview";
import DashBoard from "./containers/DashBoard";
import DashBoardSales from "./containers/DashBoardSales";
import DashBoardUsers from "./containers/DashBoardUsers";
import OrderConfirmed from "./components/OrderConfirmed";
import AddressUpdate from "./components/AddressUpdate";

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
            path="/address/:userId/:id"
            element={<AddressUpdate />}
          />
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
          <Route exact path="/order" element={<OrderForm />} />
          <Route exact path="/dashboard" element={<DashBoard />} />
          <Route exact path="/dashboard/sales" element={<DashBoardSales />} />
          <Route exact path="/dashboard/users" element={<DashBoardUsers />} />
          <Route exact path="/profile" element={<ProfileDetail />} />
          <Route exact path="/detail/:id" element={<Detail />} />
          <Route exact path="/cart" element={<ShoppingCart />} />
          <Route exact path="/success" element={<OrderConfirmed />} />
          <Route exact path="/addreview" element={<AddReview />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
