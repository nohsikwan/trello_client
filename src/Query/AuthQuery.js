import { gql } from "apollo-boost";

export const LOG_IN = gql`
  query logIn($email: String!, $password: String!) {
    logIn(email: $email, password: $password)
  }
`;
