import "./congratulation-item-block.css";
import { Url } from '../../../../const/const';
import { IRandomWordInGame } from '../../../../interface/interface';

const CongratulationItemBlock: React.FC<IRandomWordInGame> = ({
  AUDIO,
  ENGLISH_WORD,
  REAL_TRANSLATE,
  TRANSCRIPTION,
  TYPE_OF_ANSWER,
}) => {

  const audio = new Audio();
  audio.volume = 0.2;

  let type 
  if(TYPE_OF_ANSWER) {
    type = "Верно"
  } else {
    type = "Не верно"
  }

  function playAudio(AUDIO:string) {
    const path = `${Url.DOMEN}/${AUDIO}`;
    audio.src = path;
    audio.load();
    setTimeout(() => {
      audio.play();
    }, 500);
  }
  return (
    <>
      <div className='congratulation-item__audio congratulation-text' onClick={() => playAudio(AUDIO)}>
        <img src='/assets/images/audio.png' alt='звук' />
      </div>
      <span className='congratulation-item__english-word congratulation-text'>{ENGLISH_WORD}</span>
      <span className='congratulation-item__translation congratulation-text'>{TRANSCRIPTION}</span>
      <span className='congratulation-item__russian-word congratulation-text'>{REAL_TRANSLATE}</span>
      <span className='congratulation-item__type congratulation-text'>{`${type}`}</span>
    </>
  );
};

export default CongratulationItemBlock;
