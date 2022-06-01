import { Box, Fab, Tab, Tabs } from "@mui/material";
import PlayersTable from "./players";
import React from "react";
import MatchesList from "./matchesList";

export default function Board() {
    const [tabValue, setTabValue] = React.useState('matches');
  
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
        </Box>
    )
}