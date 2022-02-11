import "./audio-level.css";
import { createArrayOfQuestions } from "../audio-utils/audio-utils";

interface IProps {
  id: number;
  isGameLoaded: boolean;
  changeState: (isOn: boolean) => void;
  changeGameLoadedStatus: (isLoad: boolean) => void;
  changeIsGameChosen: (isCh: boolean) => void;
}

export function AudioLevel(props: IProps) {
  const {
    id,
    isGameLoaded,
    changeState,
    changeGameLoadedStatus,
    changeIsGameChosen,
  } = props;

  function loadGame() {
    changeIsGameChosen(true);
    (async () => {
      if (!isGameLoaded) {
        await createArrayOfQuestions(id - 1, -1);
        changeState(true);
        changeGameLoadedStatus(true);
      }
    })();
  }

  function btnColor(id: number) {
    let color: string;
    switch (id) {
      case 1:
        color = "#e2faed";
        break;
      case 2:
        color = "#ffba43";
        break;
      case 3:
        color = "#3cb77e";
        break;
      case 4:
        color = "#ffba01";
        break;
      case 5:
        color = "#3cb10e";
        break;
      case 6:
        color = "#aaba63";
        break;
      default:
        color = "#aaba63";
        break;
    }
    return color;
  }

  return (
    <button
      className="btn__level"
      onClick={() => {
        loadGame();
      }}
      style={{
        backgroundColor: btnColor(id),
      }}
    >
      {id}
    </button>
  );
}
