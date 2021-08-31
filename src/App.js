import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import NuevaCuenta from "./components/NuevaCuenta";
import Inicio from './components/Inicio';
import RutaPrivada from "./rutas/RutaPrivada";
import authToken from './config/authToken';

import { Provider } from "react-redux";
import store from "./store";

const token = localStorage.getItem('token');
if(token){
  authToken(token);
}

function App() {
    return (
        <Provider
          store={store}
        >
          
            <Router>
                <Switch>
                    <Route exact path="/" component={Login}></Route>
                    <Route
                        exact
                        path="/nuevaCuenta"
                        component={NuevaCuenta}
                    ></Route>
                    <RutaPrivada
                      exact
                      path="/notas"
                      component={Inicio}
                    >

                    </RutaPrivada>
                </Switch>
            </Router>
        </Provider>
    );
}

export default App;
