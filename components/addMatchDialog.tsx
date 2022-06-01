import { useMutation, useQuery } from "@apollo/client";
import { Alert, Box, Button, Container, Dialog, Fab, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import React from "react";
import { Player } from "../models/player";
import { GET_PLAYERS } from "../queries/players";
import AddIcon from '@mui/icons-material/Add';
import { createMatch } from "../queries/matches";

export interface AddMatchDialogProps {
    open: boolean;
    selectedValue: string;
    onClose: (value: string) => void;
}

export function AddMatchDialog(props: AddMatchDialogProps) {
    const { onClose, selectedValue, open } = props;
    const { data: playersData, loading: loadingPlayers } = useQuery(GET_PLAYERS);
    const [mutateCreateMatch, { data: matchData, loading: loadingMatch, error: errorMatch }] = useMutation(createMatch, {
      onError: (err: any) => {}
    });

    const [players, setPlayers] = React.useState<Player[]>([])
    const [player1, setPlayer1] = React.useState<Player>({} as Player)
    const [player2, setPlayer2] = React.useState<Player>({} as Player)
    const [games, setGames] = React.useState<number[][]>([[0,0]])

    React.useEffect(() => {
      if(playersData) {
        setPlayers(playersData.players)
      }
    }, [playersData, loadingPlayers]);

    React.useEffect(() => {
      if(errorMatch) {
        console.log({errorMatch});
        
      }
      if(matchData) {
        onClose('')
      }
    }, [matchData, loadingMatch]);
  
    const handleClose = () => {
      onClose(selectedValue);
    };
  
    const handleListItemClick = (value: string) => {
      onClose(value);
    };

    const selectPlayer = (ev: SelectChangeEvent, playerNumber: number) => {
      const selectedPlayerId = ev.target.value
      if (!selectedPlayerId) {
        return
      }
      const selectPlayer = players.find(p => p.id === selectedPlayerId) as Player
      switch (playerNumber) {
        case 1:
          setPlayer1(selectPlayer)
        case 2:
          setPlayer2(selectPlayer)
      }
    }

    const filterPlayers = (player: Player, playerNumber: number) => {
      switch (playerNumber) {
        case 1:
          return player.id !== player2?.id
        case 2:
          return player.id !== player1?.id
      }

      return true
    }

    const addGame = () => {
      const newGames = [...games]
      newGames.push([0,0])
      setGames(newGames)
    }

    const changeGame = (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, player: number, gameNumber: number) => {
      const newGames = [...games]
      const points = ev.target.value.replace(/^0+/, '')
      
      newGames[gameNumber][player-1] = Number(points ?? 0)
      setGames(newGames)
    }
    
    const addMatch = () => {
      if(!!player1.id || !!player2.id) {
        //TODO
      }
      
      mutateCreateMatch({
        variables: {
          player1Id: player1.id,
          player2Id: player2.id,
          games
        }})
    }
  
    return (
      <Dialog 
        onClose={handleClose} 
        open={open}
        fullWidth={true}
        maxWidth={'md'}>
        <Box sx={{padding:'10px', display:'flex', flexDirection: 'column', justifyContent: 'center'}}>
          <Container sx={{display:'flex', alignItems:'center', justifyContent: 'center'}}>
            <Container sx={{width: 'auto', margin: 'auto'}}>
              {[1, 2].map((i) => {
                return (
                  <Container key={`container-${i}`} sx={{display:'flex', alignItems: 'center', width: 'auto', margin: 'auto'}}>
                    <FormControl key={`formControl-${i}`} sx={{ m: 1, minWidth: 120 }} size="small">
                      <InputLabel key={`inputLabel-${i}`}>Player {i}</InputLabel>
                      <Select
                        key={`select-${i}`}
                        value={i === 1? player1?.id ?? '' : player2?.id ?? '' }
                        label={`Player ${i}`}
                        onChange={(ev) => selectPlayer(ev, i)}
                      >
                        {players
                          // .filter(p => filterPlayers(p, i))
                          .map((p, j) => {
                            return (
                              <MenuItem key={`menuItem-${i}${j}`} value={p.id}>{p.username}</MenuItem>
                            )
                          })
                        }
                      </Select>
                    </FormControl>
                    {games.map((game, j) => {
                      return (
                      <TextField
                        key={`textFiled-${i}${j}`}
                        label={`Game ${j+1}`}
                        size="small"
                        sx={{width: '70px'}}
                        value={game[i-1]}
                        type="number"
                        onChange={(ev)=> changeGame(ev, i,j)}
                      />)
                    })}
                  </Container>
                )
              })}
            </Container>
            <Fab color="primary" aria-label="add" onClick={addGame}>
                <AddIcon/>
            </Fab>
          </Container>
          <Button variant="contained" onClick={addMatch}>ADD MATCH</Button>
          { errorMatch &&
            <Alert severity="error">{errorMatch.message}</Alert>
          }
        </Box>
      </Dialog>
    );
  }