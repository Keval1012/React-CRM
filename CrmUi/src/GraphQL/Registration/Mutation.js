import { gql } from "@apollo/client";

const TENANT_REGISTER_FIELDS = gql`
    fragment TenantRegisterFields on Tenant {
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

export const REGISTER_TENANT = gql`
    ${TENANT_REGISTER_FIELDS}

    mutation ($input: TenantVerificationVMInput!) {
        registerTenant (tenant: $input) {
            ...TenantRegisterFields
        }
    }
`;

export const EMAIL_VERIFICATION = gql`
    mutation ($input: Int!) {
        verifyEmail (id: $input)
    }
`;