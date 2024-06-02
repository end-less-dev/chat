'use client';
import { useState } from "react"

import { Space, Input, Button } from "antd";
import useAuth from "./useAuth";

const GetIn = ()=>{
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("")
    const [userName, setUserName] = useState<string>("")

    const { loginApi, loading } = useAuth({data : {userName, password}})
    
    const login = async ()=>{
      if (userName && password) {
        loginApi()
      }
    }
    return (
        <Space direction="vertical">
        <Input
          placeholder="input user name"
          onChange={(e)=> setUserName(e.target.value)}
        />
        <Input.Password
          placeholder="input password"
          visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
          onChange={e =>setPassword(e.target.value)}
        />
        <Button loading={loading} style={{ width: 80 }} onClick={login} type="primary">
          Login
        </Button>
      </Space>
    )
}

export default GetIn