import { gql } from "apollo-boost";

export const GET_BOARDS = gql`
  query getBoards {
    getBoards {
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
export const GET_BOARD = gql`
  query getBoard($id: String!) {
    getBoard(id: $id) {
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

export const GET_ME = gql`
  query getMe {
    getMe {
      name
      bio
      email
    }
  }
`;
