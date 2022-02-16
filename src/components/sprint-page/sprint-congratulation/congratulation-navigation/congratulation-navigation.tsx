import "./congratulation-navigation.css";
import { ICongratulationNavi } from '../../../../interface/interface'

const CongratulationNavigation: React.FC<ICongratulationNavi> = ({
  makeRandomWordsForWork,
  allWords,
  changePageState,
  changeAnswersArray
}) => {
  return (
    <div>
      <button
        className='sprint-navigation-block__button-repeat '
        onClick={() => {
          makeRandomWordsForWork(allWords);
          changePageState("game");
          changeAnswersArray([])
        }}
      >
        Повторить игру
      </button>
      <button
        className='sprint-navigation-block__button-change '
        onClick={() => changePageState("greeting")}
      >
        Выбрать уровень
      </button>
    </div>
  );
};

export default CongratulationNavigation;
