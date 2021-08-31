import React, { useState } from "react";
import {
    FormControl,
    Box,
    Grid,
    Input,
    InputLabel,
    Typography,
    Button,
    LinearProgress,
    Paper,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import theme from "../temaConfig/temaConfig";

import { useDispatch, useSelector } from "react-redux";
import { crearUserAction } from "../action/usersAction";

const useStyles = makeStyles({
    boton: {
        marginTop: 15,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
    }
});

const NuevaCuenta = (props) => {
    const classes = useStyles();

    //actions redux
    const dispatch = useDispatch();
    const { error, cargando } = useSelector((state) => state.users);

    //use state component
    const [datos, setDatos] = useState({
        email: "",
        password: "",
    });

    const [validar, setVlidar] = useState(false);
    //----

    const datosOnChange = (e) => {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmitRegistrar = async (e) => {
        e.preventDefault();

        const { email, password } = datos;

        if (email.trim() === "" || password.trim() === "") {
            setVlidar(true);
            return;
        }

        setVlidar(false);

        //dispatch para el action con los datos del usuario
        await dispatch(crearUserAction(datos));

        if (!error) {
            props.history.push("/");
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container justifyContent="center">
                <Box my={6}>
                    <Typography variant="h4" color="textPrimary">
                        Registrarse
                    </Typography>
                </Box>
            </Grid>

            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <Box m={2}>
                            <form onSubmit={onSubmitRegistrar}>
                                <FormControl fullWidth={true}>
                                    <InputLabel htmlFor="email">
                                        Ingresa Tu Email
                                    </InputLabel>
                                    <Input
                                        type="email"
                                        name="email"
                                        id="email"
                                        onChange={datosOnChange}
                                    />
                                </FormControl>
                                <FormControl fullWidth={true}>
                                    <InputLabel htmlFor="password">
                                        Crea Una Password
                                    </InputLabel>
                                    <Input
                                        type="password"
                                        name="password"
                                        id="password"
                                        onChange={datosOnChange}
                                    />
                                </FormControl>

                                <Button
                                    type="submit"
                                    color="secondary"
                                    variant="contained"
                                    fullWidth={true}
                                    className={classes.boton}
                                >
                                    Registrarse
                                </Button>
                            </form>
                        </Box>

                        <Box mt={2}>
                            {validar && (
                                <Alert severity="error">
                                    Error! Debe Ingresar Todos Los Campos
                                    Correspondientes
                                </Alert>
                            )}

                            {error && (
                                <Alert severity="error">
                                    Error! Usuario Existente
                                </Alert>
                            )}

                            {cargando && (
                                <LinearProgress color="secondary"></LinearProgress>
                            )}
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};

export default NuevaCuenta;
