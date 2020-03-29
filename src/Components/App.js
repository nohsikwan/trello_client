import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { HashRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import styled from "styled-components";
import Header from "./Header";
import Store from "../store";
////////styled//////////
const Wrapper = styled.div`
  margin: 0 auto;
`;

////////////////////////
const QUERY = gql`
  {
    isLoggedIn @client
  }
`;

const App = () => {
  const {
    data: { isLoggedIn }
  } = useQuery(QUERY);
  const [item, setItem] = useState([]);

  return (
    <Store.Provider value={[null, null, item, setItem]}>
      <Router>
        <Header />
        <Wrapper>
          <Routes isLoggedIn={isLoggedIn} />
        </Wrapper>
      </Router>
    </Store.Provider>
  );
};
export default App;
