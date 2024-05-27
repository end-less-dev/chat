'use client';
import React from 'react';
import { Space, Table as ATable, Tag, Avatar } from 'antd';
import type { TableProps } from 'antd';
import DateFormatter from '@san/app/lib/utils/dateFormatter';
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

interface UserTableProps {
    data : DataType[]
}

const columns: TableProps<DataType>['columns'] = [
      {
        title: 'User Name',
        dataIndex: 'userName',
        key: 'userName',
        render: (_,record) => <Link href={`/users/${record.userId}`} >{record.userName}</Link>,
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Password',
        dataIndex: 'password',
        key: 'password',
      },
      {
        title: 'Avatar',
        dataIndex: 'avatar',
        key: 'avatar',
        render: text => <Avatar src={text}/>,
      },
      {
        title: 'State',
        dataIndex: 'state',
        key: 'state',
      },
      {
        title: 'Country',
        dataIndex: 'country',
        key: 'country',
      },
      {
        title: 'City',
        dataIndex: 'city',
        key: 'city',
      },
      {
        title: 'Created At',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: text => <DateFormatter date={text}/>,
      },
      {
        title: 'Updated At',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
        render: text => <DateFormatter date={text}/>,
      },
];



const UserTable: React.FC<UserTableProps> = ({data}) => <ATable columns={columns} dataSource={data} />;

export default UserTable;