import MessageCard from "../ui/messageCard"

const Chat = ()=>{
    return (
        <div className="bg-slate-700 h-4/5 p overflow-y-scroll p-2">
            {/* <div className="text-5xl font-extrabold ...">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                    Hello world
                </span>
            </div> */}
            <MessageCard/>
        </div>
    )
}

export default Chat