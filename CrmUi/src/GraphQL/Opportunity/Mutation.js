import { gql } from "@apollo/client";

const OPPORTUNITY_FIELDS = gql`
    fragment OpportunityFields on Opportunity {
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
    }
`;

export const ADD_OR_UPDATE_OPPORTUNITY = gql`
    ${OPPORTUNITY_FIELDS}

    mutation ($input: OpportunityVMInput!) {
        addOrUpdateOpportunity (opportunity: $input) {
            ...OpportunityFields
        }
    }
`;

export const DELETE_OPPORTUNITY = gql`
    mutation ($input: Int!) {
        deleteOpportunity (id: $input)
    }
`;