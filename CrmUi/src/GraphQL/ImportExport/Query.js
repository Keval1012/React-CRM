import { gql } from "@apollo/client";

const SAMPLE_DATA_FIELDS = gql`
    fragment SampleDataResponseFields on ExportExcelResponse {
        code
        data
        fileName
        message
        status
    }
`;

export const GET_SAMPLE_DOWNLOAD_FILE = gql`
    ${SAMPLE_DATA_FIELDS}

    query ($input: String!) {
        sampleData (module: $input) {
            ...SampleDataResponseFields
        }
    }  
`;