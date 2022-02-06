import {AUDIO_CURRENT_GAME_PARAMETERS} from "../../../const/const-audio"
import "./audio-page.css";
import {game} from "../audiochallenge/audiochallenge";

interface IProps {
  id: number
}

export function AudioLevel(props: IProps) {
  const { id } = props;

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
        AUDIO_CURRENT_GAME_PARAMETERS.group = id - 1;
        AUDIO_CURRENT_GAME_PARAMETERS.page = -1;
        game();
      }}
      style={{
        backgroundColor: btnColor(id),
      }}
    >
      {id}
    </button>
  );
}
