//import { AUDIO_CURRENT_GAME_PARAMETERS } from "../../../const/const-audio";
import "./audio-level.css";
//import { game } from "../audiochallenge/audiochallenge";
import { createArrayOfQuestions } from "../audio-utils/audio-utils";

interface IProps {
  id: number;
  changeState: (
    group: number,
    page: number,
    isOn: boolean
    //  isRepeat: boolean
  ) => void;
}

export function AudioLevel(props: IProps) {
  //console.log("AudioLevel");
  const { id, changeState } = props;

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
        createArrayOfQuestions(id - 1, -1);
        changeState(id - 1, -1, true);
      }}
      style={{
        backgroundColor: btnColor(id),
      }}
    >
      {id}
    </button>
  );
}
