import {
  Box, Button, Fab, Stack, TextField,
} from '@mui/material';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { AddHome } from '@mui/icons-material';
import Alert from '@mui/material/Alert';
import { setNewWord } from '../../store/actions';
import { getCurrentVocabularySelector } from '../../store/selectors';
import './AddWordPage.scss';

export const AddWordPage = () => {
  const rows = useSelector(getCurrentVocabularySelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      <h1 className="title">Додати нове слово</h1>
      {error && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="error">Enter other word</Alert>
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
          display: 'flex',
          justifyContent: 'center',
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
          required
          id="outlined-required"
          label="Translate"
          placeholder="Translate"
          inputProps={{ maxLength: 100 }}
          value={translate}
          onChange={(event) => {
            setTranslate(event.target.value);
          }}
        />
      </Box>
      <Stack spacing={2} direction="row" sx={{ m: 1 }}>
        <Button
          sx={{ m: '0 auto' }}
          variant="outlined"
          type="button"
          onClick={() => {
            handlerForm();
          }}
        >
          Add new word
        </Button>
      </Stack>
    </>
  );
};
