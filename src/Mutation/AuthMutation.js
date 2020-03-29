import { gql } from "apollo-boost";

export const SIGNUP = gql`
  mutation signUp(
    $email: String!
    $password: String!
    $name: String!
    $bio: String
  ) {
    signUp(email: $email, password: $password, name: $name, bio: $bio) {
      name
      email
      bio
    }
  }
`;

export const LOCAL_LOGIN = gql`
  mutation logUserIn($token: String!) {
    logUserIn(token: $token) @client
  }
`;
