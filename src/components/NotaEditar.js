import {
    Button,
    FormControl,
    Grid,
    Box,
    Paper,
    TextField,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import React, { useState } from "react";

//REDUX
import { useDispatch } from "react-redux";
import { editarNotas } from "../action/notasAction";
import Error from "./Error";

const NotaEditar = ({ nota, classes, seteditaNota, editaNota }) => {
    const dispatch = useDispatch();

    const [notaNueva, setnotaNueva] = useState({
        ...nota,
    });
    const [errorForm, setErrorForm] = useState(false);

    const guardarCambiosSubmit = (e) => {
        e.preventDefault();

        if (notaNueva.title.trim() === "" || notaNueva.text.trim() === "") {
            setErrorForm(true);
            return;
        }

        setErrorForm(false);
        dispatch(editarNotas(notaNueva));

        seteditaNota();
    };

    const onChangeNotaNueva = (e) => {
        setnotaNueva({
            ...notaNueva,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <Grid item xs={8}>
            <form onSubmit={guardarCambiosSubmit}>
                <Box mt={2} mb={4}>
                    <Button
                        type="submit"
                        color="secondary"
                        variant="contained"
                        fullWidth={true}
                        startIcon={<SaveIcon />}
                    >
                        Guardar Cambios
                    </Button>
                </Box>
                <Paper className={classes.gridEditar}>

                    {errorForm&& (<Error msg="No deben haber campos vacios en tu nota"/>)}

                    <FormControl fullWidth margin="normal">
                        <TextField
                            type="text"
                            label="Titulo de nota"
                            id="titulo"
                            name="title"
                            variant="outlined"
                            margin="normal"
                            onChange={onChangeNotaNueva}
                            defaultValue={nota.title}
                        ></TextField>
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <TextField
                            label="¿ Que desear anotar ?"
                            name="text"
                            multiline
                            rows={20}
                            className={classes.textArea}
                            defaultValue={nota.text}
                            onChange={onChangeNotaNueva}
                            variant="outlined"
                        ></TextField>
                    </FormControl>
                </Paper>
            </form>
        </Grid>
    );
};

export default NotaEditar;
