'use client';

import { Input, Button, Flex } from "antd";
import { SendOutlined } from '@ant-design/icons';
import useMessage from "@san/app/users/chat/useMessage";

interface MessageInputButtonProps {
    userId : string
}
const MessageInputButton = ({ userId } : MessageInputButtonProps) => {

    const {sendMessage, setMessage, message} = useMessage({userId : userId})

    return (
        <Flex justify="center" gap={10}>
            <Input
                placeholder="Type your message..."
                onChange={e => setMessage(e.target.value)}
                style={{width : "100%"}}
                value={message}
            />
            <Button onClick={sendMessage} type="primary" icon={<SendOutlined/>} shape="round">
                Send
            </Button>
        </Flex>
    )
}

export default MessageInputButton;