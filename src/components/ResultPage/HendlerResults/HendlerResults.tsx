import * as React from 'react';
// import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import './HendlerResults.scss';
// import { Box, Fab } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import RepeatIcon from '@mui/icons-material/Repeat';
// import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import { Alert, Stack } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { Answer } from '../../../react-app-env.d';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
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

interface Props {
  lastAnswer: Answer[];
}

export const HandlerResults: React.FC<Props> = ({ lastAnswer }) => {
  const falseAnswer = lastAnswer.filter(item => !item.isRight);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Номер завдання</StyledTableCell>
              <StyledTableCell align="right">Правильна відповідь чи хибна</StyledTableCell>
              <StyledTableCell align="right">Слово для перекладу</StyledTableCell>
              <StyledTableCell align="right">Твоя відповідь</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lastAnswer.map((item) => (
              <StyledTableRow key={item.number}>
                <StyledTableCell align="right">{item.number}</StyledTableCell>
                <StyledTableCell align="right">{`${item.isRight}`}</StyledTableCell>
                <StyledTableCell align="right">{item.taskWord}</StyledTableCell>
                <StyledTableCell align="right">{item.yuorAnswer}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="error">
          {' '}
          {`Відсоток хибних відповідей: ${(Math.trunc(((falseAnswer.length / 10) * 100) * 100)) / 100}%`}
          {' '}
        </Alert>
        <Alert severity="success">
          {' '}
          {`Відсоток вірних відповідей: ${(Math.trunc((((10 - falseAnswer.length) / 10) * 100) * 100)) / 100}%`}
          {' '}
        </Alert>
      </Stack>
    </>
  );
};
