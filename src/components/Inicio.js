import React, { useEffect } from "react";

//material ui
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../temaConfig/temaConfig';
import Contenedor from "./Contenedor";

//redux
import { cargandoNotasAction } from '../action/notasAction';
import { useDispatch, useSelector } from 'react-redux';

const Inicio = (props) => {
    const dispatch = useDispatch();
    const { autenticado } = useSelector(state => state.users);

    useEffect(() => {
        if(!autenticado){
            props.history.push('/');
            return;
        }
        dispatch(cargandoNotasAction());
        

        //eslint-disable-next-line
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <Contenedor/>
        </ThemeProvider>
    );
};

export default Inicio;
