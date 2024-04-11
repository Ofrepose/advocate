

const Notifications = ({ message, extra }) => {

return(
    <div className={`text-xs text-gray-light flex flex-wrap justify-center m-auto w-full ${extra}`}>
        {message}
    </div>
)
}

export default Notifications;