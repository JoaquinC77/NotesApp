import React from "react";
import { makeStyles, Drawer, Divider, Typography } from "@material-ui/core";
import ListasNotas from "./ListasNotas";

const styles = makeStyles((theme) => ({
    drawer: {
        width: 240,
        flexShrink: 0,
    },
    drawerPaper: {
        width: 240,
    },
    toolbar: theme.mixins.toolbar,
    titulo: {
        marginBottom: 3
    }
}));

const CajaDrawer = (props) => {
    const classes = styles();
    return (
        <Drawer
            className={classes.drawer}
            variant={props.variant}
            classes={{
                paper: classes.drawerPaper,
            }}
            anchor="left"
            open={props.open}
            onClose={props.onClose ? props.onClose : null}
        >
            <div className={classes.toolbar} />
            <Typography 
                variant="h5" 
                align="center"
                className={classes.titulo}    
            >
                Mis notas
            </Typography>
            <Divider />
            <ListasNotas />
        </Drawer>
    );
};

export default CajaDrawer;
