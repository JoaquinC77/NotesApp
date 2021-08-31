import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import NotesIcon from "@material-ui/icons/Notes";
import React from "react";

//redux
import { useDispatch } from 'react-redux';
import { cargarNotaAction } from '../action/notasAction';

const NotaTitle = ({nota}) => {
    const dispatch = useDispatch();

    const notaSeleccionada = () => {
        dispatch(cargarNotaAction(nota));
    }

    return (
        <ListItem button={true} onClick={() => notaSeleccionada()}>
            <ListItemIcon>
                <NotesIcon />
            </ListItemIcon>
            <ListItemText
                primary={nota.title}
                secondary={nota.fecha.substr(0,10)}
            />
        </ListItem>
    );
};

export default NotaTitle;
