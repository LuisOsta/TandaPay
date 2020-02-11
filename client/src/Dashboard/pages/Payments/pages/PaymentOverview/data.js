const headRows = [
    {
        id: "name",
        numeric: false,
        disablePadding: true,
        label: "Name",
    },
    {
        id: "group",
        numeric: false,
        disablePadding: false,
        label: "Group",
    },
    {
        id: "subgroup",
        numeric: false,
        disablePadding: false,
        label: "Subgroup",
    },
    {
        id: "createdAt",
        numeric: true,
        disablePadding: false,
        label: "Payment Date",
    },
    {
        id: "amount",
        numeric: true,
        disablePadding: false,
        label: "Payment Amount",
    },

    {
        id: "action",
        numeric: false,
        disablePadding: false,
        label: "Actions",
    },
];

export { headRows };
