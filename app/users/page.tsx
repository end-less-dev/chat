'use client'
import { useEffect, useState } from 'react';
import { Breadcrumb } from 'antd';
import UserList from './[slug]/userList';

interface DataType {
    key: string
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

const User = () => {
    const [data, setData] = useState<DataType[]>([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch("http://localhost:8080/user/get-all-users", { cache: "force-cache" })
            .then(response => response.json())
            .then(data => {
                setLoading(false)
                setData(data?.data);
            })
            .catch(error =>{
                console.error('Error:', error)
                setLoading(false)
            });
    }, []);
    
    return (
        <div>
            <Breadcrumb
                items={[{ title : "User" },{title: 'User List'}]}
            />
            <UserList data={data} loading={loading}/>
        </div>
    )
}

export default User;
