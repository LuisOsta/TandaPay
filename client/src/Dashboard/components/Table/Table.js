import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TablePagination,
  Paper,
  Grid,
  TableRow,
} from "@material-ui/core";
import {
  EnhancedTableToolbar,
  EnhancedTableHead,
  EnhancedTableRow,
} from "./components/";
import { getSorting, stableSort } from "./utils";
import styles from "./table.style";

/**
 *
 * @param {Object} props
 */
function EnhancedTable(props) {
  const { classes, data, headRows, title, type, buttons } = props;
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("date");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  function handleRequestSort(event, property) {
    const isDesc = orderBy === property && order === "desc";
    setOrder(isDesc ? "asc" : "desc");
    setOrderBy(property);
  }

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
  }

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  return (
    <Grid container className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar title={title} buttons={buttons} />
        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
              headRows={headRows}
              title={title}
            />
            <TableBody>
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <EnhancedTableRow
                      data={row}
                      type={type}
                      key={index}
                      labelId={labelId}
                      headRows={headRows}
                    />
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          classes={{ toolbar: classes.pagination }}
          rowsPerPageOptions={[5, 10, 25]}
          component={"div"}
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "Previous Page",
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page",
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </Grid>
  );
}

export default withStyles(styles, { withTheme: true })(EnhancedTable);
