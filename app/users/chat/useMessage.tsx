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
    const [refresh, setRefresh] = useState<number>(0)

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
        setMsgList(msgs)
    }

    const handleMessages = (msg : any)=>{
    
        setMsgList((prevMsg : any)=>[...prevMsg, {
            message : msg?.message,
            userId : msg.userId,
            createdAt : new Date(),
            updatedAt : new Date()
        }])
    }

    useEffect(() => {
        if (socket.connected) {
            onConnect();
        }

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on('previous messages', handlePreviousMessages);
        socket.on('chat message', handleMessages)

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
            socket.off('previous messages', handlePreviousMessages);
            socket.on('chat message', handleMessages)
        };
    }, [onConnect, onDisconnect, refresh]);

    const sendMessage = () => {

        if (!userId || !message) {
            return;
        }
        const messageData = {
            message,
            userId: userId
        };
        
        socket.emit("chat message", messageData);
        setMessage("");
        setRefresh(Math.random())
    }

    return { sendMessage, setMessage, msgList, transport, isConnected, message };
};

export default useMessage;
