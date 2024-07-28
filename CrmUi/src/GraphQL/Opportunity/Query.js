import { gql } from "@apollo/client";

const OPPORTUNITY_FIELDS = gql`
    fragment OpportunityVMFields on OpportunityVM {
        account
        closeDate
        contact
        contractValue
        createdOn
        description
        id
        name
        roleId
        salesChannelId
        stageId
        tenantId
        userId
        opportunitySalesChannels {
            id
            salesChannel
        }
        opportunityStages {
            id
            stage
        }
    }
`;

export const GET_OPPORTUNITIES = gql`
    ${OPPORTUNITY_FIELDS}

    query ($input: Int!) {
        opportunities {
            ...OpportunityVMFields
        }
        opportunitiesByTenant (tenantId: $input) {
            ...OpportunityVMFields
        }
        opportunitiesByTenantAdmin (tenantId: $input) {
            ...OpportunityVMFields
        }
        opportunitiesByUser (userId: $input) {
            ...OpportunityVMFields
        }
    }
`;