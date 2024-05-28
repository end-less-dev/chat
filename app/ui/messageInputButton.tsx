'use client';

import { Input, Button, Flex } from "antd";
import { SendOutlined } from '@ant-design/icons';

import useMessage from "@san/app/users/chat/useMessage";

const MessageInputButton = () => {

    const {sendMessage, setMessage} = useMessage({userId : "hi"})

    return (
        <Flex justify="center" gap={10}>
            <Input
                placeholder="Type your message..."
                onChange={e => setMessage(e.target.value)}
                style={{width : "100%"}}
            />
            <Button onClick={sendMessage} type="primary" icon={<SendOutlined/>} shape="round">
                Send
            </Button>
        </Flex>
    )
}

export default MessageInputButton;