import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Router from "./Router";
const QUERY = gql`
  {
    isLoggedIn @client
  }
`;

const App = () => {
  const {
    data: { isLoggedIn }
  } = useQuery(QUERY);
  console.log(isLoggedIn);
  return (
    <>
      <Router isLoggedIn={isLoggedIn} />
    </>
  );
};
export default App;
