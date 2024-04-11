import PlayerConfig from "./PlayerConfig";

export const GameConfig = ({ setConfigOpen, setPlayerCount }) => {
    return (
        <div>
            <PlayerConfig
                setConfigOpen={setConfigOpen}
                setPlayerCount={setPlayerCount}
            />
        </div>
    )
}

export default GameConfig;