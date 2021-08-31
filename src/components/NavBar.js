import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, IconButton, Button } from "@material-ui/core";
import { Menu } from "@material-ui/icons";

//redux
import { useDispatch } from 'react-redux';
import { cerrarSesionAction } from '../action/usersAction';

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]:{
            display: "none",
        },
    },
    title: {
        flexGrow: 1,
    },
    appBar: {
        [theme.breakpoints.up("sm")]: {
            width: `calc(100% - ${240}px)`,
            marginLeft: 240,
        },
    },
}));

export const NavBar = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch(); 

    const cerrarSesion = () => {
        dispatch(cerrarSesionAction());
    }

    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <IconButton
                    onClick={() => props.accionAbrirDrawer()}
                    color="inherit"
                    aria-label="menu"
                    className={classes.menuButton}
                >
                    <Menu />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    Bienvenido
                </Typography>
                <Button 
                    variant="contained" color="secondary"
                    onClick={() => cerrarSesion()}
                >
                    Cerrar Sesion
                </Button>
            </Toolbar>
        </AppBar>
    );
};
