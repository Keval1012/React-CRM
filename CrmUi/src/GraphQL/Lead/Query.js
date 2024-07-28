import { gql } from "@apollo/client";

const LEAD_FIELDS = gql`
    fragment LeadVMFields on LeadVM {
        account
        comments
        contact
        createdOn
        customerNeedId
        id
        roleId
        stageId
        statusId
        tenantId
        typeId
        userId
        leadCustomerNeeds {
            customerNeed
            id
        }
        leadStages {
            id
            stage
        }
        leadStatuses {
            id
            status
        }
        leadTypes {
            id
            type
        }
    }
`;

export const GET_LEADS = gql`
    ${LEAD_FIELDS}

    query ($input: Int!) {
        leads {
            ...LeadVMFields
        }
        leadsByTenant (tenantId: $input) {
            ...LeadVMFields
        }
        leadsByTenantAdmin (tenantId: $input) {
            ...LeadVMFields
        }
        leadsByUser (userId: $input) {
            ...LeadVMFields
        }
    }
`;