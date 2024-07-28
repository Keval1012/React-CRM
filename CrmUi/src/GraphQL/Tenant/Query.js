import { gql } from "@apollo/client";

const TENANTVM_FIELDS = gql`
    fragment TenantVMFields on TenantVM {
        createdOn
        email
        id
        isActive
        mobileNumber
        name
        password
    }
`;

export const GET_TENANTS = gql`
    ${TENANTVM_FIELDS}

    query {
        tenants {
            ...TenantVMFields
        }
    }
`;