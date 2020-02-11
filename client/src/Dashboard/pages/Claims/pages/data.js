const headRows = [
    {
        id: "name",
        numeric: false,
        disablePadding: true,
        label: "Name (Claim Creator)",
    },
    { id: "subgroup", numeric: true, disablePadding: false, label: "Subgroup" },
    {
        id: "status",
        numeric: true,
        disablePadding: false,
        label: "Claim Status",
    },
    {
        id: "createdAt",
        numeric: true,
        disablePadding: false,
        label: "Creation Date",
    },
    {
        id: "amount",
        numeric: true,
        disablePadding: false,
        label: "Claim Disbursement",
    },
    {
        id: "action",
        numeric: false,
        disablePadding: false,
        label: "Actions",
    },
];

export { headRows };
