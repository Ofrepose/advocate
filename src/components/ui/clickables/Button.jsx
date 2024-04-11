

const Button = ({ message='Start', extra, handleClick }) => {
    return (
        <button
            className={`
            ${extra}
            mx-auto max-w-[300px] w-[200px] bg-primary rounded-md flex flex-col justify-center items-center no-underline overflow-hidden text-white px-4 py-2 text-[24px]
            transition duration-200 
            hover:bg-ternary hover:text-primary`}
            onClick={handleClick}
        >
            {message}
        </button>
    )
}

export default Button;