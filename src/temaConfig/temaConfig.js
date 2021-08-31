import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#616161'
        },
        text:{
            primary: '#fafafa',
            secondary: '#fafafa'
        },
        background: {
            paper: '#424242',
            default: '#424242'
        },
        divider: '#9e9e9e'
    }

});

export default theme;