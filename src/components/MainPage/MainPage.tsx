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
      <h1>Словник</h1>
      <div style={{ height: 700, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => {
              navigate('/addword');
            }}
          >
            <AddIcon />
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
      </div>
    </>
  );
};
