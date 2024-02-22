import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {BrowserRouter as Router} from "react-router-dom";
import {ChakraProvider} from "@chakra-ui/react";
import theme from "./theme.jsx";
import {AuthProvider} from "./AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <Router>
                <AuthProvider>
                    <App/>
                </AuthProvider>
            </Router>
        </ChakraProvider>
    </React.StrictMode>
);
