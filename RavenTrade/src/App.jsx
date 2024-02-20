import { Route, Routes } from "react-router-dom";
import signup from "./componenents/signup";
import login from "./componenents/login";

import Hero from "./componenents/Hero";
import Home from "./componenents/Home";
import Products from "./componenents/Products";
import Navbar from "./componenents/Navbar";
import Footer from "./componenents/Footer";
import MarketPlace from "./componenents/MarketPlace";
import AddItem from "./componenents/AddItem";

function App() {
  return (
    <>
      <Navbar />

        <Routes>
          <Route exact path="/" Component={Hero}></Route>
          <Route exact path="/signup" Component={signup}></Route>
          <Route exact path="/login" Component={login}></Route>
          <Route exact path="/home" Component={Home}></Route>
          <Route exact path="/myproducts" Component={Products}></Route>
          <Route exact path="/marketplace" Component={MarketPlace}></Route>
          <Route exact path="/additem" Component={AddItem}></Route>
        </Routes>
      <Footer />
    </>
  );
}

export default App;
