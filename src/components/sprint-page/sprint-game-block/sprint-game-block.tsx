import './sprint-game-block.css';
import { IWordInArray } from '../../../interface/interface';



const GameBlock: React.FC< IWordInArray & any> = ({word, changeWordCount}) => {
    
  return (
      <div>
        <div className='girl-image'>
            <img
              src='/assets/images/png/sprint_girl.png' alt="девочка"
            />
        </div>  
        <div className='game-sprint-block'>
          <div className='game-sprint-block__top-lights'></div>
          <div className='game-sprint-block__quastion'>
            <div className='game-sprint-block__english-word'>{word.word.toUpperCase()}</div>
            <div className='game-sprint-block__russian-word'>{word.wordTranslate.toUpperCase()}</div>
          </div>
          <div className='game-sprint-block__buttons-block'>
            <button className='game-sprint-block__button game-sprint-block__button_wrong'
            onClick={(e) => {
              e.stopPropagation()
              console.log('click')
              changeWordCount()
            }
            }
            >Неверно</button>
            <button className='game-sprint-block__button game-sprint-block__button_right'
            onClick={() => {
              changeWordCount()
            }}
            >Правильно</button>
          </div>
        </div>
      </div>
      )
    };

export default GameBlock;
