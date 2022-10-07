import * as React from 'react';
import { useSelector } from 'react-redux';
import {
  Alert, Box, Button, Fab, Stack,
} from '@mui/material';
import { useNavigate } from 'react-router';
import { AddHome } from '@mui/icons-material';
import RepeatIcon from '@mui/icons-material/Repeat';
import './ResultPage.scss';
import { getAllAnswersSelector } from '../../store/selectors';
import { HandlerResults } from './HendlerResults';
import { Answer } from '../../react-app-env.d';

export const ResultPage = () => {
  const [isShow, setIsShow] = React.useState(false);
  const [showThisSession, setShowThisSession] = React.useState<Answer[]>([]);

  const navigate = useNavigate();
  const results = useSelector(getAllAnswersSelector);
  const lastAnswer = results[results.length - 1];

  return (
    <>
      <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => {
            navigate('/');
          }}
        >
          <AddHome />
        </Fab>
      </Box>
      <h1 className="title">Результати</h1>

      <HandlerResults
        lastAnswer={lastAnswer}
      />
      <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="info">{`Активність: Сьогодні здіснено ${results.length} повторень слів`}</Alert>
      </Stack>
      <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => {
            navigate('/');
          }}
        >
          <AddHome />
        </Fab>
        <Fab
          color="primary"
          aria-label="repeat"
          onClick={() => {
            navigate('/repeat');
          }}
        >
          <RepeatIcon />
        </Fab>
      </Box>
      <Stack
        spacing={2}
        direction="row"
        sx={{
          margin: 1,
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {results.map((item, i) => (

          <Button
            variant="outlined"
            type="button"
            // eslint-disable-next-line react/no-array-index-key
            key={i} // з масивом нема ніяких маніпуляцій, тому індекси будуть унікальні
            onClick={() => {
              setIsShow(true);
              setShowThisSession(item);
            }}
          >
            {`Повторення ${i + 1}`}
          </Button>
        ))}
      </Stack>
      {isShow && <HandlerResults lastAnswer={showThisSession} />}
    </>
  );
};
