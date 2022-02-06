export type IWord = {
  difficulty: string;
  optional: object;
};

export type IStatistic = {
  learnedWords: number;
  optional: object;
};

export type ISettings = {
  wordsPerDay: number;
  optional: object;
};

export interface IUser {
  email: string;
  password: string;
  name?: string;
}

export interface IUserData {
  userId: string;
  token: string;
}

export interface IUserWord {
  userId: string;
  wordId: string;
  token: string;
  word?: IWord;
}

export interface  IChangePageState {
  pageState: () => void;
}

export interface IChangeWords {
  changeWords: () => void;
}
export interface IChangeWordCount {
  changeWords: () => void;
}
export interface IWordInArray {
  audio: string;
  audioExample: string;
  audioMeaning: string;
  group: number;
  id: string;
  image: string;
  page: number;
  textExample: string;
  textExampleTranslate: string;
  textMeaning: string;
  textMeaningTranslate: string;
  transcription: string;
  word: string;
  wordTranslate: string;
}

export interface IWordsOfArrays {
  words:IWordInArray[][]
}
