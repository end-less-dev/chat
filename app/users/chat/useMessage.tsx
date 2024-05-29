'use client';
import { useEffect, useState, useCallback } from "react";
import { socket } from "@san/app/lib/socket";

interface UseMessageProps {
    userId: string;
}

interface MessagesType {
    messageId: string;
    message: string;
    userId: string;
    createdAt: string;
}

const useMessage = ({ userId }: UseMessageProps) => {
    const [message, setMessage] = useState<string>("");
    const [msgList, setMsgList] = useState<MessagesType[]>([]);
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [transport, setTransport] = useState<string>("N/A");

    const onConnect = useCallback(() => {
        setIsConnected(true);
        setTransport(socket.io.engine.transport.name);

        socket.io.engine.on("upgrade", (newTransport) => {
            setTransport(newTransport.name);
        });

        socket.emit('previous message', userId); // Request previous messages on connect
    }, [userId]);

    const onDisconnect = useCallback(() => {
        setIsConnected(false);
        setTransport("N/A");
    }, []);

    const handlePreviousMessages = (msgs: MessagesType[]) => {
        setMsgList((prevMessages) => [...prevMessages, ...msgs]);
    }

    useEffect(() => {
        if (socket.connected) {
            onConnect();
        }

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on('previous messages', handlePreviousMessages);

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
            socket.off('previous messages', handlePreviousMessages);
        };
    }, [onConnect, onDisconnect]);

    const sendMessage = () => {
        // e.preventDefault();
        if (!userId || !message) {
            return;
        }
        const messageData = {
            message,
            userId: userId
        };
        setMsgList((prevMessages : any) => [...prevMessages, messageData]); // Update the message list immediately
        socket.emit("chat message", messageData);
        setMessage("");
    }

    return { sendMessage, setMessage, msgList, transport, isConnected, message };
};

export default useMessage;
