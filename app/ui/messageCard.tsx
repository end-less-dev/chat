'use client'
import { Card, Avatar } from "antd"

const { Meta } = Card;

interface MessageCardProps {
    avatar : string;
    userName : string;
    message : string;
}

const MessageCard = ({avatar, message, userName} : MessageCardProps)=>{
    return (
        <Card style={{ backgroundColor : "#F1F1F1", margin : 10}}>
            <Meta
                avatar={<Avatar  src={avatar}/>}
                title={userName}
                description={message}
            />
        </Card>
    )
}

export default MessageCard