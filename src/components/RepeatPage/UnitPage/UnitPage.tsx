import * as React from 'react';
import { useParams, useNavigate } from 'react-router';
import { Stack } from '@mui/material';
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

  const answer: Answer = {
    number: 0,
    isRight: false,
    taskWord: '',
    yuorAnswer: '',
  };

  const [sessionAnswer, setSessionAnswer] = React.useState<Answer[]>([]);

  React.useEffect(() => {
    if (sessionAnswer.length === 10) {
      dispatch(setSessionAnswers(sessionAnswer));
      navigate('/result');
    }
  }, [sessionAnswer]);

  return (
    <>
      <h1 className="title">Повторення слів</h1>
      <h3 className="what_todo">
        Обери правильний переклад слова:
        {' '}
        <span className="word">
          {' '}
          {currentUnit ? currentUnit.word : ''}
        </span>
      </h3>
      <Stack
        spacing={2}
        direction="row"
        sx={{
          m: 1,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {currentUnit && getFour.map(item => (
          <button
            className="button"
            key={item.id}
            type="button"
            onClick={() => {
              if (item.translate === currentUnit.translate) {
                answer.isRight = true;
              }

              if (unitId) {
                answer.number = +unitId;
              }

              answer.taskWord = currentUnit.word;
              answer.yuorAnswer = item.translate;
              setSessionAnswer([...sessionAnswer, answer]);
              if (unitId) {
                navigate(`/repeat/${+unitId + 1}`);
              }
            }}
          >
            {item.translate}
          </button>
        ))}
      </Stack>
    </>
  );
};
