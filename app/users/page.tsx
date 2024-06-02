'use client'
import { useEffect, useState } from 'react';
import { Breadcrumb, Button, Flex } from 'antd';
import UserList from './[slug]/userList';
import Link from 'next/link';

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
    // console.log(loggedUser, "logged user")
    useEffect(() => {
        setLoading(true)
        fetch("https://chat-backend-o3ec.onrender.com/user/get-all-users")
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
            <Flex justify='space-between'>
            <Breadcrumb
                items={[{ title : <Link href="/">Home</Link>},{title: 'User'}]}
            />
            <Button type='primary'><Link href="/">Add User</Link></Button>
            </Flex>
            <UserList data={data} loading={loading}/>
        </div>
    )
}

export default User;
