export type IStatistic = {
  learned: number;
  optional: {
    game: string;
    date: string;
    bestSeries: number;
    successCounter: number;
    failCounter: number;
    newWords: number;
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
  wordId: string;
  optional: {
    learned: boolean;
    group: number;
    page: number;
    successCounter: number;
    failCounter: number;
    new: boolean;
  };
}

export interface IUserWordServer {
  difficulty: string;
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
  wordsInGame: Array<IWordInArray>;
  englishAnswer: string | undefined;
  answer: string;
  typeOfAnswer: boolean | undefined;
  changeWordCount: () => void;
  makeRandomAnswer: () => void;
  changePageState: (name: string) => void;
  changeAnswersArray: (arr: IWordInAnswerArray[]) => void;
  changeWord: () => void;
}

export interface IGreetingBlockProps {
  changePageState: (name: string) => void;
  changeWords: (arr: Array<IWordInArray> | undefined) => void;
  setFirstWord: (arr: Array<IWordInArray>) => void;
  makeRandomWordsForWork: (wordsInGame: any) => any;
}
