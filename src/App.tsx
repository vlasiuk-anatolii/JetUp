import React from 'react';
import { Route, Routes } from 'react-router';
import './App.scss';
import { MainPage } from './components/MainPage';
import { AddWordPage } from './components/AddWordPage';
import { RepeatPage } from './components/RepeatPage';
import { UnitPage } from './components/RepeatPage/UnitPage';
import { ResultPage } from './components/ResultPage';

export const App:React.FC = () => (
  <div className="App">
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="addword" element={<AddWordPage />} />
      <Route path="repeat" element={<RepeatPage />} />
      <Route path="repeat/:unitId" element={<UnitPage />} />
      <Route path="/result" element={<ResultPage />} />
      {/* <Route path="*" element={<PageNotFound />} /> */}
    </Routes>
  </div>
);
