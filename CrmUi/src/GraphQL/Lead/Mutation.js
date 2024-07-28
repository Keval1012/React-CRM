import { gql } from "@apollo/client";

const LEAD_FIELDS = gql`
    fragment LeadFields on Lead {
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
    }
`;

export const ADD_OR_UPDATE_LEAD = gql`
    ${LEAD_FIELDS}

    mutation ($input: LeadVMInput!) {
        addOrUpdateLead (lead: $input) {
            ...LeadFields
        }
    }
`;

export const DELETE_LEAD = gql`
    mutation ($input: Int!) {
        deleteLead (id: $input)
    }
`;