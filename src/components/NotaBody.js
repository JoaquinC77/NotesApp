import { Button, Grid, Paper, Typography, Box } from "@material-ui/core";
import React from "react";
import { Update, Delete } from "@material-ui/icons";

import { useDispatch } from "react-redux";
import { eliminarNotaAction } from '../action/notasAction';

const NotaBody = ({ nota, classes, seteditaNota, editaNota}) => {
    const dispatch = useDispatch();
    if (!nota) return null;

    const cambioEditaNota = () => {
        seteditaNota(!editaNota);
    };

    const eliminarNota = () => {
        dispatch(eliminarNotaAction(nota));
    }

    return (
        <Grid item xs={8}>
            <Paper className={classes.grid}>
                <Box mt={2} mb={2}>
                    <Button
                        type="button"
                        color="secondary"
                        variant="contained"
                        fullWidth={true}
                        startIcon={<Delete />}
                        onClick={() => eliminarNota()}
                    >
                        Eliminar
                    </Button>
                </Box>
                <Box mt={2} mb={4}>
                    <Button
                        type="button"
                        color="secondary"
                        variant="contained"
                        fullWidth={true}
                        startIcon={<Update />}
                        onClick={() => cambioEditaNota()}
                    >
                        Editar
                    </Button>
                </Box>
                <Typography variant="h6" align="center">
                    {nota.title}
                </Typography>
                <Typography variant="body1">{nota.text}</Typography>
            </Paper>
        </Grid>
    );
};

export default NotaBody;
