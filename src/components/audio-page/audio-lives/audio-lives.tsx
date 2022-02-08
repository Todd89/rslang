import { AUDIO_LIVES_AMOUNT } from "../../../const/const-audio";
import "./audio-lives.css";

interface IPropsLives {
  amount: number;
}

export function AudioLives(props: IPropsLives) {
  const { amount } = props;
  const arrLives = [
    ...Array(amount).fill(true),
    ...Array(AUDIO_LIVES_AMOUNT - amount).fill(false),
  ];

  return (
    <div className="game__lives">
      {arrLives.map((item, index) => {
        return item ? (
          <div key={index} className="game__life life-left"></div>
        ) : (
          <div key={index} className="game__life life-lost"></div>
        );
      })}
    </div>
  );
}
