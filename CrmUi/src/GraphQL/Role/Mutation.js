import { gql } from "@apollo/client";

const ROLE_FIELDS = gql`
    fragment RoleFields on Role {
        createdOn
        id
        name
        status
    }
`;

export const ADD_OR_UPDATE_ROLE = gql`
    ${ROLE_FIELDS}

    mutation ($input: UserRoleVMInput!) {
        addOrUpdateRole (role: $input) {
            ...RoleFields
        }
    }
`;

export const DELETE_ROLE = gql`
    mutation ($input: Int!) {
        deleteRole (id: $input)
    }
`;