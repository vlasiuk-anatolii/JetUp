import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import './MainPage.scss';
import { Box, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RepeatIcon from '@mui/icons-material/Repeat';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCurrentVocabularySelector } from '../../store/selectors';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'word', headerName: 'Word', width: 130 },
  { field: 'translate', headerName: 'Translate', width: 130 },
  {
    field: 'fullName',
    headerName: 'Word -> Translate',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) => `${params.row.word} -> ${params.row.translate}`,
  },
];

export const MainPage = () => {
  const navigate = useNavigate();
  const rows = useSelector(getCurrentVocabularySelector);

  return (
    <>
      <h1 className="title">Словник</h1>
      <div style={{
        height: 700,
        width: 700,
        margin: '0 auto',
      }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
        />
        <div className="box_button">
          <Box sx={{ display: 'flex' }}>
            <h2 className="subtitle">Додати слово</h2>
            <Fab
              sx={{ m: '10px' }}
              color="primary"
              aria-label="add"
              onClick={() => {
                navigate('/addword');
              }}
            >
              <AddIcon />
            </Fab>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <h2 className="subtitle">Перевірити слова</h2>
            <Fab
              sx={{ m: '10px' }}
              color="primary"
              aria-label="repeat"
              onClick={() => {
                navigate('/repeat');
              }}
            >
              <RepeatIcon />
            </Fab>
          </Box>
        </div>
      </div>
    </>
  );
};
