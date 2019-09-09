import gql from 'graphql-tag'
import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { ActivityIndicator, FlatList, StyleSheet, Text, View, RefreshControl } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import PersonItem from '../components/person/PersonItem'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { ALL_PERSONS_QUERY } from '../service/api'
import { PEOPLE } from '../service/constants'
import Person from '../model/entities/Person'

interface Data {
  loading: boolean
  error: Error
  allPersons: Array<Person>
}

interface PeopleScreenState {
  lastID: string
  people: Array<Person>
  fetchAfterLastID: string
  loading: boolean
}

export default class PeopleScreen extends Component<NavigationScreenProps, PeopleScreenState> {
  renderPerson = ({ item }: { item: Person }) => (
    <View>
      <PersonItem navigation={this.props.navigation} person={item} />
    </View>
  )

  onPersonClicked = (Person: Person) => {
    this.props.navigation.navigate('Details', { id: Person.id })
  }

  constructor(props: any) {
    super(props)
    this.state = {
      lastID: '',
      people: null,
      fetchAfterLastID: null,
      loading: true,
    }
  }

  render() {
    return (
      <View>
        <Header navigation={this.props.navigation} title={null} />
        <Query<Data>
          query={ALL_PERSONS_QUERY}
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
              data && data.allPersons && this.state.loading
                ? this.updatePeopleData(data.allPersons)
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
        <FlatList<Person>
          data={this.state.people ? this.state.people : []}
          refreshControl={
            <RefreshControl refreshing={this.state.loading} onRefresh={() => this.refresh()} />
          }
          keyExtractor={Person => Person.name}
          renderItem={this.renderPerson}
          onEndReached={() => this.fetchNextPage()}
          onEndReachedThreshold={0.01}
        />
        <Footer activeScreen={PEOPLE} navigation={this.props.navigation} />
      </View>
    )
  }

  refresh(): any {
    this.setState({ people: null, lastID: null, fetchAfterLastID: null })
  }

  fetchNextPage() {
    this.state.fetchAfterLastID !== this.state.lastID
      ? this.setState({ fetchAfterLastID: this.state.lastID, loading: true })
      : null
  }

  updatePeopleData(extraPeopleData: any) {
    const { people, lastID } = this.state

    if (!people) {
      this.setState({
        people: extraPeopleData,
        loading: false,
        lastID: extraPeopleData[extraPeopleData.length - 1].id,
      })
    } else {
      const newLastPerson = extraPeopleData[extraPeopleData.length - 1]
      if (newLastPerson && newLastPerson.id) {
        if (lastID === newLastPerson.id) {
        } else {
          this.setState({
            people: [...people, ...extraPeopleData],
            lastID: newLastPerson.id,
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
