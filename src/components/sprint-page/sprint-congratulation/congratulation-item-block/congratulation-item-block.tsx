import "./congratulation-item-block.css";

const CongratulationItemBlock: React.FC<any> = ({
  ENGLISH_WORD,
  RUSSIAN_WORD,
  TRANSCRIPTION,
  TYPE_OF_ANSWER,
}) => {
  return (
    <>
      <span className=''>""</span>
      <span className=''>{ENGLISH_WORD}</span>
      <span className=''>{TRANSCRIPTION}</span>
      <span className=''>{RUSSIAN_WORD}</span>
      <span className=''>{`${TYPE_OF_ANSWER}`}</span>
    </>
  );
};

export default CongratulationItemBlock;
