import { ApolloClient, InMemoryCache } from "@apollo/client";
import { API_HOST } from "../Constants";

export const client = new ApolloClient({
    uri: `${API_HOST}/graphql/`,
    cache: new InMemoryCache()
});