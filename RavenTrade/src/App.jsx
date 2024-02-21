import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import Signup from "./componenents/signup";
import Login from "./componenents/login";

import Hero from "./componenents/Hero";
import Home from "./componenents/Home";
import Products from "./componenents/Products";
import Navbar from "./componenents/Navbar";
import Footer from "./componenents/Footer";
import MarketPlace from "./componenents/MarketPlace";
import AddItem from "./componenents/AddItem";
import SidebarWithHeader from "./componenents/SidebarWithHeader";

function App() {
  const isAuthenticated = true;

  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Outlet />}>
          <Route index element={<Hero />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
        </Route>

        {/* Private routes */}
        <Route path="/" element={<Outlet />}>
          <Route
            path="home"
            element={
              isAuthenticated ? (
                <SidebarWithHeader childComponent={<Home/>}>
    
                </SidebarWithHeader>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="myproducts"
            element={
              isAuthenticated ? (
                <SidebarWithHeader
                  childComponent={<Products />}
                ></SidebarWithHeader>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="marketplace"
            element={
              isAuthenticated ? (
                <SidebarWithHeader childComponent={<MarketPlace />}>
                  {" "}
                </SidebarWithHeader>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="additem"
            element={
              isAuthenticated ? (
                <SidebarWithHeader
                  childComponent={<AddItem />}
                ></SidebarWithHeader>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Route>
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;
