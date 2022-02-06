import httpClient from "../../../services/http-client";
import { SprintNums, BUTTONS_NUMS } from '../../../const/const'
import { IChangePageState, IChangeWords, IWordInArray  } from "../../../interface/interface";

const getWordsFromGroup = async (group:string, changeWords:any) => {
  const PROMIS_ARR = [];
  for (let i = 0; i < SprintNums.PAGE_COUNT; i++) {
    const WORDS_CHUNK = httpClient.getChunkOfWords(i.toString(), group);
    PROMIS_ARR.push(WORDS_CHUNK)
  }
  
  await Promise.all(PROMIS_ARR).then((values) => values.forEach((el) => changeWords(el)))
}

function randomNum (max:number) {
  const RANDOM_NUM = Math.floor(Math.random() * max);
  return RANDOM_NUM;
}

function shuffle (array:Array<IWordInArray>) {
  let currentIndex = array.length; 
  let temporaryValue;
  while (0 !== currentIndex) {

    const RANDOM_NUM = randomNum (currentIndex)
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[RANDOM_NUM];
    array[RANDOM_NUM] = temporaryValue;
  }

  return array;
}


const makeTreeRandomPage = () => {
  const RANDOM_PAGES_NUMS: number[] = [];
  while (RANDOM_PAGES_NUMS.length < 3) {
    const RANDOM_PAGE = randomNum (30);
    if (RANDOM_PAGES_NUMS.indexOf(RANDOM_PAGE) === -1) {
      RANDOM_PAGES_NUMS.push(RANDOM_PAGE)
    }
  }
  return RANDOM_PAGES_NUMS;
}


const makeWordsForWork= (words:any) => {
  const WORDS = words; 
  const RANDOM_PAGES_NUMS: number[] = makeTreeRandomPage();
  const RESULT_WORDS: IWordInArray[][] = [];
  
  RANDOM_PAGES_NUMS.forEach((el) => {
    RESULT_WORDS.push(WORDS[el])
  })

  return shuffle(RESULT_WORDS.flat());
}



export { getWordsFromGroup, randomNum, makeTreeRandomPage, shuffle, makeWordsForWork }