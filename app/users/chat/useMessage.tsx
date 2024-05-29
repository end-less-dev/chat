'use client';
import { useEffect, useState } from "react"
import { socket } from "@san/app/lib/socket"

interface UseMessageProps {
    userId: string;
}

interface MessagesType {
    messageId: string
    message: string
    userId: string;
    createdAt : string
}

const useMessage = ({ userId }: UseMessageProps) => {
    const [message, setMessage] = useState<string>("");
    const [msgList, setMsgList] = useState<MessagesType[]>([]);

    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [transport, setTransport] = useState<string>("N/A");

    useEffect(() => {
        if (socket.connected) {
          onConnect();
        }
    
        function onConnect() {
          setIsConnected(true);
          setTransport(socket.io.engine.transport.name);
    
          socket.io.engine.on("upgrade", (transport) => {
            setTransport(transport.name);
          });
          socket.emit('previous message', userId); // Request previous messages on connect
        }
        
        function onDisconnect() {
          setIsConnected(false);
          setTransport("N/A");
        }
        
        socket.on("connect", onConnect);

        socket.on('previous messages', (msgs) => {
            setMsgList((prevMessages) => [...prevMessages, ...msgs]);
        });

        socket.on("disconnect", onDisconnect);
    
        return () => {
          socket.off("connect", onConnect);
          socket.off("disconnect", onDisconnect);
          socket.off('previous messages');
        };
      }, []);

    const sendMessage = async () => {
        if (!userId || !message) {
            return;
        }
        const messageData = {
            message,
            userId : userId
        }
        socket.emit("chat message", messageData)
        setMessage("");
    }
    console.log(msgList)
    return { sendMessage, setMessage, msgList, transport, isConnected };
}

export default useMessage;
