export interface IWordAudio {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  transcription: string;
  wordTranslate: string;
}

export interface IAudioQuestion {
  questionWord: IWordAudio;
  answers: Array<IWordAudio>;
}

export interface IAudioResult {
  questionWord: IWordAudio;
  isAnswerCorrect: Boolean;
}

export interface IAudioGameStatistic {
  gameLearnedWords: number;
  gameBestSeries: number;
  gameSuccessCounter: number;
  gameFailCounter: number;
  gameNewWords: number;
}

export interface IUserWord {
  wordId: string;
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

export type IStatistic = {
  learnedWords: number;
  optional: {
    game: string;
    date: string;
    bestSeries: number;
    successCounter: number;
    failCounter: number;
    newWords: number;
  };
};
