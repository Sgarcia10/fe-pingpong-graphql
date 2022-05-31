import { Box, Container, CssBaseline, Fab, Tab, Tabs } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import type { NextPage } from 'next'
import React from 'react'
import styles from '../styles/Home.module.css'
import { AddMatchDialog } from '../components/addMatchDialog';
import { useAuth0 } from "@auth0/auth0-react";

const Home: NextPage = () => {
  const [open, setOpen] = React.useState(false);

  const openDialog = () => {
    setOpen(true);
  } 

  const handleClose = (value: string) => {
    setOpen(false);
  };

  const { loginWithRedirect } = useAuth0();


  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <button onClick={() => loginWithRedirect()}>Log In</button>
        <h1 className={styles.title}>
          Ping Pong 🏓
        </h1>
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <Tabs value={""} onChange={() => {}} centered>
            <Tab label="Matches" />
            <Tab label="Players" />
          </Tabs>
          <Fab color="primary" aria-label="add" onClick={openDialog}>
            <AddIcon/>
          </Fab>
        </Box>
      </Container>
      <AddMatchDialog
        selectedValue={""}
        open={open}
        onClose={handleClose}
      />
    </React.Fragment>
  )
}

export default Home
