import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context'; 
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

let API_URL = 'http://localhost/graphql';

if (document.location.protocol == 'https:') {
	API_URL = 'https://rave.pro/graphql';
}

const httpLink = createHttpLink({
	uri: API_URL
});

const authLink = setContext((_, { headers }) => { 
  const token = localStorage.getItem('token'); 
 
  return { 
    credentials: 'same-origin', 
    headers: { 
      ...headers, 
      token: token && token != 'none' ? token : '' 
    } 
  }; 
}); 

export const apolloClient = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
	context: {
		credentials: 'same-origin'
	},
	defaultOptions: {
		query: {
			fetchPolicy: 'network-only',
			errorPolicy: 'all'
		},
		mutate: {
			errorPolicy: 'all'
		}
	}
});
