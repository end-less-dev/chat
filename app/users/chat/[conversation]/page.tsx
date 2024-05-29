'use client'
import { useParams, useSearchParams } from 'next/navigation'
import useMessage from "../useMessage";
import MessageCard from "@san/app/ui/messageCard";
import MessageInputButton from '@san/app/ui/messageInputButton';
import { Breadcrumb, Tag } from 'antd';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

const Conversation = ()=>{
    const params = useParams()
    const searchParams = useSearchParams()
 
    const userName = searchParams.get('userName')
   
    const { msgList, isConnected } = useMessage({ userId: params.conversation as string})

    const scrollRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [msgList]);
    return (
        <>
            <Breadcrumb
                items={[{ title : <Link href="/users">Users</Link>},{title: <Tag color={isConnected ? "green" : "red"} bordered={false}>{userName}</Tag>}]}
            />
            <div ref={scrollRef} style={{ height: 500, maxHeight: 500, overflowY: "scroll", scrollBehavior: "smooth" }}>
                {msgList
                    .sort((a : any, b : any) => new Date(a?.createdAt).getTime() - new Date(b.createdAt).getTime())
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
                <MessageInputButton userId={params.conversation as string}/>
            </div>
        </>
    )
}

export default Conversation