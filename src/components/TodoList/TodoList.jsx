import classes from './TodoList.module.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import TablePagination from '@mui/material/TablePagination';
import { format } from 'date-fns';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 16,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // fetching todos data from api

  useEffect(() => {
    axios
      .get('https://gorest.co.in/public/v1/todos')
      .then((response) => setTodos(response.data.data))
      .catch((err) => console.log(err));
  }, []);

  // functions neccessary to make MUI Table pagination work
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <div className={classes.container}>
      {todos.length === 0 ? (
        <h1 className={classes.loading}>Loading...</h1>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell align='center'>Task Title</StyledTableCell>
                <StyledTableCell align='center'>Due On</StyledTableCell>
                <StyledTableCell align='center'>Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {todos
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((todo) => (
                  <StyledTableRow key={todo.id}>
                    <StyledTableCell component='th' scope='row' align='center'>
                      {todo.title}
                    </StyledTableCell>
                    <StyledTableCell component='th' scope='row' align='center'>
                      <div>{format(new Date(todo.due_on), 'eeee HH:mm')}</div>
                      <div>{format(new Date(todo.due_on), 'yyyy LLL dd')}</div>
                    </StyledTableCell>
                    <StyledTableCell component='th' scope='row' align='center'>
                      {todo.status}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10]}
            component='div'
            count={todos.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      )}
    </div>
  );
};

export default TodoList;
