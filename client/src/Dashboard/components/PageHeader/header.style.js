import { darken } from "@material-ui/core/styles";

const styles = theme => ({
    title: {
        color: "black",
    },
    link: {
        textDecoration: "none",
        color: "inherit",
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "space-around",
        [theme.breakpoints.down("xs")]: {
            flexDirection: "column",
        },
    },
    buttonGreen: {
        minWidth: theme.spacing(20),
        backgroundColor: theme.palette.button.main,
        color: "white",
        borderRadius: "0",
        "&:hover": {
            backgroundColor: darken(theme.palette.button.main, 0.1),
        },
        [theme.breakpoints.down("xs")]: {
            marginTop: theme.spacing(3),
        },
    },
    buttonRed: {
        minWidth: theme.spacing(20),
        backgroundColor: theme.palette.error.main,
        color: "white",
        borderRadius: "0",
        "&:hover": {
            backgroundColor: darken(theme.palette.error.main, 0.1),
        },
        [theme.breakpoints.down("xs")]: {
            marginTop: theme.spacing(3),
        },
    },
    buttonBlue: {
        minWidth: theme.spacing(20),
        backgroundColor: theme.palette.primary.main,
        color: "white",
        borderRadius: "0",
        "&:hover": {
            backgroundColor: darken(theme.palette.primary.main, 0.1),
        },
        [theme.breakpoints.down("xs")]: {
            marginTop: theme.spacing(3),
        },
    },
    divider: {
        width: "100%",
        color: "black",
        marginTop: theme.spacing(3),
    },
});

export default styles;
