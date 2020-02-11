import { darken } from "@material-ui/core/styles";
const styles = theme => ({
    walletCard: {
        display: "flex",
        flexDirection: "column",
        width: "40%",
        margin: theme.spacing(5, 0, 0, 0),
        padding: theme.spacing(3),
        [theme.breakpoints.down("sm")]: {
            width: "100%",
        },
    },
    balance: {
        display: "flex",
        justifyContent: "space-between",
        margin: theme.spacing(3, 0, 5, 0),
    },
    buttonGroup: {
        display: "flex",
        justifyContent: "space-between",
        margin: theme.spacing(5, 0, 0, 0),
        [theme.breakpoints.down("xs")]: {
            flexDirection: "column",
        },
    },
    button: {
        minWidth: theme.spacing(15),
        color: "white",
        borderRadius: "0",
        [theme.breakpoints.down("xs")]: {
            marginTop: theme.spacing(3),
        },
    },
    green: {
        backgroundColor: theme.palette.button.main,
        "&:hover": {
            backgroundColor: darken(theme.palette.button.main, 0.1),
        },
    },

    red: {
        backgroundColor: theme.palette.error.main,
        "&:hover": {
            backgroundColor: darken(theme.palette.error.main, 0.1),
        },
    },
    yellow: {
        backgroundColor: darken(theme.palette.warning.main, 0.1),
        "&:hover": {
            backgroundColor: darken(theme.palette.warning.main, 0.15),
        },
    },
});

export default styles;
