import { gql } from "@apollo/client";

const TASK_FIELDS = gql`
    fragment TaskVMFields on TaskVM {
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
        taskCategories {
            category
            id
        }
        taskStatuses {
            id
            status
        }
    }
`;

export const GET_TASKS = gql`
    ${TASK_FIELDS}

    query ($input: Int!) {
        tasks {
            ...TaskVMFields
        }
        tasksByTenant (tenantId: $input) {
            ...TaskVMFields
        }
        tasksByTenantAdmin (tenantId: $input) {
            ...TaskVMFields
        }
        tasksByUser (userId: $input) {
            ...TaskVMFields
        }
    }
`;