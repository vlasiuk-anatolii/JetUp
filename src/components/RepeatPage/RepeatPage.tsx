import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Button, Stack } from '@mui/material';
import { getCurrentVocabularySelector } from '../../store/selectors';
import './RepeatPage.scss';
import { Word } from '../../react-app-env.d';
import { setTenWords } from '../../store/actions';
// eslint-disable-next-line import/no-cycle
// import { UnitPage } from './UnitPage';

export function randomChoose(array: Word[], howMany: number) {
  const testWords: Word[] = [];

  while (testWords.length < howMany) {
    let isExist = false;
    const tempWord = array[Math.trunc(Math.random() * array.length)];

    if (tempWord) {
      isExist = testWords.some(item => item.word === tempWord.word);
    }

    if (!isExist) {
      testWords.push(tempWord);
    }
  }

  return testWords;
}

export const RepeatPage = () => {
  const dispatch = useDispatch();
  const rows = useSelector(getCurrentVocabularySelector);

  function prepareData() {
    const randomTen = randomChoose(rows, 10);

    return randomTen;
  }

  dispatch(setTenWords(prepareData()));
  const navigate = useNavigate();
  // eslint-disable-next-line no-console
  // console.log(pageId);

  // const [translate, setTranslate] = React.useState('');
  // const [errorMessage, setErrorMessage] = React.useState('');
  // const [error, setError] = React.useState(false);
  // const [isSuccess, setIsSuccess] = React.useState(false);
  return (
    <>
      <h1>Повторити слова</h1>
      <h2>{}</h2>

      <Stack spacing={2} direction="row" sx={{ m: 1 }}>
        <Button
          variant="outlined"
          type="button"
          onClick={() => {
            prepareData();
            navigate('1');
          }}
        >
          Розпочати повторення
        </Button>
      </Stack>
    </>
  );
};
