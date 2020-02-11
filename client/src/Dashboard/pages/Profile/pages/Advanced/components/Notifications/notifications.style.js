const styles = theme => ({
    container: {
        display: "flex",
        justifyContent: "center",
    },
    card: {
        width: "80%",
        padding: 25,
    },
    heading: {
        margin: theme.spacing(3),
        marginBottom: 0,
    },
    spaceBetween: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
    },
    saveStatus: {
        color: "#717173",
        textDecoration: "underline",
    },
});

export default styles;
