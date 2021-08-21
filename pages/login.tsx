
import { useEffect } from 'react';
import { NextPage } from 'next';
import { Form, Input, Button, Checkbox, Card } from 'antd';
import styles from '../styles/Login.module.css'

const Login: NextPage = () => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        // redirect to home if already logged in
        // if (userService.userValue) {
        //     router.push('/');
        // }
    }, []);

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <Card title="Login" className={styles.loginFormCard}>
                    <Form
                        name="login"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
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

export default Login;