import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { iniciarSesionAction, usuarioAutenticado } from "../action/usersAction";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import theme from "../temaConfig/temaConfig";
import {
    Box,
    Grid,
    Paper,
    FormControl,
    InputLabel,
    FormHelperText,
    Input,
    Button,
    Link,
    ThemeProvider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";
import { LinearProgress } from "@material-ui/core";

import { VpnKey } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
    },
    grid: {
        marginTop: 15
    },
    titulos: {
        color: theme.palette.grey[50]
    }
}));

const Login = (props) => {
    //dispatch redux
    const dispatch = useDispatch();
    //rescatando los state de redux
    const { autenticado, error, cargando } = useSelector(
        (state) => state.users
    );

    useEffect(() => {
        if (autenticado) {
            props.history.push("/notas");
        }

        dispatch(usuarioAutenticado());

        // eslint-disable-next-line
    }, [autenticado]);

    //clases de estilos material ui
    const classes = useStyles();

    //state locales del componente
    const [datos, setDatos] = useState({
        email: "",
        password: "",
    });
    const [validacion, setValidacion] = useState(false);

    const datosOnChange = (e) => {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmitLogin = (e) => {
        e.preventDefault();

        if (datos.email.trim() === "" || datos.password.trim() === "") {
            setValidacion(true);
            return;
        }

        setValidacion(false);
        dispatch(iniciarSesionAction(datos));
    };

    return (
        <ThemeProvider theme={theme}>
            <Container 
                maxWidth="sm" 
                align="center" 
            >
                <Box marginTop={4}>
                    <Typography 
                        variant="h4"
                        className={classes.titulos}
                    >
                        Mi AppNotas
                    </Typography>

                    <Grid 
                        item xs={10}
                        className={classes.grid}
                    >
                        <Paper className={classes.paper}>
                            <Typography 
                                variant="h5"
                                className={classes.titulos}
                            >
                                Login
                            </Typography>

                            <Box marginTop={2}>
                                <form onSubmit={onSubmitLogin}>
                                    <Box mx={5}>
                                        <FormControl
                                            margin="normal"
                                            fullWidth={true}
                                        >
                                            <InputLabel htmlFor="email">
                                                Email
                                            </InputLabel>
                                            <Input
                                                type="email"
                                                id="email"
                                                name="email"
                                                onChange={datosOnChange}
                                            />
                                            <FormHelperText id="my-helper-text">
                                                Ingrese su email
                                            </FormHelperText>
                                        </FormControl>
                                    </Box>
                                    <Box mx={5}>
                                        <FormControl
                                            margin="normal"
                                            fullWidth={true}
                                        >
                                            <InputLabel htmlFor="password">
                                                Password
                                            </InputLabel>
                                            <Input
                                                id="password"
                                                name="password"
                                                onChange={datosOnChange}
                                                type="password"
                                            />
                                            <FormHelperText>
                                                Ingrese Su Password
                                            </FormHelperText>
                                        </FormControl>
                                    </Box>
                                    <Box mt={2} p={1}>
                                        <Button
                                            type="submit"
                                            color="secondary"
                                            variant="contained"
                                            fullWidth={true}
                                            startIcon={<VpnKey />}
                                        >
                                            Ingresar
                                        </Button>
                                    </Box>
                                </form>
                                <Grid container>
                                    <Grid item xs={3}>
                                        <Link
                                            color="textPrimary"
                                            href="/nuevaCuenta"
                                        >
                                            Crear Cuenta
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Paper>
                        {cargando && <LinearProgress color="secondary" />}

                        {validacion && (
                            <Alert severity="error">
                                Debe ingresar los campos requeridos
                            </Alert>
                        )}

                        {error && (
                            <Alert severity="error">
                                Usuario y/o contraseña incorrectos
                            </Alert>
                        )}
                    </Grid>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default Login;
