import { IWord } from "../interface/interface-audio";

export const AUDIO_CURRENT_GAME_PARAMETERS = {
  group: -1,
  page: -1,
};
export const AUDIO_MAX_QUESTION_AMOUNT = 3;
export const AUDIO_ANSWER_AMOUNT = 4;
export const AUDIO_LIVES_AMOUNT = 2;
export const AUDIO_ANSWER_TIME = 6000000;
export const AUDIO_PATH_DATA_AUDIO = "/assets/"; //убрать
export const AUDIO_PATH_UTILS_AUDIO = "/assets/sound/";
export const AUDIO_PATH_IMAGES = "/assets/";
//export const AUDIO_ASSETS = "../../../../public/assets/";
export const AUDIO_EMPTY_WORD: IWord = {
  id: "-1",
  group: -1,
  page: -1,
  word: "",
  image: "",
  audio: "",
  transcription: "",
  wordTranslate: "",
};
export const AUDIO_RULES = `В этой игре вам нужно будет определить слово, сказанное вслух, 
                              и выбрать его из предложенного списка.
                              Если вы ошибаетесь, то теряете жизнь.
                              Всего у вас 5 жизней.                      
                              Уровень сложности выбирается кнопками внизу.
                              Каждая кнопка соответствует разделу учебника.
                              Так как вы зашли в игру из главного меню, вопросов 20, 
                              в пределах выбранного уровня сложности.
                              Если вы заходите в игру со страницы учебника, то вопросы будут
                              сформированы из списка текушего раздела и текущей или предыдущих страниц.
                              Удачи!`;

export const AUDIO_PATH_ICONS = "/assets/icon/";
