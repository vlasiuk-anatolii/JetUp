import { legacy_createStore as createStore } from 'redux';
import rows from '../api/words.json';

import { RootState } from '../react-app-env.d';
// // import { composeWithDevTools } from 'redux-devtools-extension';
import {
  ActionType, SetNewWord, SetTenWords, SetSessionAnswers,
} from './actions';

// Initial state
const initialState: RootState = {
  currentVocabulary: rows,
  currentTenWords: [],
  containerAnswers: [],
};

// // rootReducer - this function is called after dispatching an action
const rootReducer = (state = initialState, action:
SetNewWord |
SetTenWords |
SetSessionAnswers) => {
  switch (action.type) {
    case ActionType.SET_NEW_WORD:
      return {
        ...state,
        currentVocabulary: [...state.currentVocabulary, action.payload],
      };

    case ActionType.SET_TEN_WORDS:
      return {
        ...state,
        currentTenWords: [...action.payload],
      };

    case ActionType.SET_SESSION_ANSWERS:
      return {
        ...state,
        containerAnswers: [...state.containerAnswers, action.payload],
      };

    default:
      return state;
  }
};

// The `store` should be passed to the <Provider store={store}> in `/src/index.tsx`
const store = createStore(
  rootReducer,
);

export default store;
