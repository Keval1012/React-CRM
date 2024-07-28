import { gql } from "@apollo/client";

const ACCOUNT_FIELDS = gql`
    fragment AccountVMFields on AccountVM {
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
        accountCategories {
            category
            id
        }
        accountTypes {
            id
            type
        }
        accoutIndustries {
            id
            industry
        }
    }
`;

export const GET_ACCOUNTS = gql`
    ${ACCOUNT_FIELDS}

    query ($input: Int!) {
        accounts {
            ...AccountVMFields
        }
        accountsByTenant (tenantId: $input) {
            ...AccountVMFields
        }
        accountsByTenantAdmin (tenantId: $input) {
            ...AccountVMFields
        }
        accountsByUser (userId: $input) {
            ...AccountVMFields
        }
    }
`;