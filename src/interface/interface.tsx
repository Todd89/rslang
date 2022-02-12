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
export interface IUserWord {
  userId: string;
  wordId: string;
  token: string;
  word?: IWord;
}


export interface  IChangePageState {
  changePageState: (name:string) => void;
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
  words:IWordInArray[][]
}

export interface IGameBlockProps {
  word: IWordInArray,
  changeWordCount: () => void,
  wordsInGame:Array<IWordInArray>,
  changePageState:(name:string) => void,
  changeAnswersArray: (arr:IWordInAnswerArray[]) => void
}

export interface IGreetingBlockProps {
  changePageState: (name:string) => void,
  changeWords: (arr:Array<IWordInArray> | undefined) => void,
  setFirstWord: (arr:Array<IWordInArray>) => void,
  makeRandomWordsForWork: (wordsInGame:any) => any,
}
