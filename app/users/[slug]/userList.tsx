'use client'
import React from 'react';
import { Avatar, List, Skeleton } from 'antd';
import Link from 'next/link';

interface DataType {
    key: string;
    userName: string;
    email: string;
    password: string;
    avatar : string;
    state : string;
    country: string;
    city: string;
    userId : string;
  }

interface UserListProps {
    data : DataType[];
    loading : boolean
}

const UserList: React.FC<UserListProps> = ({data, loading}) => {
  
  return (
    <List
      className="demo-loadmore-list"
      loading={loading}
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <Skeleton avatar title={false} loading={loading} active>
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={item.userName}
              description={item.email}
            />
            <Link href={`/users/${item.userId}`} >View</Link>
          </Skeleton>
        </List.Item>
      )}
    />
  );
};

export default UserList;