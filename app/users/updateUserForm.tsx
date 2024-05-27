import React from 'react';
import type { FormProps } from 'antd';
import { Button, Col, Form, Input, Row } from 'antd';

type FieldType = {
    userName?: string;
    password?: string;
    email: string;
    avatar: string;
    state: string;
    country: string;
    city: string;
    userId: string;
};

interface UpdateUserFormProps {
    data: FieldType;
}

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const UpdateUserForm: React.FC<UpdateUserFormProps> = ({ data }) =>{
    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        console.log('Success:', values);
        const result = await fetch(`http://localhost:8080/user/update-user/${data.userId}`, {
            method : "PATCH",
            body : JSON.stringify(values)
        });
        console.log(result)
    };
    return (
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ width: "100%" }}
                initialValues={data}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item<FieldType>
                            label="Username"
                            name="userName"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input disabled/>
                        </Form.Item>
        
                        <Form.Item<FieldType>
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>
        
                        <Form.Item<FieldType>
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input />
                        </Form.Item>
        
                        <Form.Item<FieldType>
                            label="Avatar"
                            name="avatar"
                            rules={[{ required: true, message: 'Please input your avatar!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item<FieldType>
                            label="City"
                            name="city"
                            rules={[{ required: true, message: 'Please input your city!' }]}
                        >
                            <Input />
                        </Form.Item>
        
                        <Form.Item<FieldType>
                            label="State"
                            name="state"
                            rules={[{ required: true, message: 'Please input your state!' }]}
                        >
                            <Input />
                        </Form.Item>
        
                        <Form.Item<FieldType>
                            label="Country"
                            name="country"
                            rules={[{ required: true, message: 'Please input your country!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
        
                <Form.Item wrapperCol={{ offset: 8, span: 16 }} style={{display : "flex", justifyContent : "center"}}>
                    <Button type="primary" htmlType="submit">
                        Update
                    </Button>
                </Form.Item>
            </Form>
        );
    
} 
 

export default UpdateUserForm;
