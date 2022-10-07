export interface RootState {
  currentVocabulary: Word[];
  currentTenWords: Word[];
  containerAnswers: Answer[][];
}

export interface Word {
  id: number;
  word: string;
  translate: string;
}

export interface Answer {
  number: number,
  isRight: boolean,
  taskWord: string,
  yuorAnswer: string,
}
