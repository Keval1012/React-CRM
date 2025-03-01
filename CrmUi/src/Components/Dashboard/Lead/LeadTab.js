import { Card, Col, Row } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import NumbersCard from '../NumbersCard';
import { getAllLead, getAllLeadByTenant, getAllLeadByTenantAdmin, getAllLeadByTimePeriod, getAllLeadByUser } from '../../../Api/Api';
import { parseData } from '../../../Helper';
import { AuthContext } from '../../../Context/AuthProvider';
import StatusCard from './StatusCard';
import DynamicsByMonthCard from './DynamicsByMonthCard';
import Top5LeadOwnersCard from './Top5LeadOwnersCard';
import StageCard from './StageCard';
import CustomerNeedCard from './CustomerNeedCard';
import TimePeriodSelectable from '../TimePeriodSelectable';
import { useQuery } from '@apollo/client';
import { GET_LEADS } from '../../../GraphQL/Lead/Query';

const LeadTab = () => {

    const { currentRole, currUserData } = useContext(AuthContext) ?? {};
    const initialTimePeriodCall = useRef(false);
    const [leadList, setLeadList] = useState([]);
    const [timePeriodLeadList, setTimePeriodLeadList] = useState([]);
    const [qualifiedLeadCount, setQualifiedLeadCount] = useState(0);
    const [currentQuarterLeadCount, setCurrentQuarterLeadCount] = useState(0);
    const [currentMonthLeadCount, setCurrentMonthLeadCount] = useState(0);
    const { data: leadData } = useQuery(GET_LEADS, {
        variables: { input: (currentRole === 'Admin') ? parseData(currUserData)?.tenantId : parseData(currUserData)?.id }
    });

    useEffect(() => {
        fetchLeads();
    }, [currentRole, leadData]);

    useEffect(() => {
        if (!initialTimePeriodCall.current) {
            handleTimePeriodChange('days_7');
            initialTimePeriodCall.current = true;
        }
    }, []);
    
    useEffect(() => {
        if (timePeriodLeadList) fetchQualifiedLeads();
    }, [timePeriodLeadList]);

    useEffect(() => {
        if (leadList) fetchCurrentQuarterLeads();
        if (leadList) fetchCurrentMonthLeads();
    }, [leadList]);

    // For Rest Api
    // const fetchLeads = async () => {
    //     let res;
    //     if (currentRole === 'HostAdmin') res = await getAllLead();
    //     if (currentRole === 'Admin') res = await getAllLeadByTenantAdmin(parseData(currUserData)?.tenantId);
    //     if (currentRole === 'HostUser' || currentRole === 'User') res = await getAllLeadByUser(parseData(currUserData)?.id);
    //     if (currentRole !== 'HostAdmin' && currentRole !== 'HostUser' && currentRole !== 'Admin' && currentRole !== 'User') res = await getAllLeadByTenant(parseData(currUserData)?.id);
    //     if (res?.status === 200) setLeadList(res?.data);
    // };

    // For GraphQL Api
    const fetchLeads = async () => {
        let res;
        if (currentRole === 'HostAdmin') res = await leadData?.leads;
        if (currentRole === 'Admin') res = await leadData?.leadsByTenantAdmin;
        if (currentRole === 'HostUser' || currentRole === 'User') res = await leadData?.leadsByUser;
        if (currentRole !== 'HostAdmin' && currentRole !== 'HostUser' && currentRole !== 'Admin' && currentRole !== 'User') res = await leadData?.leadsByTenant;
        if (res?.length > 0) setLeadList(res);
    };

    const handleTimePeriodChange = async (period) => {
        let res;
        if (currentRole === 'HostAdmin') res = await getAllLeadByTimePeriod(period);
        if (currentRole === 'Admin') res = await getAllLeadByTimePeriod(period, null, parseData(currUserData)?.tenantId);
        if (currentRole === 'HostUser' || currentRole === 'User') res = await getAllLeadByTimePeriod(period, null, null, parseData(currUserData)?.id);
        if (currentRole !== 'HostAdmin' && currentRole !== 'HostUser' && currentRole !== 'Admin' && currentRole !== 'User') res = await getAllLeadByTimePeriod(period, parseData(currUserData)?.id);
        if (res?.status === 200) setTimePeriodLeadList(res?.data);
    };

    const fetchQualifiedLeads = () => {
        const qualifiedLeads = timePeriodLeadList?.filter(q => q?.leadStages?.stage === 'Sales qualified lead');
        setQualifiedLeadCount(qualifiedLeads?.length);
    };

    const fetchCurrentQuarterLeads = () => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();

        let quarter;
        if (currentMonth >= 0 && currentMonth <= 2) quarter = 1;
        else if (currentMonth >= 3 && currentMonth <= 5) quarter = 2;
        else if (currentMonth >= 6 && currentMonth <= 8) quarter = 3;
        else quarter = 4;

        const currentQuarterData = leadList.filter(item => {
            const itemDate = new Date(item.createdOn);
            const itemMonth = itemDate.getMonth();
            return (
                (quarter === 1 && itemMonth >= 0 && itemMonth <= 2) ||
                (quarter === 2 && itemMonth >= 3 && itemMonth <= 5) ||
                (quarter === 3 && itemMonth >= 6 && itemMonth <= 8) ||
                (quarter === 4 && itemMonth >= 9 && itemMonth <= 11)
            );
        });
        setCurrentQuarterLeadCount(currentQuarterData?.length);
    };

    const fetchCurrentMonthLeads = () => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;

        const currentMonthData = leadList.filter(o => {
            const [year, month] = o.createdOn.split('-').map(Number);
            return year === currentYear && month === currentMonth;
        });
        setCurrentMonthLeadCount(currentMonthData?.length);
    };

    return (
        <div className='tabBodyTopMargin'>
            <Row align='middle' justify='end'>
                <Col xl={4} lg={4} md={4} sm={4} xs={4}>
                    <TimePeriodSelectable handleTimePeriodChange={handleTimePeriodChange} />
                </Col>
            </Row>

            <Row align='top'>
                <NumbersCard
                    name='Total Number of Leads'
                    count={timePeriodLeadList?.length??0}
                />
                <NumbersCard
                    name='Total Number of Qualified Leads'
                    count={qualifiedLeadCount??0}
                />
                <NumbersCard
                    name='Leads in Current Quarter'
                    count={currentQuarterLeadCount??0}
                />
                <NumbersCard
                    name='Leads in Current Month'
                    count={currentMonthLeadCount??0}
                />
            </Row><br />

            <Row align='top'>
                <Col xl={8} lg={8} md={8} sm={8} xs={8}>
                    <Card className='secondRowLeadCard'>
                        <StatusCard timePeriodLeadList={timePeriodLeadList} />
                    </Card>
                </Col>
                <Col xl={8} lg={8} md={8} sm={8} xs={8}>
                    <Card className='secondRowLeadCard'>
                        <DynamicsByMonthCard leadList={leadList} />
                    </Card>
                </Col>
                <Col xl={8} lg={8} md={8} sm={8} xs={8}>
                    <Card className='secondRowLeadCard'>
                        <Top5LeadOwnersCard leadList={leadList} />
                    </Card>
                </Col>
            </Row><br />

            <Row align='top'>
                <Col xl={10} lg={10} md={10} sm={10} xs={10}>
                    <Card className='stageCard'>
                        <StageCard timePeriodLeadList={timePeriodLeadList} />
                    </Card>
                </Col>
                <Col xl={14} lg={14} md={14} sm={14} xs={14}>
                    <Card className='customerNeedCard'>
                        <CustomerNeedCard timePeriodLeadList={timePeriodLeadList} />
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default React.memo(LeadTab);