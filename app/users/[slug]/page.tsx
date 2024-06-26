'use client';
import React, { useEffect, useState } from "react";
import { useParams } from 'next/navigation'
import { Avatar, Card, Skeleton, Breadcrumb } from 'antd';
import UpdateUserForm from "../updateUserForm";
import Link from "next/link";

const { Meta } = Card;
interface UserDetailsProps {}
interface DataType {
    id?: null;
    userId: string;
    userName: string;
    email: string;
    password: string;
    avatar: string;
    state: string;
    country: string;
    city: string
}

const UserDetails = ({ }: UserDetailsProps) => {
    const params = useParams()
    const [data, setData] = useState<DataType>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true)
        fetch(`https://chat-backend-o3ec.onrender.com/user/get-user-by-userId/${params.slug}`, { cache: "no-cache" })
            .then(response => response.json())
            .then(data => {
                setLoading(false)
                setData(data?.data);
            })
            .catch(error => {
                console.error('Error:', error)
                setLoading(false)
            });
    }, []);
   
    return (
        <div>
            <Breadcrumb
                items={[{ title : <Link href="/users">Users</Link>},{title: 'User Details'}]}
            />
            <Card style={{ background: "#D8F5FA" , marginTop : "20px"}}>
                <Skeleton loading={loading} avatar active>
                    <Meta
                        avatar={<Avatar src={data?.avatar} />}
                        title={data?.userName}
                        description={data?.city + ", " + data?.state + ", " + data?.country}
                    />
                </Skeleton>
            </Card>
        
            {data && (
                <div style={{padding : "20px"}}>
                    <UpdateUserForm  data={data} />
                </div>
            )}
        </div>
    )
}


export default UserDetails