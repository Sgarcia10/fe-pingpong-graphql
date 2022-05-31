import { Box, Fab, Tab, Tabs } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import PlayersTable from "./players";
import { AddMatchDialog } from "./addMatchDialog";
import React from "react";
import MatchesList from "./matchesList";

export default function Board() {
    const [open, setOpen] = React.useState(false);
    const [tabValue, setTabValue] = React.useState('matches');
  
    const openDialog = () => {
      setOpen(true);
    } 
  
    const handleClose = (value: string) => {
      setOpen(false);
    };

    const tabChange = (event: React.SyntheticEvent, newValue: string) => {
        setTabValue(newValue);
      };

    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <Tabs 
                value={tabValue} 
                onChange={tabChange}
                centered
                textColor="secondary"
                indicatorColor="secondary"
            >
                <Tab value="matches" label="Matches" />
                <Tab value="players" label="Players" />
            </Tabs>
            { tabValue === 'players' &&
                <PlayersTable/>
            }
            { tabValue === 'matches' &&
                <MatchesList/>
            }
            <Fab color="primary" aria-label="add" onClick={openDialog}>
                <AddIcon/>
            </Fab>
            <AddMatchDialog
                selectedValue={""}
                open={open}
                onClose={handleClose}
            />
        </Box>
    )
}