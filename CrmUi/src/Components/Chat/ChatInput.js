import { Col, Divider, Form, Row } from 'antd';
import React from 'react';
import TextInput from '../TextInput';
import TextArea from 'antd/es/input/TextArea';
import AppButton from '../AppButton';

const ChatInput = ({ sendMessage }) => {

    const [userChatForm] = Form.useForm();

    const handleChatFormValues = async (form) => {
        const { user, message } = form.getFieldsValue();

        if (user && message) {
            if (form.getFieldsError().filter(x => x.errors.length > 0).length > 0) {
                return;
            }

            const isUserProvided = user && user !== '';
            const isMessageProvided = message && message !== '';

            if (isUserProvided && isMessageProvided) {
                sendMessage(user, message);
            } else {
                alert('Please insert a user & a message.');
            }
        }
    };

    return (
        <>
            <Row align='middle' justify='space-between'>
                <Col xl={10} lg={10} md={10} sm={10} xs={10}>
                    <h2 className='allPageHeader'>Chat</h2>
                </Col>
            </Row>
            <Divider />

            <Form
                preserve={false}
                form={userChatForm}
                name="user_profileForm"
                className="profileForm"
            >
                <br />
                <Row justify='space-between'>
                    <Col xl={10} lg={10} md={10} sm={10} xs={10}>
                        <TextInput
                            label='User'
                            name='user'
                            type='text'
                            required={true}
                            requiredMsg='User is required!'
                        />
                    </Col>
                </Row>
                <Row justify='space-between'>
                    <Col xl={10} lg={10} md={10} sm={10} xs={10}>
                        <Form.Item
                            label='Message'
                            name='message'
                            type='text'
                            required={true}
                            requiredMsg='Message is required!'
                        >
                            <TextArea rows={2} />
                        </Form.Item>
                    </Col>
                </Row>
                <Divider />

                <Row justify='end'>
                    <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Row justify='end'>
                            <Col xl={6} lg={6} md={6} sm={6} xs={6} style={{ textAlign: 'end' }}>
                                <AppButton
                                    label='Save'
                                    className='appPrimaryButton formWidth'
                                    onClick={() => {
                                        handleChatFormValues(userChatForm);
                                    }}
                                />
                            </Col>
                            <Col xl={6} lg={6} md={6} sm={6} xs={6} style={{ textAlign: 'end' }}>
                                <AppButton
                                    label='Cancel'
                                    className='appButton formWidth'
                                    onClick={() => {
                                        userChatForm.resetFields();
                                    }}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Form>
        </>
    );
}

export default ChatInput;