// // Selectors - a function receiving Redux state and returning some data from it
import { RootState } from '../react-app-env.d';

export const getCurrentVocabularySelector = (state: RootState) => state.currentVocabulary;
export const getCurrentTenWordsSelector = (state: RootState) => state.currentTenWords;
export const getAllAnswersSelector = (state: RootState) => state.containerAnswers;
