'use client'
import { Card, Avatar, Badge } from "antd"

import { UserOutlined } from "@ant-design/icons"
import { dateFormatterFunc } from "../lib/utils/dateFormatter";

const { Meta } = Card;

interface MessageCardProps {
    avatar: string;
    userName: string;
    message: string;
    isConnected: boolean;
    createdAt : string;
    loggedUser : boolean
}

const MessageCard = ({ avatar, message, userName, isConnected ,createdAt, loggedUser}: MessageCardProps) => {
    return (
        <Card style={loggedUser ? { backgroundColor: "#F1F1F1", margin: 10 } : { backgroundColor: "blue", margin: 10 }}>
            <Meta
                avatar={<Avatar shape="square" src={avatar} icon={<UserOutlined />} />}
                title={userName}
                description={message + " ," + dateFormatterFunc({date : createdAt})}
            />
        </Card>
    )
}

export default MessageCard