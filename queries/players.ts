import { gql } from "@apollo/client";

export const CREATE_PLAYER = gql`
  mutation CreatePlayer(
    $username: String!
  ) {
    createPlayer(username: $username) {
      id
      username
    }
  }
`;

export const GET_PLAYERS = gql`
  query Players {
    players {
      id
      username
      points
    }
  }
`;
