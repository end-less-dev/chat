'use client'
import MessageCard from "@san/app/ui/messageCard"
import MessageInputButton from "@san/app/ui/messageInputButton"
import useMessage from "./useMessage";

const Chat = () => {
    const { msgList, isConnected } = useMessage({ userId: "35ae19cd-a412-44ea-84fa-1d3addf7468d" })
    return (
        <>
            <div style={{ height: 500, maxHeight: 500, overflowY: "scroll", scrollBehavior: "smooth" }}>
                {msgList
                    .sort((a, b) => new Date(a?.createdAt).getTime() - new Date(b.createdAt).getTime())
                    .map((item) => (
                        <MessageCard
                            key={item.messageId}
                            avatar="https://th.bing.com/th/id/OIP.Ya90166u0nU_ESgSTXMemwHaHa?w=512&h=512&rs=1&pid=ImgDetMain"
                            message={item.message}
                            userName="sansuks"
                            isConnected={isConnected}
                            createdAt={item.createdAt}
                        />
                    ))}

            </div>
            <div style={{ padding: 10 }}>
                <MessageInputButton />
            </div>
        </>
    )
}

export default Chat