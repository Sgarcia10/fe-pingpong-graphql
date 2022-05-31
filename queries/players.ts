import { gql } from "@apollo/client";

export const getPlayers = gql`
  query Players {
    players {
      id
      username
      points
    }
  }
`;
