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

export interface IUserWord {
  wordId: string;
  difficulty: string;
  optional: {
    //group: number;
    // page: number;
    learned: boolean;
    new: boolean;
    wordCounter: number;
    rightCounter: number;
  };
}
