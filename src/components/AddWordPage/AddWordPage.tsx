import {
  Box, Button, Stack, TextField,
} from '@mui/material';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import { setNewWord } from '../../store/actions';
import { getCurrentVocabularySelector } from '../../store/selectors';
import './AddWordPage.scss';

export const AddWordPage = () => {
  const rows = useSelector(getCurrentVocabularySelector);
  const dispatch = useDispatch();

  const [word, setWord] = React.useState('');
  const [translate, setTranslate] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [error, setError] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const handlerForm = () => {
    const isExist = rows.some(element => element.word === word);

    if (!translate.length) {
      setError(true);
      setIsSuccess(false);
      setErrorMessage('You should add translate');
    } else if (isExist) {
      setError(true);
      setIsSuccess(false);
      setErrorMessage('Word is existing in the vocabulary');
    } else {
      dispatch(setNewWord({
        id: rows.length + 1,
        word,
        translate,
      }));

      setIsSuccess(true);
      setTranslate('');
      setWord('');
      setErrorMessage('');
      setError(false);
    }
  };

  // eslint-disable-next-line no-console
  console.log(rows);

  return (
    <>
      <h1>Додати нове слово</h1>
      {error && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="error">Enter another word</Alert>
        </Stack>
      )}
      {isSuccess && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="success">The word has been added successfully</Alert>
        </Stack>
      )}
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '400px' },
        }}
        onSubmit={handlerForm}
      >
        <TextField
          required
          id="outlined-required"
          label="New word"
          placeholder="New word"
          helperText={error ? errorMessage : ''}
          inputProps={{ maxLength: 100 }}
          value={word}
          onChange={(event) => {
            setWord(event.target.value);
          }}
        />
        <TextField
          // error={isErrorLastName}
          required
          id="outlined-required"
          label="Translate"
          placeholder="Translate"
          // helperText={isErrorLastName ? 'Use only a-zA-Z' : ''}
          inputProps={{ maxLength: 100 }}
          value={translate}
          onChange={(event) => {
            setTranslate(event.target.value);
          }}
        />
        <Stack spacing={2} direction="row" sx={{ m: 1 }}>
          <Button
            variant="outlined"
            type="button"
            onClick={() => {
              handlerForm();
            }}
          >
            Add new word
          </Button>
        </Stack>

      </Box>
    </>
  );
};
