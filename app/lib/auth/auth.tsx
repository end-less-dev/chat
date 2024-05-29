'use client';
import { useState } from "react"

import { Space, Input, Button } from "antd";


const GetIn = ()=>{
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("")
    
    const getIn = ()=>{
        if (password && password.trim() === "sugi") {
           window.location.href = "/users"
        }
    }
    return (
        <Space direction="horizontal">
        <Input.Password
          placeholder="input password"
          visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
          onChange={e =>setPassword(e.target.value)}
        />
        <Button style={{ width: 80 }} onClick={getIn} type="primary">
          Go
        </Button>
      </Space>
    )
}

export default GetIn