import { Col, Row, Spin, Tabs } from 'antd';
import React, { useContext, useEffect, useState, useTransition } from 'react';
import '../Styles/dashboard.css';
import { LoadingOutlined } from '@ant-design/icons';
import LeadTab from '../Components/Dashboard/Lead/LeadTab';
import OpportunityTab from '../Components/Dashboard/Opportunity/OpportunityTab';
import DynamicsTab from '../Components/Dashboard/Dynamics/DynamicsTab';
import { useDispatch } from 'react-redux';
import { useQuery } from '@apollo/client';
import { AuthContext } from '../Context/AuthProvider';
import { GET_CONTACTS } from '../GraphQL/Contact/Query';
import { parseData } from '../Helper';
import { setAccountData, setContactData } from '../Redux/Features/UserDataSlice';
import { GET_ACCOUNTS } from '../GraphQL/Account/Query';

const Dashboard = () => {

    const dispatch = useDispatch();
    const { currentRole, currUserData } = useContext(AuthContext) ?? {};
    const [isPending, startTransition] = useTransition();
    const [currActiveTab, setCurrActiveTab] = useState('lead');
    const [tabLoading, setTabLoading] = useState({ lead: true });
    const [loading, setLoading] = useState(false);
    const { data: contactData } = useQuery(GET_CONTACTS, {
        variables: { input: (currentRole === 'Admin') ? parseData(currUserData)?.tenantId : parseData(currUserData)?.id }
    });
    const { data: accountData } = useQuery(GET_ACCOUNTS, {
        variables: { input: (currentRole === 'Admin') ? parseData(currUserData)?.tenantId : parseData(currUserData)?.id }
    });

    useEffect(() => {
        const time = setTimeout(() => {
            setTabLoading(prevState => ({
                ...prevState,
                [currActiveTab]: false
            }));
            return () => clearTimeout(time);
        }, 1000);
    }, [currActiveTab]);

    useEffect(() => {
        setLoading(true);
        const time = setTimeout(() => {
            fetchContacts();
            fetchAccounts();
            setLoading(false);
        }, 1000);
        return () => clearTimeout(time);
    }, [currentRole, contactData, accountData]);

    const fetchContacts = async () => {
        let res;
        if (currentRole === 'HostAdmin') {
            res = await contactData?.contacts;
        } else if (currentRole === 'Admin') {
            res = await contactData?.contactsByTenantAdmin;
        } else if (currentRole === 'HostUser' || currentRole === 'User') {
            res = await contactData?.contactsByUser;
        } else if (currentRole !== 'HostAdmin' && currentRole !== 'HostUser' && currentRole !== 'Admin' && currentRole !== 'User') {
            res = await contactData?.contactsByTenant;
        }
        if (res?.length > 0) {
            // setContactList(res);
            dispatch(setContactData(res));
        }
    };

    const fetchAccounts = async () => {
        let res;
        if (currentRole === 'HostAdmin') {
            res = await accountData?.accounts;
        } else if (currentRole === 'Admin') {
            res = await accountData?.accountsByTenantAdmin;
        } else if (currentRole === 'HostUser' || currentRole === 'User') {
            res = await accountData?.accountsByUser;
        } else if (currentRole !== 'HostAdmin' && currentRole !== 'HostUser' && currentRole !== 'Admin' && currentRole !== 'User') {
            res = await accountData?.accountsByTenant;
        }
        if (res?.length > 0) {
            // setAccountList(res);
            dispatch(setAccountData(res));
        }
    };

    const onTabChange = (val) => {
        startTransition(() => {
            setCurrActiveTab(val);
            setTabLoading(prevState => ({
                ...prevState,
                [val]: true
            }));
        });
    };
    
    const items = [
        {
            key: 'lead',
            label: 'Lead',
            children: <>
                {tabLoading[currActiveTab] ? (
                    <Spin indicator={<LoadingOutlined className='spinLoader' spin />} />
                ) : <LeadTab />}
            </>
        },
        {
            key: 'opportunity',
            label: 'Opportunity',
            children: <>
                {tabLoading[currActiveTab] ? (
                    <Spin indicator={<LoadingOutlined className='spinLoader' spin />} />
                ) : <OpportunityTab />}
            </>
        },
        {
            key: 'dynamics',
            label: 'Dynamics',
            children: <>
                {tabLoading[currActiveTab] ? (
                    <Spin indicator={<LoadingOutlined className='spinLoader' spin />} />
                ) : <DynamicsTab />}
            </>
        }
    ];

    return (
        <>
            <Row align='middle' justify='space-between'>
                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                    <h2 className='allPageHeader'>Dashboards</h2>
                </Col>
            </Row><br />
            <Row align='middle' justify='space-between'>
                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                    <Tabs className='dashboardTab' items={items} onChange={onTabChange} />
                </Col>
            </Row>
        </>
    );
}

export default React.memo(Dashboard);