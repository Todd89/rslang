export interface IWord {
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
  questionWord: IWord;
  answers: Array<IWord>;
}

export interface IAudioResult {
  questionWord: IWord;
  isAnswerCorrect: Boolean;
}
