const styles = theme => ({
    container: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
    },
    toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 8px",
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
});

export default styles;
