import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import MarketPlace from "./pages/MarketPlace.jsx";
import AddItem from "./componenents/AddItem";
import MainLayout from "./pages/MainLayout.jsx";
import ProtectedRoute from "./componenents/ProtectedRoute.jsx";
import Product from "./componenents/Product.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute
              component={<MainLayout childComponent={<Home />} />}
            />
          }
        />

        <Route
          path="/marketplace"
          element={
            <ProtectedRoute
              component={<MainLayout childComponent={<MarketPlace />} />}
            />
          }
        />

        <Route
          path="/myproducts"
          element={
            <ProtectedRoute
              component={<MainLayout childComponent={<Products />} />}
            />
          }
        />

        <Route
          path="/additem"
          element={
            <ProtectedRoute
              component={<MainLayout childComponent={<AddItem />} />}
            />
          }
        />

        <Route
          path="/product"
          element={
            <ProtectedRoute
              component={<MainLayout childComponent={<Product />} />}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
