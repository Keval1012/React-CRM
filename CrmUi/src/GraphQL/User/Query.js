import { gql } from "@apollo/client";

const USER_FIELDS = gql`
    fragment UserVMFields on UserVM {
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

export const GET_USERS = gql`
    ${USER_FIELDS}

    query ($input: Int!) {
        users {
            ...UserVMFields
        }
        usersByTenant (tenantId: $input) {
            ...UserVMFields
        }
    }
`;