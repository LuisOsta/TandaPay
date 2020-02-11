const headRows = [
    {
        id: "type",
        numeric: false,
        disablePadding: true,
        label: "Transfer Type",
    },
    {
        id: "recipient",
        numeric: false,
        disablePadding: false,
        label: "Recipient",
    },
    {
        id: "status",
        numeric: true,
        disablePadding: false,
        label: "Transfer Status",
    },
    {
        id: "createdAt",
        numeric: true,
        disablePadding: false,
        label: "Transfer Date",
    },
    {
        id: "amount",
        numeric: true,
        disablePadding: false,
        label: "Transfer Amount",
    },
    {
        id: "action",
        numeric: false,
        disablePadding: false,
        label: "Actions",
    },
];

export { headRows };
