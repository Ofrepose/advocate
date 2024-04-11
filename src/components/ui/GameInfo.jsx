import { MdOutlinePersonOutline, MdOutlinePersonalVideo } from "react-icons/md";
import { 
    GAME_INFO_MESSAGE_LENGTH,
    GAME_INFO_MESSAGES_ENCOURAGE_TURN, 
    GAME_INFO_MESSAGES_CPU_TURN,
    GAME_INFO_WIN_PLAYER,
    GAME_INFO_WIN_CPU,
    GAME_INFO_TIE
} from "../../constants/gameInfoMessages";

const GameInfo = ({ currentPlayer, winner, show }) => {
    
    const getTurnCommentary = () => {
        const randomizer = Math.floor(Math.random() * GAME_INFO_MESSAGE_LENGTH);
        if(winner){
            if(winner === 'X'){
                return GAME_INFO_WIN_PLAYER[randomizer];
            }else if(winner === 'O'){
                return GAME_INFO_WIN_CPU[randomizer];
            }else{
                return GAME_INFO_TIE[randomizer];
            }
           
        }
        if(currentPlayer === 'X'){
            return GAME_INFO_MESSAGES_ENCOURAGE_TURN[randomizer]
        }else{
            return GAME_INFO_MESSAGES_CPU_TURN[randomizer]
        }
    }

    return (
        <div className="text-2xl py-1 px-2 min-h-[32px] content-center w-full flex flex-wrap">
            {!winner && show ? (
                <>
                    <MdOutlinePersonOutline
                        className={`${currentPlayer === 'X' ? 'flex' : 'hidden'} text-green-700 my-auto`}
                    />
                    <MdOutlinePersonalVideo
                        className={`${currentPlayer === 'O' ? 'flex' : 'hidden'} my-auto`}
                    />
                </>
            ) : ('')}

            <div className="m-auto text-lg">
                {show ? getTurnCommentary() : ''}
            </div>
        </div>
    )
}

export default GameInfo;