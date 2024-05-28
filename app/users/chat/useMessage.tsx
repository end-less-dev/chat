'use client';
import { useEffect, useState } from "react"
import { io } from "socket.io-client"

const socket = io('http://localhost:8080', {
  transports: ['websocket'],
});

interface UseMessageProps {
    userId: string;
}

interface MessagesType {
    messageId: string
    message: string
    userId: string
}

const useMessage = ({ userId }: UseMessageProps) => {
    const [message, setMessage] = useState<string>("");
    const [msgList, setMsgList] = useState<MessagesType[]>([]);

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to WebSocket server');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from WebSocket server');
        });

        socket.on('previous messages', (msgs) => {
            setMsgList((prevMessages) => [...prevMessages, msgs]);
        });

        socket.on('chat message', (msg) => {
            setMsgList((prevMessages) => [...prevMessages, msg]);
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('previous messages');
            socket.off('chat message');
        };
    }, []);
    console.log(msgList)
    const sendMessage = async () => {
        if (!userId || !message) {
            return;
        }
        const data = {
            message,
            userId
        };
        const result = await fetch("/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        setMessage("");  // Clear message input after sending
        return result;
    }

    return { sendMessage, setMessage, msgList };
}

export default useMessage;
