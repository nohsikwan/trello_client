import React, { useContext } from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import Input from "./Input";
import useInput from "../Hooks/useInput";
import { Cards, Plus, User, Home } from "./Icons";
import Store from "../store";

///////////////////////css/////////////////////
const Header = styled.header`
  width: 100%;
  border: 0;
  position: fixed;
  top: 0;
  left: 0;
  background-color: "white";
  border-bottom: 1px solid #e6e6e6;
  border-radius: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px 0px;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: 935px;
  display: flex;
  justify-content: center;
`;

const HeaderColumn = styled.div`
  width: 33%;
  text-align: center;
  &:first-child {
    margin-right: auto;
    text-align: left;
  }
  &:last-child {
    margin-left: auto;
    text-align: right;
  }
`;

const SearchInput = styled(Input)`
  padding: 5px;
  font-size: 14px;
  border-radius: 3px;
  height: auto;
  text-align: center;
  width: 70%;
  &::placeholder {
    opacity: 0.8;
    font-weight: 200;
  }
`;

const HeaderLink = styled(Link)`
  &:not(:last-child) {
    margin-right: 30px;
  }
`;
//////////////////////////////////////////

const HeaderRoute = ({ history }) => {
  const store = useContext(Store);
  const name = store[2][0] && store[2][0].user.name;
  const search = useInput("");
  const onSearchSubmit = e => {
    e.preventDefault();
    history.push(`/search?term=${search.value}`);
  };
  return (
    <Header>
      <HeaderWrapper>
        <HeaderColumn>
          <Link to="/">
            <Home />
          </Link>
        </HeaderColumn>
        <HeaderColumn>
          <form onSubmit={onSearchSubmit}>
            <SearchInput {...search} placeholder="Search" />
          </form>
        </HeaderColumn>
        <HeaderColumn>
          <HeaderLink to="/">
            <Cards />
          </HeaderLink>
          <HeaderLink to="/">
            <Plus />
          </HeaderLink>
          <HeaderLink to={`/${name}`}>
            <User />
          </HeaderLink>
        </HeaderColumn>
      </HeaderWrapper>
    </Header>
  );
};

export default withRouter(HeaderRoute);
