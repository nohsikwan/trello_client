import { gql } from "apollo-boost";

export const UPDATE_NUM = gql`
  mutation updateNumCard(
    $createdAt1: String!
    $createdAt2: String!
    $cardId1: String!
    $cardId2: String!
  ) {
    updateNumCard(
      createdAt1: $createdAt1
      createdAt2: $createdAt2
      cardId1: $cardId1
      cardId2: $cardId2
    )
  }
`;
export const UPDATE_TEXT = gql`
  mutation updateTextCard($id: String!, $text: String!) {
    updateTextCard(id: $id, text: $text)
  }
`;

export const UPDATETEXT_CONTAINER = gql`
  mutation updateTextContainer($id: String!, $text: String!) {
    updateTextContainer(id: $id, text: $text)
  }
`;

export const UPDATETEXT_BOARD = gql`
  mutation updateTextBoard($id: String!, $text: String!) {
    updateTextBoard(id: $id, text: $text)
  }
`;

export const EDIT_ME = gql`
  mutation editMe($name: String!, $email: String!, $bio: String!) {
    editMe(name: $name, email: $email, bio: $bio)
  }
`;
