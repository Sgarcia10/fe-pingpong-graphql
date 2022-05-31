import { useQuery } from "@apollo/client";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Match } from "../models/match";
import { getAllMatches } from "../queries/MATCHES";
import MatchTable from "./matchTable";

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function MatchesList() {
  const { data: matchesData, loading: loadingMatches } = useQuery(getAllMatches);
  const [matches, setMatches] = useState<Match[]>([])
  useEffect(() => {
    if(matchesData) {
      setMatches(matchesData.matches)
    }
  }, [matchesData, loadingMatches])

  return (
    matches && 
    <Box>
      {matches.map((match, i) => {
        return (
          <Card key={`card-${i}`} sx={{ minWidth: 275, marginBottom: '5px'}}>
            <CardContent key={`cardContent-${i}`} >
              <MatchTable key={`matchTable-${i}`}  match={match}></MatchTable>
            </CardContent>
          </Card>
        )
      })}
    </Box>
  )
}
