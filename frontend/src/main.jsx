import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from "react-router";
import { ApolloProvider, InMemoryCache, ApolloClient, HttpLink } from "@apollo/client";

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: 'https://your-graphql-endpoint.com/graphql',
  }),
  cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ApolloProvider client={apolloClient}>
        <QueryClientProvider client={queryClient}>
         <App />
        </QueryClientProvider>
      </ApolloProvider>
    </BrowserRouter>
  </StrictMode>
)
