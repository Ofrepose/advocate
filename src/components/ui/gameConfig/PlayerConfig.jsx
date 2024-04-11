import Button from "../clickables/Button";
import { MdOutlinePersonOutline, MdOutlinePersonalVideo } from "react-icons/md";

const PlayerConfig = ({ setConfigOpen, setPlayerCount }) => {
    return (
        <div className="bg-secondary p-4 rounded-md lg:w-1/2 w-full m-auto flex flex-wrap justify-center shadow-2xl py-10">
            <Button
                message={
                    <div className="flex flex-wrap">
                        <MdOutlinePersonOutline className="my-auto" />
                        <span className="px-2 my-auto"> vs </span>
                        <MdOutlinePersonalVideo className="my-auto" />
                    </div>
                }
                handleClick={()=>{
                    setConfigOpen(false);
                    setPlayerCount(1);
                }}
            />
                <span className="text-white my-auto px-2 my-auto lg:w-auto w-full text-center ">Or</span>
            <Button
                message={
                    <div className="flex flex-wrap">
                        <MdOutlinePersonalVideo className="my-auto" />
                        <span className="px-2 my-auto"> vs </span>
                        <MdOutlinePersonalVideo className="my-auto" />
                    </div>
                }
                handleClick={()=>{
                    setConfigOpen(false);
                    setPlayerCount(0);
                }}
            />
        </div>
    )
}

export default PlayerConfig;