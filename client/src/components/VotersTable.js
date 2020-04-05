import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const styles = {
  table: {
    minWidth: 650,
  },
};

const VotersTable = ({ voters }) => {
  return (
    <TableContainer
      style={{
        marginTop: 30,
      }}
      component={Paper}
    >
      <Table style={styles.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">#</TableCell>
            <TableCell>Address</TableCell>
            <TableCell align="right">Authorized</TableCell>
            <TableCell align="right">Has Voted</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {voters.map((voter, i) => (
            <TableRow key={i}>
              <TableCell align="left">{i+1}</TableCell>
              <TableCell component="th" scope="row">
                {voter.voter_address}
              </TableCell>
              <TableCell align="right">{voter.authorized ? "Yes" : "No"}</TableCell>
              <TableCell align="right">{voter.voted ? "Yes" : "No"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VotersTable;
