import { ChakraProvider } from "@chakra-ui/react";

import { Route, Routes } from "react-router-dom";

import signup from './componenents/signup';
import login from './componenents/login';

import Home from './componenents/Home';

function App() {
  return (
    <ChakraProvider>
      <Routes>
      <Route exact path="/" Component={Home}></Route>
      <Route exact path="/signup" Component={signup}></Route>
      <Route exact path="/login" Component={login}></Route>
      
      </Routes>
    </ChakraProvider>
  );
}

export default App;
