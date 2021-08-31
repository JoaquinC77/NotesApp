import { Button, FormControl, TextField } from "@material-ui/core";
import React, { Fragment, useState } from "react";

//redux
import { useDispatch } from "react-redux";
import { crearNotaAction } from "../action/notasAction";
import Error from "./Error";

const Formulario = () => {
    const dispatch = useDispatch();

    const [notaNueva, setnotaNueva] = useState({
        title: "",
        text: "",
    });
    const [errorForm, setErrorForm] = useState(false);

    const onChangeNota = (e) => {
        setnotaNueva({
            ...notaNueva,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmitGuardarNota = (e) => {
        e.preventDefault();

        if (notaNueva.title === "" || notaNueva.text === "") {
            setErrorForm(true);
            return;
        }

        setErrorForm(false);
        dispatch(crearNotaAction(notaNueva));

        document.querySelector("#formNuevaNota").reset();
    };

    return (
        <Fragment>
            <form onSubmit={onSubmitGuardarNota} id="formNuevaNota">
                {errorForm && (
                    <Error msg="No deben haber campos vacios en tu nota" />
                )}
                <FormControl fullWidth={true}>
                    <TextField
                        label="Titulo de nota"
                        name="title"
                        variant="outlined"
                        margin="normal"
                        onChange={onChangeNota}
                    ></TextField>
                </FormControl>
                <FormControl fullWidth={true}>
                    <TextField
                        label="¿ que deseas escribir ?"
                        name="text"
                        variant="outlined"
                        multiline
                        rows={8}
                        onChange={onChangeNota}
                        margin="normal"
                    ></TextField>
                </FormControl>

                <Button
                    variant="contained"
                    fullWidth
                    color="secondary"
                    type="submit"
                >
                    Listo! Guardar mi nota
                </Button>
            </form>
        </Fragment>
    );
};

export default Formulario;
