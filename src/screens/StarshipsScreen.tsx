import gql from 'graphql-tag'
import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { ActivityIndicator, FlatList, StyleSheet, Text, View, RefreshControl } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import Footer from '../components/Footer'
import { ALL_STARSHIPS_QUERY } from '../service/api'
import Starship from '../model/entities/Starship'
import StarshipItem from '../components/starship/StarshipItem'
import { STARSHIPS } from '../service/constants'
import Header from '../components/Header'

interface Data {
  loading: boolean
  error: Error
  allStarships: Array<Starship>
}

interface StarshipsScreenState {
  lastID: string
  starships: Array<Starship>
  fetchAfterLastID: string
  loading: boolean
}
export default class StarshipsScreen extends Component<
  NavigationScreenProps,
  StarshipsScreenState
> {
  renderStarship = ({ item }: { item: Starship }) => (
    <View>
      <StarshipItem navigation={this.props.navigation} starship={item} />
    </View>
  )

  constructor(props: any) {
    super(props)
    this.state = {
      lastID: '',
      starships: null,
      fetchAfterLastID: null,
      loading: true,
    }
  }

  render() {
    return (
      <View>
        <Header navigation={this.props.navigation} title={null} />
        <Query<Data>
          query={ALL_STARSHIPS_QUERY}
          variables={{ count: 10, lastID: this.state.fetchAfterLastID }}
        >
          {({ loading, error, data }) => {
            if (loading) {
              return (
                <View style={styles.loading}>
                  <ActivityIndicator />
                </View>
              )
            } else if (error) {
              this.state.loading && this.setState({ loading: false })
              return <Text style={styles.error}>{error.message}</Text>
            } else {
              data && data.allStarships && this.state.loading
                ? this.updateListData(data.allStarships)
                : null
              return null
            }
          }}
        </Query>
        {this.renderListData()}
      </View>
    )
  }

  renderListData(): React.ReactNode {
    return (
      <View style={{ height: '100%' }}>
        <FlatList<Starship>
          data={this.state.starships ? this.state.starships : []}
          refreshControl={
            <RefreshControl refreshing={this.state.loading} onRefresh={() => this.refresh()} />
          }
          keyExtractor={Starship => Starship.name}
          renderItem={this.renderStarship}
          onEndReached={() => this.fetchNextPage()}
          onEndReachedThreshold={0.01}
        />
        <Footer activeScreen={STARSHIPS} navigation={this.props.navigation} />
      </View>
    )
  }

  refresh(): any {
    this.setState({ starships: null, lastID: null, fetchAfterLastID: null })
  }

  fetchNextPage() {
    this.state.fetchAfterLastID !== this.state.lastID
      ? this.setState({ fetchAfterLastID: this.state.lastID, loading: true })
      : null
  }

  updateListData(extraStarshipsData: any) {
    const { starships, lastID } = this.state

    if (!starships) {
      this.setState({
        starships: extraStarshipsData,
        loading: false,
        lastID: extraStarshipsData[extraStarshipsData.length - 1].id,
      })
    } else {
      const newLastStarship = extraStarshipsData[extraStarshipsData.length - 1]
      if (newLastStarship && newLastStarship.id) {
        if (lastID === newLastStarship.id) {
        } else {
          this.setState({
            starships: [...starships, ...extraStarshipsData],
            lastID: newLastStarship.id,
            loading: false,
          })
        }
      }
    }
  }
}

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    height: '50%',
    width: '100%',
  },
  container: {
    height: '100%',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  error: {
    padding: 0,
    fontSize: 20,
    color: 'red',
    textAlign: 'center',
  },
})
