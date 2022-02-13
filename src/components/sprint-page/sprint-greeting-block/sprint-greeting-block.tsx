import "./sprint-greeting-block.css";
import { IGreetingBlockProps } from "../../../interface/interface";
import { BUTTONS_NUMS } from '../../../const/const'
import { getWordsFromGroup } from '../sprint-methods/sprint-methods';

const SprintrGreetingBlock: React.FC<IGreetingBlockProps> = ({ changePageState, setFirstWord, makeRandomWordsForWork, changeAllWord}) => {

  const BUTTONS = BUTTONS_NUMS.map((item) => {
    const ID = item.toString();
    let color = "";
    switch (ID) {
      case "1": 
       color = '#e2faed';
       break
      case "2": 
       color = '#ffba43'
       break
      case "3": 
       color = '#3cb77e'
       break
      case "4": 
       color = '#ffba01'
       break
      case "5": 
       color = '#3cb10e'
       break
      case "6": 
       color = '#aaba63'
       break
      default:
       color = '#aaba63'
       break

    }

    return (
      <button
        key={ID}
        style={ {backgroundColor: color} }
        className='greeting-sprint-block__button'
        onClick={async() => {
          const WORDS = await getWordsFromGroup((Number(ID) - 1).toString());
          changeAllWord(WORDS)
          const WORDS_FOR_WORK = await  makeRandomWordsForWork(WORDS);
          await setFirstWord(WORDS_FOR_WORK);
          changePageState('game');
        }}
      >
        {ID}
      </button>
    );
  });

  return (
    <div className='greeting-sprint-block'>
      <div className='girl-image'>
        <img src='/assets/images/png/think_girl.png' alt='девочка' />
      </div>
      <div className='greeting-sprint-levelchange-block'>
        <div className='greeting-sprint-levelchange-block__rules'>
          <p className='greeting-sprint-levelchange-block__rules-text'>Правила игры</p>
        </div>
        <div className='greeting-sprint-levelchange-block__levels'>
          <div className='greeting-sprint-levelchange-block__levels-buttons'>
            { BUTTONS }
          </div>
        </div>
      </div>
    </div>
  );
};

export default SprintrGreetingBlock;
