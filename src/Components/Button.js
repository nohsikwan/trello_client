import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.button`
  width: 100%;
  border: 0;
  border-radius: 10px;
  color: white;
  font-weight: 600;
  background-color: black;
  text-align: center;
  margin-left: 4%;
  padding: 7px 0px;
  font-size: 14px;
`;

const Button = ({ text }) => <Container>{text}</Container>;

Button.propTypes = {
  text: PropTypes.string.isRequired
};

export default Button;
