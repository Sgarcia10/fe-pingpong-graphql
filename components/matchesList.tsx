import { useQuery } from "@apollo/client";
import { Box, Card, CardContent, Fab, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Match } from "../models/match";
import { getAllMatches } from "../queries/matches";
import { AddMatchDialog } from "./addMatchDialog";
import MatchTable from "./matchTable";
import AddIcon from '@mui/icons-material/Add';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function MatchesList() {
  const { data: matchesData, loading: loadingMatches, refetch } = useQuery(getAllMatches);
  const [open, setOpen] = useState(false);
  const [matches, setMatches] = useState<Match[]>([])
  useEffect(() => {
    if(matchesData) {
      setMatches(matchesData.matches)
    }
  }, [matchesData, loadingMatches])

  const openDialog = () => {
    setOpen(true);
  } 

  const handleClose = (value: string) => {
    refetch()
    setOpen(false);
  };


  return (
    matches && 
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Fab
        key='addMatchButton'
        color="primary"
        aria-label="add"
        onClick={openDialog}
        sx={{margin: '10px', position: 'fixed', bottom: '0', right: '0'}}
      >
        <AddIcon/>
      </Fab>
      {matches.map((match, i) => {
        return (
          <Card key={`card-${i}`} sx={{ minWidth: 275, marginBottom: '5px'}}>
            <CardContent key={`cardContent-${i}`} >
              <MatchTable key={`matchTable-${i}`}  match={match}></MatchTable>
            </CardContent>
          </Card>
        )
      })}
      <AddMatchDialog
        key='addMatchDialog'
        selectedValue={""}
        open={open}
        onClose={handleClose}
      />
    </Box>
  )
}
