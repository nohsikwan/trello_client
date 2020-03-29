import { gql } from "apollo-boost";

export const CREATE_BOARD = gql`
  mutation createBoard($text: String!, $color: String) {
    createBoard(text: $text, color: $color) {
      id
      text
      color
    }
  }
`;

export const CREATE_CARD = gql`
  mutation createCard($text: String!, $containerId: String!) {
    createCard(text: $text, containerId: $containerId) {
      id
      text
      created
    }
  }
`;
export const CREATE_CONTAINER = gql`
  mutation createContainer($text: String!, $boardId: String!) {
    createContainer(text: $text, boardId: $boardId) {
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
`;
