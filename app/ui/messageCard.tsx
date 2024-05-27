'use client'
import { Card, Avatar } from "antd"

const { Meta } = Card;

const MessageCard = ()=>{
    return (
        <Card>
            <Meta
                avatar={<Avatar  src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                title="Card title"
                description="This is the description"
            />
        </Card>
    )
}

export default MessageCard