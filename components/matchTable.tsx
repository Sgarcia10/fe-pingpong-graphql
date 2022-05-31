import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Match } from "../models/match";

export default function MatchTable({match}: {match: Match}) {
  function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
  ) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Player</TableCell>
            {
              match.games.map((g, i) => { 
                return (
                  <TableCell key={`cellHead${i}`} align="right">Game {i+1}</TableCell>
                )
              })
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {
            [1, 2].map((i) => {
              return (
                <TableRow
                  key={`row${i}`}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell key={`cellPlayer${i}`}>{i==1?match.player1.username: match.player2.username}</TableCell>
                  {
                  match.games.map((g, j) => { 
                      return (
                        <TableCell key={`cellGame${i}${j}`} align="right">{i==1?g.player1Points: g.player2Points}</TableCell>
                      )
                    })
                  }
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}
