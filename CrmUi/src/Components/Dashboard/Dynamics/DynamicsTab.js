import { useMsal } from '@azure/msal-react';
import axios from 'axios';
import React, { useState } from 'react';
import { loginRequest } from '../../../Api/Api';
import { Card, Col, Popconfirm, Row, message } from 'antd';
import { CgMicrosoft } from "react-icons/cg";
import { FaPlus } from "react-icons/fa";

const DynamicsTab = () => {

    const { instance, accounts } = useMsal();
    const [accountData, setAccountData] = useState([]);

    const handleAddAcoount = async () => {
        try {
            // const loginResponse = await msalInstance.loginPopup(loginRequest);
            const msalResponse = await instance.loginPopup(loginRequest);
            console.log("MSAL Login successful:", msalResponse);

            const token = msalResponse.accessToken;
            // const token = msalResponse.idToken;
            await fetchAccounts(token);
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const fetchAccounts = async (token) => {
        try {
            const res = await axios.get(
                "https://graph.microsoft.com/beta/me/",
                // "https://graph.microsoft.com/v1.0/me",
                // `https://graph.microsoft.com/beta/me/profile/account`,
                // "https://orgf6e8eb71.crm8.dynamics.com/api/data/v9.2/accounts",
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                        // Accept: "application/json, text/plain, */*",
                        // Accept: "application/json;odata.metadata=minimal;odata.streaming=true;IEEE754Compatible=false"
                    }
                }
            );
            setAccountData(res?.data);
        } catch (error) {
            console.error('Error fetching accounts:', error);
        }
    };

    const ResetConfirm = () => {
        return (
            <Popconfirm
                title="Remove the Account?"
                onConfirm={() => {
                    accounts(null);
                    message.success('Account Removed.')
                }}
                okText="Yes"
                cancelText="No"
            >
                <span className='restSpan'>Reset</span>
            </Popconfirm>
        )
    };
    
    return (
        <div className='tabBodyTopMargin'>
            <Row align='middle'><h2>Account Connection</h2></Row><br />
            <Card className='card-account'>
                <Row align='middle'>
                    <Col xl={12} lg={12} md={12} sm={12} xs={12}><CgMicrosoft className='microsoft-icon' /></Col>
                    <Col xl={12} lg={12} md={12} sm={12} xs={12} align='end'>
                        <FaPlus className='plus-icon' onClick={() => handleAddAcoount()} />
                    </Col>
                </Row>
                <Row align='middle'><p>Microsoft Dynamics: {accounts.length}</p></Row>
                {/* <Row align='middle' justify='end'>{accounts.length > 0 && <ResetConfirm />}</Row> */}
            </Card>
        </div>
    );
}

export default DynamicsTab;