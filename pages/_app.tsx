import '../styles/globals.css'
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import { Auth0Provider } from '@auth0/auth0-react';
import App from 'next/app';

export default class Root extends App {
  render () {
    const { Component, pageProps } = this.props;
    return (
      <Auth0Provider
        domain="dev-1icl38ta.us.auth0.com"
        clientId="T8B1lNHUJdIzuZBEeL04uDXxtUTKDyLR"
        audience="https://xzlwhiopyf.execute-api.us-east-1.amazonaws.com"
        redirectUri={'https://dn9rbuednzsao.cloudfront.net'}>
          <ApolloProvider client={client}>
            <Component {...pageProps} />
          </ApolloProvider>
      </Auth0Provider>
    );
  }
}