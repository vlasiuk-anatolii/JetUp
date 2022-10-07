import { Answer, Word } from '../react-app-env.d';

// eslint-disable-next-line no-shadow
export enum ActionType {
  SET_NEW_WORD = 'SET_NEW_WORD',
  SET_TEN_WORDS = 'SET_TEN_WORDS',
  SET_SESSION_ANSWERS = 'SET_SESSION_ANSWERS',
}

export interface SetNewWord {
  type: ActionType.SET_NEW_WORD,
  payload: Word,
}

export interface SetTenWords {
  type: ActionType.SET_TEN_WORDS,
  payload: Word[],
}

export interface SetSessionAnswers {
  type: ActionType.SET_SESSION_ANSWERS,
  payload: Answer[],
}

// Action creators - a function returning an action object
export const setNewWord = (payload: Word): SetNewWord => ({
  type: ActionType.SET_NEW_WORD,
  payload,
});

export const setTenWords = (payload: Word[]): SetTenWords => ({
  type: ActionType.SET_TEN_WORDS,
  payload,
});

export const setSessionAnswers = (payload: Answer[]): SetSessionAnswers => ({
  type: ActionType.SET_SESSION_ANSWERS,
  payload,
});
