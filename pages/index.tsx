import { Container, CssBaseline } from '@mui/material'
import type { NextPage } from 'next'
import React, { useEffect } from 'react'
import styles from '../styles/Home.module.css'
import { useAuth0 } from "@auth0/auth0-react";
import Login from '../components/login';
import ResponsiveAppBar from '../components/appBar';
import Board from '../components/board';

const Home: NextPage = () => {
  const [open, setOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const openDialog = () => {
    setOpen(true);
  } 

  const handleClose = (value: string) => {
    setOpen(false);
  };

  const { user, isAuthenticated, getAccessTokenSilently, logout } = useAuth0();

  useEffect(() => {
    const getUserMetadata = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: 'https://xzlwhiopyf.execute-api.us-east-1.amazonaws.com',
          grantType: 'client-credentials'
        });
        localStorage.setItem('token', accessToken);
        setIsLoggedIn(true)
      } catch (e: any) {
        console.log(e.message);
      }
    };
  
    getUserMetadata();
  }, [getAccessTokenSilently, user?.sub]);

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    logout({ returnTo: window.location.origin })
  }

  return (
    <React.Fragment>
      {isAuthenticated && isLoggedIn && 
        <ResponsiveAppBar handleLogout={handleLogout}/>
      }
      <CssBaseline />
      <Container maxWidth="sm" sx={{display: 'flex', flexDirection: 'column'}}>
        {isAuthenticated && isLoggedIn &&
          <Board/>
        }
        {!isAuthenticated && 
          <h1 className={styles.title}>
          Ping Pong 🏓
        </h1>}
        {!isAuthenticated && 
          <Login/>
        } 
      </Container>
    </React.Fragment>
  )
}

export default Home
