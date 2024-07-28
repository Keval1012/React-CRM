import { gql } from "@apollo/client";

const TASK_FIELDS = gql`
    fragment TaskFields on Task {
        account
        categoryId
        createdOn
        endDate
        id
        owner
        roleId
        startDate
        statusId
        subject
        tenantId
        userId
    }
`;

export const ADD_OR_UPDATE_TASK = gql`
    ${TASK_FIELDS}

    mutation ($input: TaskVMInput!) {
        addOrUpdateTask (task: $input) {
            ...TaskFields
        }
    }
`;

export const DELETE_TASK = gql`
    mutation ($input: Int!) {
        deleteTask (id: $input)
    }
`;