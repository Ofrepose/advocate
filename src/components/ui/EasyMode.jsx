import { TbBabyCarriage } from "react-icons/tb";

const EasyMode = ({ easyMode, setEasyMode }) => {
    return (
        <div className="fixed bottom-0 right-0 p-4 text-4xl cursor-pointer flex flex-wrap align-center">
            {easyMode ? (
                <span className="text-lg w-full text-center">Baby-mode On</span>
            ) : <span className="text-lg w-full text-center">Baby-mode Off</span>}
            <TbBabyCarriage
                className={`mx-auto ${easyMode ? 'text-blue-400' : 'text-gray-light'} 
                    transition duration-200 
                    hover:text-blue-400
            `}
                onClick={() => setEasyMode(prev => !prev)}
            />
        </div>
    )
}

export default EasyMode;