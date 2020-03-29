import { gql } from "apollo-boost";

export const SUBSCRIPTION_BOARD = gql`
  subscription subscriptionBoard($email: String!) {
    subscriptionBoard(email: $email) {
      id
      text
      color
      createdAt
      user {
        id
        email
        name
      }
      containers {
        id
        text
        createdAt
        cards {
          id
          text
          created
        }
      }
    }
  }
`;
