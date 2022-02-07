export type Word = {
  difficulty: string,
  optional: object,
};

export type Statistic = {
  learnedWords: number,
  optional: object,
};

export type Settings = {
  wordsPerDay: number,
  optional: object,
}

export interface User {
  email: string,
  password: string,
  name?: string,
}

export interface UserData {
  userId: string,
  token: string,
}

export interface UserWord {
  userId: string,
  wordId: string,
  token: string,
  word?: Word,
}

export interface AuthorizationComponentProps {
  isRegistration: boolean;
  changeForm: (evt: React.MouseEvent) => void;
  toggleForm: () => void;
}

