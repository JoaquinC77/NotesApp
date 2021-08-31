import React, { useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { usuarioAutenticado } from '../action/usersAction';

const RutaPrivada = ({component: Component, ...props}) => {
    const dispatch = useDispatch();
    const { autenticado, cargando } = useSelector(state => state.users);

    useEffect(() => {
        dispatch(usuarioAutenticado());

        //eslint-disable-next-line
    }, []);

    return (
        <Route
            {...props} render={ props => !autenticado && !cargando ? (
                <Redirect to="/" />
            ) : (
                <Component {...props} />
            )}
        >
        </Route>

    );
}
 
export default RutaPrivada;