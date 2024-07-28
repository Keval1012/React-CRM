import { Form, message } from 'antd';
import React, { useContext } from 'react';
import TextInput from '../Components/TextInput';
import AppButton from '../Components/AppButton';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import '../Styles/login.css';
import { getUserLogin } from '../Api/Api';
import { AuthContext } from '../Context/AuthProvider';
import { useMutation } from '@apollo/client';
import { USER_LOGIN } from '../GraphQL/Login/Mutation';

const Login = () => {

    const { setUser, setCurrentRole, setCurrUserData } = useContext(AuthContext) ?? {};
    const navigate = useNavigate();
    const [userInfoForm] = Form.useForm();
    const [userLogin] = useMutation(USER_LOGIN);

    const handleLogin = async (val) => {
        try {
            const res = await userLogin({ variables: { input: { userName: val.loginUsername, password: val.loginPassword }}});
            if (res?.data?.login?.isAuthenticated === true) {
                localStorage.setItem('token', res?.data?.login?.token);
                localStorage.setItem('role', res?.data?.login?.userInfo?.roles?.name);
                localStorage.removeItem('registerTenantData');
                setUser(res?.data?.login?.token);
                setCurrentRole(res?.data?.login?.userInfo?.roles?.name);
                if (res?.data?.login?.tenantInfo === null) {
                    localStorage.setItem('user-info', JSON.stringify(res?.data?.login?.userInfo));
                    setCurrUserData(JSON.stringify(res?.data?.login?.userInfo));
                }
                if (res?.data?.login?.userInfo === null) {
                    localStorage.setItem('user-info', JSON.stringify(res?.data?.login?.tenantInfo));
                    setCurrUserData(JSON.stringify(res?.data?.login?.tenantInfo));
                }
                message.success('User is Logged In !!!');
                return navigate('/');
            } else {
                message.error(res?.data?.login?.message);
            }

            // const res = await getUserLogin({ userName: val.loginUsername, password: val.loginPassword });
            // if (res?.status === 200) {
            //     localStorage.setItem('token', res?.data?.token);
            //     localStorage.setItem('role', res?.data?.userInfo?.roles?.name);
            //     localStorage.setItem('user-info', JSON.stringify(res?.data?.userInfo));
            //     localStorage.removeItem('registerTenantData');
            //     setUser(res?.data?.token);
            //     setCurrentRole(res?.data?.userInfo?.roles?.name);
            //     setCurrUserData(JSON.stringify(res?.data?.userInfo));
            //     message.success('User is Logged In !!!');
            //     return navigate('/');
            // } else {
            //     message.error(res?.data);
            // }
        } catch (error) {
            message.error('Login Error');
        }
    };

    return (
        <div>
            <Form
                preserve={false}
                form={userInfoForm}
                name="normal_login"
                className="loginForm"
                onFinish={(values) => handleLogin(values)}
            >
                <h2>Welcome back!</h2>
                <br />
                <TextInput
                    type='text'
                    placeholder='Username'
                    name='loginUsername'
                    required={true}
                    prefix={<UserOutlined />}
                    requiredMsg='Please input your Username!'
                />
                <TextInput
                    type='password'
                    placeholder='Password'
                    name='loginPassword'
                    required={true}
                    prefix={<LockOutlined />}
                    requiredMsg='Please input your Password!'
                />
                <Form.Item>
                    <AppButton
                        type="primary"
                        htmlType="submit"
                        label='Log in'
                        className="appPrimaryButton register-form-button"
                    />
                </Form.Item>
            </Form>
        </div>
    );
}

export default React.memo(Login);
