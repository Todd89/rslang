import "./congratulation-navigation.css";
import { ICongratulationNavi, LocationState } from '../../../../interface/interface';
import { useLocation } from "react-router";

const CongratulationNavigation: React.FC<ICongratulationNavi> = ({
  makeRandomWordsForWork,
  allWords,
  changePageState,
  changeAnswersArray,
  getWordsForWorkFromTextBook
}) => {

  const location = useLocation<LocationState>();
  const state = location.state as any;

  return (
    <div>
      <button
        className='sprint-navigation-block__button-repeat '
        onClick={() => {
          console.log(allWords);
          if(state) {
            getWordsForWorkFromTextBook(state.page, state.group)
          } else {
            makeRandomWordsForWork(allWords);
          }
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
