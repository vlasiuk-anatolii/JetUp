import * as React from 'react';
import { useParams, useNavigate } from 'react-router';
import { Button, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentTenWordsSelector } from '../../../store/selectors';

import './UnitPage.scss';
import { randomChoose } from '../RepeatPage';
import { Answer } from '../../../react-app-env.d';
import { setSessionAnswers } from '../../../store/actions';

export const UnitPage = () => {
  const { unitId } = useParams<{ unitId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tenWords = useSelector(getCurrentTenWordsSelector);
  const currentUnit = tenWords.find((_, i) => `${i + 1}`.toString() === unitId);
  const arrayWithoutCarrentUnit = tenWords.filter(item => item.word !== currentUnit?.word);
  const getFour = randomChoose(arrayWithoutCarrentUnit, 3);

  if (currentUnit) {
    getFour.unshift(currentUnit);
  }

  getFour.sort((a, b) => a.translate.localeCompare(b.translate));
  // eslint-disable-next-line no-console
  // console.log(unitId);
  const answer: Answer = {
    number: 0,
    isRight: false,
    taskWord: '',
    yuorAnswer: '',
  };

  const [sessionAnswer, setSessionAnswer] = React.useState<Answer[]>([]);

  // eslint-disable-next-line no-console
  console.log(sessionAnswer.length);

  if (sessionAnswer.length === 10) {
    dispatch(setSessionAnswers(sessionAnswer));
    navigate('/result');
  }

  // const [translate, setTranslate] = React.useState('');
  // const [errorMessage, setErrorMessage] = React.useState('');
  // const [error, setError] = React.useState(false);
  // const [isSuccess, setIsSuccess] = React.useState(false);
  // eslint-disable-next-line no-console

  return (
    <>
      <h1>Повторення слів</h1>
      <h2>{currentUnit ? currentUnit.word : ''}</h2>
      <Stack spacing={2} direction="row" sx={{ m: 1 }}>
        {currentUnit && getFour.map(item => (
          <Button
            variant="outlined"
            key={item.id}
            type="button"
            onClick={() => {
              if (item.translate === currentUnit.translate) {
                answer.isRight = true;
              }

              if (unitId) {
                answer.number = +unitId;
              }

              setSessionAnswer([...sessionAnswer, answer]);
              answer.taskWord = currentUnit.word;
              answer.yuorAnswer = item.translate;
              if (unitId) {
                // eslint-disable-next-line no-console
                console.log('if', sessionAnswer.length);
                navigate(`/repeat/${+unitId + 1}`);
              }
            }}
          >
            {item.translate}
          </Button>

        ))}
      </Stack>
    </>
  );
};
