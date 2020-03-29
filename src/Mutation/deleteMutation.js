import { gql } from "apollo-boost";

export const DELETE_CARD = gql`
  mutation deleteCard($cardId: String!) {
    deleteCard(cardId: $cardId)
  }
`;
export const DELETE_CONTAINER = gql`
  mutation deleteContainer($containerId: String!) {
    deleteContainer(containerId: $containerId)
  }
`;

export const DELETE_BOARD = gql`
  mutation deleteBoard($boardId: String!) {
    deleteBoard(boardId: $boardId)
  }
`;

export const DELETE_ME = gql`
  mutation deleteMe {
    deleteMe
  }
`;
