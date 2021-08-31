import React from 'react'
import { Typography, withWidth, Hidden, Button }  from '@material-ui/core';

function Oculto(props) {
    return (
        <div>
            <Typography variant="h6" color="inherit">
                Ancho de la pantalla: {props.width}
            </Typography>

            <Hidden xsDown>
                <Button variant="contained" color="secondary">
                    Esto va oculto
                </Button>
            </Hidden>
            <Hidden only='lg'>
                <Button variant="contained" color="secondary">
                    Esto va oculto en lg
                </Button>
            </Hidden>
        </div>
    )
}

export default withWidth()(Oculto)
