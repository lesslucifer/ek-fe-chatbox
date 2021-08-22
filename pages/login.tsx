
import { useEffect } from 'react';
import { NextPage } from 'next';
import { Form, Input, Button, Checkbox, Card } from 'antd';
import styles from '../styles/Login.module.css'
import Auth from '../services/auth.service';
import React from 'react';

export interface IFormValue {
    username: string
    password: string
}

class Login extends React.Component {
    async submit(values: IFormValue) {
        console.log('Success:', values);
        await Auth.login(values.username, values.password)

    }

    render() {
        return (
            <div className={styles.container}>
                <main className={styles.main}>
                    <Card title="Login" className={styles.loginFormCard}>
                        <Form
                            name="login"
                            initialValues={{ remember: true }}
                            onFinish={this.submit.bind(this)}
                        >
                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item name="remember" valuePropName="checked">
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </main>
            </div>
        );
    }
}

export default Login;