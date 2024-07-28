import { gql } from "@apollo/client";

const USER_FIELDS = gql`
    fragment UserFields on User {
        createdOn
        email
        id
        mobileNumber
        name
        password
        roleId
        tenantId
    }
`;

export const ADD_OR_UPDATE_USER = gql`
    ${USER_FIELDS}

    mutation ($input: UserVMInput!) {
        addOrUpdateUser (user: $input) {
            ...UserFields
        }
    }
`;

export const DELETE_USER = gql`
    mutation ($input: Int!) {
        deleteUser (id: $input)
    }
`;