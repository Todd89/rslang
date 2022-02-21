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

export interface IAudioStat {
  id: string;
  learned: boolean;
  new: boolean;
}

export interface IStatistic {
  learnedWords: number;
  optional: {
    audio: {
      date: string;
      bestSeries: number;
      successCounter: number;
      failCounter: number;
      newWords: number;
      //  learnedWords: number;
    };
    sprint: {
      date: string;
      bestSeries: number;
      successCounter: number;
      failCounter: number;
      newWords: number;
      //  learnedWords: number;
    };
    longTerm: {
      stat: Array<ILongTerm>;
    };
  };
}

export type ILongTerm = {
  data: any;
  newWordsInData: number;
  newLearnedInData: number;
};
