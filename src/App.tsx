import ApolloClient from 'apollo-boost'
import React, { PureComponent } from 'react'
import { ApolloProvider } from 'react-apollo'
import AppNavigator from './Navigator/AppNavigator'

const client = new ApolloClient({
  uri: 'https://api.graphcms.com/simple/v1/swapi',
})

export default class App extends PureComponent {
  render() {
    return (
      <ApolloProvider client={client}>
        <AppNavigator />
      </ApolloProvider>
    )
  }
}
