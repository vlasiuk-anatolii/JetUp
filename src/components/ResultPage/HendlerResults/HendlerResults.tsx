import * as React from 'react';
import './HendlerResults.scss';
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
        <Table sx={{ maxWidth: 700, margin: '0 auto' }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">№</StyledTableCell>
              <StyledTableCell align="center">Правильно/хибно</StyledTableCell>
              <StyledTableCell align="center">Слово </StyledTableCell>
              <StyledTableCell align="center">Твоя відповідь</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lastAnswer.map((item) => (
              <StyledTableRow key={item.number}>
                <StyledTableCell align="center">{item.number}</StyledTableCell>
                <StyledTableCell align="center">{`${item.isRight}`}</StyledTableCell>
                <StyledTableCell align="center">{item.taskWord}</StyledTableCell>
                <StyledTableCell align="center">{item.yuorAnswer}</StyledTableCell>
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
