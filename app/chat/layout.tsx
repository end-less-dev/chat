'use client';

import React, { useState } from 'react';
import {
  UserOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';

const { Header, Sider, Content } = Layout;

const items = ["Sanjay", "Sugi"].map(
  (item, index) => ({
    key: String(index + 1),
    icon: React.createElement(UserOutlined),
    label: item,
  }),
);

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: "gray" }} />
        <Content style={{ margin: '24px 16px 0' }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
