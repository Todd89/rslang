export type IStatistic = {
  learned:number
  optional:{
    game:string,
    date:string,
    bestSeries:number,
    succesCounter:number,
    failCounter:number,
    newWords:number
  }
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
  options: {
    learned: boolean;
    group: boolean;
    page: number;
    succesCounter: number;
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

export interface IWordInAnswerArray extends IWordInArray{
  isAnwserTrue: boolean;
}

export interface IWordsOfArrays {
  words: IWordInArray[][];
}

export interface IGameBlockProps {
  word: IWordInArray;
  wordsInGame: Array<IWordInArray>;
  englishAnswer:string | undefined
  answer:string;
  typeOfAnswer:boolean | undefined; 
  changeWordCount: () => void;
  makeRandomAnswer:() => void 
  changePageState: (name: string) => void;
  changeAnswersArray: (arr: IWordInAnswerArray[]) => void;
  changeWord: () => void
  
}

export interface IGreetingBlockProps {
  changePageState: (name: string) => void;
  changeWords: (arr: Array<IWordInArray> | undefined) => void;
  setFirstWord: (arr: Array<IWordInArray>) => void;
  makeRandomWordsForWork: (wordsInGame: any) => any;
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

type LState = {
  fromTextbook: boolean;
  words: WordData
}
export interface LocationState {
  hash: string;
  key: string;
  pathname: string;
  search: string;
  state?: LState;
}
