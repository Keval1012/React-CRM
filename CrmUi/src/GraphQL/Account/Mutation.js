import { gql } from "@apollo/client";

const ACCOUNT_FIELDS = gql`
    fragment AccountFields on Account {
        accountName
        categoryId
        contact
        country
        createdOn
        id
        industryId
        mobileNumber
        roleId
        tenantId
        typeId
        userId
        web
    }
`;

export const ADD_OR_UPDATE_ACCOUNT = gql`
    ${ACCOUNT_FIELDS}

    mutation ($input: AccountVMInput!) {
        addOrUpdateAccount (account: $input) {
            ...AccountFields
        }
    }
`;

export const DELETE_ACCOUNT = gql`
    mutation ($input: Int!) {
        deleteAccount (id: $input)
    }
`;