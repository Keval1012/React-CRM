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
        roles {
            id
            name
        }
    }
`;

const TENANT_FIELDS = gql`
    fragment TenantFields on Tenant {
        createdOn
        email
        id
        isActive
        isEmailVerified
        mobileNumber
        name
        password
    }
`;

export const USER_LOGIN = gql`
    ${USER_FIELDS}
    ${TENANT_FIELDS}

    mutation ($input: LoginVMInput!) {
        login (login: $input) {
            isAuthenticated
            message
            token
            userInfo {
                ...UserFields
            }
            tenantInfo {
                ...TenantFields
            }
        }
    }
`;