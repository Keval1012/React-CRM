import { Col, Row } from 'antd';
import React from 'react';

const Message = ({ user, message }) => {
    return (
        <>
            <Row>
                <Col xl={4} lg={4} md={4} sm={4} xs={4}>
                    <p><strong>{user}</strong> says:</p>
                </Col>
                <Col xl={20} lg={4} md={20} sm={20} xs={20}>
                    <p>{message}</p>
                </Col>
            </Row><br />
        </>
    );
}

export default Message;