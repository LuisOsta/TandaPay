const styles = theme => ({
    standing: {
        fontWeight: "bold",
        border: "1px solid",
        padding: "2px 2px 1px 2px",
        margin: "0px 2px",
    },
    good: {
        color: "#2ECC40",
        borderColor: "#2ECC40",
    },
    okay: {
        color: "#FFDC00",
        borderColor: "#FFDC00",
    },
    bad: {
        color: "#FF4136",
        borderColor: "#FF4136",
    },
    card: {
        margin: 20,
    },
    img: {
        width: "100%",
        height: "auto,",
    },
    right: {
        textAlign: "right",
    },
    spaceBetween: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
});

export default styles;
