import { ApolloClient, HttpLink, split } from "apollo-boost";
import { defaults, resolvers } from "./LocalState";
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { InMemoryCache } from "apollo-cache-inmemory";
import { withClientState } from "apollo-link-state";
import { ApolloLink, concat, Operation } from "apollo-link";

const errLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[CLIENT_GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

// Create an http link:
const httpLink = new HttpLink({
  uri: "http://localhost:4000"
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/`,
  options: {
    reconnect: true
  }
});
export const authMiddleWare = setContext(async (_, { headers }) => {
  const token = await localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}` || ""
    }
  };
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);
const cache = new InMemoryCache();
const localStateLink = withClientState({
  cache,
  defaults,
  resolvers
});

export default new ApolloClient({
  cache,
  link: ApolloLink.from([errLink, localStateLink, concat(authMiddleWare, link)])
});
