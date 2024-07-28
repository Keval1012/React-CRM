import { gql } from "@apollo/client";

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

export const ADD_OR_UPDATE_TENANT = gql`
    ${TENANT_FIELDS}

    mutation ($input: TenantVMInput!) {
        addOrUpdateTenant (tenant: $input) {
            ...TenantFields
        }
    }
`;

export const DELETE_TENANT = gql`
    mutation ($input: Int!) {
        deleteTenant (id: $input)
    }
`;