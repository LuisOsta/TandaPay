import React from "react";
import {
    TableHead,
    TableRow,
    TableCell,
    TableSortLabel,
} from "@material-ui/core";
import PropTypes from "prop-types";

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort, headRows } = props;
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox" />
                {headRows.map(row => (
                    <TableCell
                        key={row.id}
                        align={"left"}
                        padding={row.disablePadding ? "none" : "default"}
                        sortDirection={orderBy === row.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === row.id}
                            direction={order}
                            onClick={createSortHandler(row.id)}
                        >
                            {row.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
};

export default EnhancedTableHead;
