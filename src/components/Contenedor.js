import React, { useState } from "react";
import { NavBar } from "./NavBar";

import { Grid, Hidden, makeStyles, Paper, Button } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CajaDrawer from "./CajaDrawer";

//redux
import { useSelector } from "react-redux";
import NotaBody from "./NotaBody";
import NotaEditar from "./NotaEditar";
import Formulario from "./Formulario";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
    grid: {
        padding: 15,
    },
    gridEditar: {
        padding: 20,
    },
    textArea: {
        width: "100%",
        fontSize: 18,
        fontFamily: "Arial Helvetica sans-serif",
    },
}));

const Contenedor = () => {
    const classes = useStyles();

    const [abrir, setabrir] = useState(false);
    const accionAbrirDrawer = () => {
        setabrir(!abrir);
    };
    const [abrirForm, setabrirForm] = useState(false);

    //state locales
    const [editaNota, seteditaNota] = useState(false);

    const { nota } = useSelector((state) => state.notas);

    const setStateFormNuevaNota = () => {
        setabrirForm(!abrirForm);
    }

    return (
        <div className={classes.root}>
            <NavBar accionAbrirDrawer={accionAbrirDrawer} />
            <Hidden xsDown>
                <CajaDrawer variant="permanent" open={true} />
            </Hidden>
            <Hidden smUp>
                <CajaDrawer
                    variant="temporary"
                    open={abrir}
                    onClose={() => accionAbrirDrawer()}
                />
            </Hidden>
            <div className={classes.content}>
                <div className={classes.toolbar} />
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12}>
                        <Paper className={classes.grid}>
                            <Button
                                variant="contained"
                                color="secondary"
                                fullWidth
                                startIcon={<AddCircleIcon />}
                                onClick={() => setStateFormNuevaNota()}
                            >
                                Crear Nota
                            </Button>

                            {abrirForm && <Formulario />}
                        </Paper>
                    </Grid>

                    {!editaNota ? (
                        <NotaBody
                            nota={nota}
                            classes={classes}
                            seteditaNota={seteditaNota}
                            editaNota={editaNota}
                        />
                    ) : (
                        <NotaEditar
                            nota={nota}
                            classes={classes}
                            seteditaNota={seteditaNota}
                            editaNota={editaNota}
                        />
                    )}
                </Grid>
            </div>
        </div>
    );
};

export default Contenedor;
