'use client';
import React, { useEffect, useState } from "react";
import { useParams } from 'next/navigation'
import { Avatar, Card, Skeleton, Modal } from 'antd';
import UpdateUserForm from "../updateUserForm";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const { Meta } = Card;

interface UserDetailsProps {

}
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
        fetch(`http://localhost:8080/user/get-user-by-userId/${params.slug}`, { cache: "no-cache" })
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
            <Card style={{ background: "#D8F5FA" }}>
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