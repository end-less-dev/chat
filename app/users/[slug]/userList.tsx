"use client";
import React from "react";
import { Avatar, List, Skeleton, Space } from "antd";
import Link from "next/link";

interface DataType {
  key: string;
  userName: string;
  email: string;
  password: string;
  avatar: string;
  state: string;
  country: string;
  city: string;
  userId: string;
}

interface UserListProps {
  data: DataType[];
  loading: boolean;
}

const UserList: React.FC<UserListProps> = ({ data, loading }) => {
  // const loggedUser: any = window.localStorage.getItem("userDetails");
  // if (!loggedUser) {
  //   return;
  // }
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
            <Space>
              <Link href={`/users/${item.userId}`}>View</Link>
              <Link
                href={{
                  pathname: `/users/chat/${item.userId}`,
                  query: { userName: item.userName },
                }}
              >
                Chat
              </Link>
            </Space>
          </Skeleton>
        </List.Item>
      )}
    />
  );
};

export default UserList;
