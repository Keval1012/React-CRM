import { gql } from "@apollo/client";

const CONTACTVM_FIELDS = gql`
    fragment ContactVMFields on ContactVM {
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
        contactTypes {
            id
            type
        }
    }
`;

export const GET_CONTACTS = gql`
    ${CONTACTVM_FIELDS}

    query ($input: Int!) {
        contacts {
            ...ContactVMFields
        }
        contactsByTenant (tenantId: $input) {
            ...ContactVMFields
        }
        contactsByTenantAdmin (tenantId: $input) {
            ...ContactVMFields
        }
        contactsByUser (userId: $input) {
            ...ContactVMFields
        }
    }
`;