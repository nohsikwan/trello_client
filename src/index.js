import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import Client from "./Apollo/Client";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import { ApolloProvider } from "react-apollo";
ReactDOM.render(
  <ApolloProvider client={Client}>
    <ApolloHooksProvider client={Client}>
      <App />
    </ApolloHooksProvider>
  </ApolloProvider>,
  document.getElementById("root")
);
