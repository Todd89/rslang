import "./sprint-congratulation-block.css";
import CongratulationItemBlock from "./congratulation-item-block/congratulation-item-block";
import CongratulationNavigation from "./congratulation-navigation/congratulation-navigation";
import { IRandomWordInGame, ICongratulationBlock } from "../../../interface/interface";

const CongratulationBlock: React.FC<ICongratulationBlock> = ({
  answersArray,
  makeRandomWordsForWork,
  allWords,
  changePageState,
  changeAnswersArray,
  getWordsForWorkFromTextBook
}) => {
  let id = 100;
  const ELEMEMENTS = answersArray.map((el: IRandomWordInGame) => {
    const { ...items } = el;
    return (
      <li key={id++} className='congratulation-item'>
        <CongratulationItemBlock {...items} />
      </li>
    );
  });

  return (
    <div className='congratulation-container'>
      <div className='girl-image'>
        <img src='/assets/images/sprint_girl.png' alt='девочка' />
      </div>
      <div className='congratulation-block'>
        <CongratulationNavigation
          makeRandomWordsForWork={makeRandomWordsForWork}
          allWords={allWords}
          changePageState={changePageState}
          changeAnswersArray={changeAnswersArray}
          getWordsForWorkFromTextBook={getWordsForWorkFromTextBook}
        />
        <div className='congratulation-list-block'>
          <div className="congratulation-list-block__description">
            <span className="congratulation-list-block__audio describe-block">Звук</span>
            <span className="congratulation-list-block__english describe-block">Английский</span>
            <span className="congratulation-list-block__transсription describe-block">Транскрипция</span>
            <span className="congratulation-list-block__russian describe-block">Перевод</span>
            <span className="congratulation-list-block__type describe-block">Верно</span>
          </div>
          <ul className='congratulation-list-block__list'>{ELEMEMENTS}</ul>
        </div>
      </div>
    </div>
  );
};

export default CongratulationBlock;
