import React, { Fragment } from "react";
import {
    List,
    Divider
} from "@material-ui/core";
import { LinearProgress } from '@material-ui/core';

//redux
import { useSelector } from "react-redux";

//components
import NotaTitle from './NotaTitle';
import Error from './Error';


const ListasNotas = () => {
    //redux
    const { notas, cargando, error } = useSelector((state) => state.notas);
    //--

    return (
        <Fragment>
            {cargando&& (<LinearProgress color="secondary"/>)}
            {error&& (<Error msg="Ocurrio un error" />)}

            <List components="nav">
                {notas.map(nota => (
                    <NotaTitle key={nota._id} nota={nota} />
                ))}              
                <Divider />
            </List>
        </Fragment>
    );
};

export default ListasNotas;
