import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { ActivityIndicator, FlatList, StyleSheet, Text, View, RefreshControl } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { ALL_VEHICES_QUERY } from '../service/api'
import Vehicle from '../model/entities/Vehicle'
import VehicleItem from '../components/vehicle/VehicleItem'
import { VEHICLES } from '../service/constants'
interface Data {
  loading: boolean
  error: Error
  allVehicles: Array<Vehicle>
}

interface VehiclesScreenState {
  lastID: string
  vehicles: Array<Vehicle>
  fetchAfterLastID: string
  loading: boolean
}
export default class VehiclesScreen extends Component<NavigationScreenProps, VehiclesScreenState> {
  renderVehicle = ({ item }: { item: Vehicle }) => (
    <View>
      <VehicleItem navigation={this.props.navigation} vehicle={item} />
    </View>
  )

  constructor(props: any) {
    super(props)
    this.state = {
      lastID: '',
      vehicles: null,
      fetchAfterLastID: null,
      loading: true,
    }
  }

  render() {
    return (
      <View>
        <Header navigation={this.props.navigation} title={null} />
        <Query<Data>
          query={ALL_VEHICES_QUERY}
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
              data && data.allVehicles && this.state.loading
                ? this.updateListData(data.allVehicles)
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
        <FlatList<Vehicle>
          data={this.state.vehicles ? this.state.vehicles : []}
          refreshControl={
            <RefreshControl refreshing={this.state.loading} onRefresh={() => this.refresh()} />
          }
          keyExtractor={Vehicle => Vehicle.name}
          renderItem={this.renderVehicle}
          onEndReached={() => this.fetchNextPage()}
          onEndReachedThreshold={0.01}
        />
        <Footer activeScreen={VEHICLES} navigation={this.props.navigation} />
      </View>
    )
  }

  refresh(): any {
    this.setState({ vehicles: null, lastID: null, fetchAfterLastID: null })
  }

  fetchNextPage() {
    this.state.fetchAfterLastID !== this.state.lastID
      ? this.setState({ fetchAfterLastID: this.state.lastID, loading: true })
      : null
  }

  updateListData(extraVehiclesData: any) {
    const { vehicles, lastID } = this.state

    if (!vehicles) {
      this.setState({
        vehicles: extraVehiclesData,
        loading: false,
        lastID: extraVehiclesData[extraVehiclesData.length - 1].id,
      })
    } else {
      const newLastVehicle = extraVehiclesData[extraVehiclesData.length - 1]
      if (newLastVehicle && newLastVehicle.id) {
        if (lastID === newLastVehicle.id) {
        } else {
          this.setState({
            vehicles: [...vehicles, ...extraVehiclesData],
            lastID: newLastVehicle.id,
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
