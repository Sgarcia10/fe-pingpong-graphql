import { gql } from "@apollo/client";

export const createMatch = gql`
  mutation CreateMatch(
    $player1Id: String!,
    $player2Id: String!,
    $games: [[Int!]!]!
  ) {
    createMatch(matchData: {
      player1Id: $player1Id
      player2Id: $player2Id
      games: $games
    }) {
      id
    }
  }
`;

export const getAllMatches = gql`
  query GetAllMatches{
    matches {
      id,
      winner,
      player1 {
        username
      },
      player2 {
        username
      },
      games {
        id,
        player1Points,
        player2Points
      }
    }
  }
`;
