const Cell = ({ extra, value, onClick }) => {

return (
    <div 
    onClick={onClick}
    className={
        `border border-primary flex items-center justify-center h-16 text-3xl
        cursor-pointer text-primary hover:bg-ternary hover:text-white transition duration-200
        `
    } 
    >
        <span 
        className={`
            ${value && 'text-white' || 'text-secondary'}
        `}>
        {value && value || 'X'}
        </span>
    </div>
)

}

export default Cell;