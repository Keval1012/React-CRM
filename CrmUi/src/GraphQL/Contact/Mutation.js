import { gql } from "@apollo/client";

const CONTACT_FIELDS = gql`
    fragment ContactFields on Contact {
        account
        contactName
        country
        createdOn
        email
        id
        jobTitle
        mobileNumber
        roleId
        tenantId
        typeId
        userId
    }
`;

export const ADD_OR_UPDATE_CONTACT = gql`
    ${CONTACT_FIELDS}

    mutation ($input: ContactVMInput!) {
        addOrUpdateContact (contact: $input) {
            ...ContactFields
        }
    }
`;

export const DELETE_CONTACT = gql`
    mutation ($input: Int!) {
        deleteContact (id: $input)
    }
`;