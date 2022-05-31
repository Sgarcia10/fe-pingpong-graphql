import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { Auth0Provider } from '@auth0/auth0-react';
import App from 'next/app';

export default class Root extends App {
  render () {
    const { Component, pageProps } = this.props;
    return (
      <Auth0Provider
        domain="dev-1icl38ta.us.auth0.com"
        clientId="T8B1lNHUJdIzuZBEeL04uDXxtUTKDyLR"
        redirectUri={'http://localhost:4000'}>
          <Component {...pageProps} />
      </Auth0Provider>
    );
  }
}