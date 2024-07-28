import { gql } from "@apollo/client";

const ROLE_FIELDS = gql`
    fragment RoleVMFields on UserRoleVM {
        createdOn
        id
        name
        status
    }
`;

export const GET_ROLES = gql`
    ${ROLE_FIELDS}

    query {
        roles {
            ...RoleVMFields
        }
    }
`;