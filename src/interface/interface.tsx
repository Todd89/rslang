export type ILongTerm = {
  data: any;
  newWordsInData: number;
  newLearnedInData: number;
};

export type IStatistic = {
  learnedWords: number;
  optional: {
    sprint: {
      date: string;
      bestSeries: number;
      successCounter: number;
      failCounter: number;
      newWords: number;
    };
    audio: {
      date: string;
      bestSeries: number;
      successCounter: number;
      failCounter: number;
      newWords: number;
    };
    longTerm: {
      stat: Array<ILongTerm>;
    };
  };
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
  difficulty: string;
  id?: string;
  wordId?: string;
  optional: {
    learned: boolean;
    group: number;
    page: number;
    successCounter: number;
    failCounter: number;
    new: boolean;
  };
}

export interface IChangePageState {
  changePageState: (name: string) => void;
}

export interface IChangeWords {
  changeWords: () => void;
}
export interface IChangeWordCount {
  changeWords: () => void;
}
export interface IWordInArray {
  _id?: string;
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

export interface AuthorizationComponentProps {
  isRegistration: boolean;
  changeForm: (evt: React.MouseEvent) => void;
  toggleForm: () => void;
}

export interface IWordInAnswerArray extends IWordInArray {
  isAnwserTrue: boolean;
}

export interface IWordsOfArrays {
  words: IWordInArray[][];
}

export interface IGameBlockProps {
  word: IWordInArray;
  randomWordsInGame: Array<IRandomWordInGame>;
  loadingUserWords: IUserWord[];
  changePageState: (name: string) => void;
  changeAnswersArray: (arr: IRandomWordInGame[]) => void;
  changeLoadingUserWords: (arr: IUserWord[]) => void;
  changeState: (state: any) => void;
  state: TextbookState | undefined;
  changeMainScore:(num:number) => void
}
export interface IGreetingBlockProps {
  changePageState: (name: string) => void;
  setFirstWord: (arr: Array<IWordInArray>) => void;
  makeRandomWordsForWork: (
    AllwordsInGame: Array<Array<IWordInArray>>
  ) => IWordInArray[];
  changeAllWord: (arr: Array<Array<IWordInArray>>) => void;
  changeLoadingUserWords: (arr: IUserWord[]) => void;
  changeWordsInGame: (arr: any) => void;
  getWordsForWorkFromTextBook: (
    page: number,
    group: number,
    user: IUserData | undefined
  ) => Promise<IWordInArray[][]>;
  state: TextbookState | undefined;
}

export interface ICongratulationBlock {
  answersArray: IRandomWordInGame[];
  makeRandomWordsForWork: (
    AllwordsInGame: Array<Array<IWordInArray>>
  ) => IWordInArray[];
  allWords: IWordInArray[][];
  changePageState: (name: string) => void;
  changeAnswersArray: (arr: Array<IRandomWordInGame>) => void;
  getWordsForWorkFromTextBook: (
    page: number,
    group: number,
    user: IUserData | undefined
  ) => Promise<IWordInArray[][]>;
  changeState: (state: any) => void;
  score:number
}

export interface ICongratulationNavi {
  makeRandomWordsForWork: (AllwordsInGame: IWordInArray[][]) => IWordInArray[];
  allWords: IWordInArray[][];
  changePageState: (name: string) => void;
  changeAnswersArray: (arr: Array<IRandomWordInGame>) => void;
  getWordsForWorkFromTextBook: (
    page: number,
    group: number,
    user: IUserData | undefined
  ) => Promise<IWordInArray[][]>;
  changeState: (state: any) => void;
}

export interface IWordInGame {
  ENGLISH_WORD: string;
  RUSSIAN_WORD: string;
  TYPE_OF_TRUE_ANSWER: boolean;
}

export interface IRandomWordInGame {
  ID: string | undefined;
  AUDIO: string;
  ENGLISH_WORD: string;
  RUSSIAN_WORD: string;
  REAL_TRANSLATE: string;
  TRANSCRIPTION: string;
  TYPE_OF_ANSWER: boolean;
  PAGE: number;
  GROUP: number;
}

export interface PaginationComponentProps {
  onPageChange: any;
  totalCount: number;
  siblingCount: number;
  currentPage: number;
  pageSize: number;
}

export interface UsePagination {
  totalCount: number;
  pageSize: number;
  siblingCount: number;
  currentPage: number;
}

export interface WordData {
  _id: string;
  id: string;
  audio: string;
  audioExample: string;
  audioMeaning: string;
  group: string;
  image: string;
  page: string;
  textExample: string;
  textExampleTranslate: string;
  textMeaning: string;
  textMeaningTranslate: string;
  transcription: string;
  word: string;
  wordTranslate: string;
}

export interface WordContentComponent {
  word: string;
  wordTranslate: string;
  transcription: string;
  textExample: string;
  textExampleTranslate: string;
  textMeaning: string;
  textMeaningTranslate: string;
  audio: string;
  audioExample: string;
  audioMeaning: string;
  isPlayAudio: boolean;
  playAudioHandler: (paths: string[]) => void;
}

export type WordCardComponent = WordData & {
  difficulty: boolean;
  learned: boolean;
  hasUserWord: boolean;
  isPlayAudio: boolean;
  playAudioHandler: (paths: string[]) => void;
  getDifficultWordsE: () => void;
};

type LState = {
  fromTextbook: boolean;
  words: WordData;
};
export interface LocationState {
  hash: string;
  key: string;
  pathname: string;
  search: string;
  state?: LState;
}

export interface TextbookState {
  group?: number;
  page?: number;
}
