'use client'
import MessageCard from "@san/app/ui/messageCard"
import MessageInputButton from "@san/app/ui/messageInputButton"
import useMessage from "./useMessage";

const Chat = () => {
     const { msgList } = useMessage({userId : ""})
    return (
        <>
            <div style={{ height: 500, maxHeight: 500, overflowY: "scroll", scrollBehavior: "smooth" }}>
                {msgList.map((item)=> <MessageCard avatar="https://th.bing.com/th/id/OIP.Ya90166u0nU_ESgSTXMemwHaHa?w=512&h=512&rs=1&pid=ImgDetMain" message={item?.message} userName="sansuks" />)}
            </div>
            <div style={{padding :  10}}>
             <MessageInputButton />
            </div>
        </>
    )
}

export default Chat