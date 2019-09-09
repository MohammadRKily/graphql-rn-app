import React, { Component, PureComponent } from 'react'
import { Button, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { CardItem, Card, Body } from 'native-base'
import Vehicle from '../../model/entities/Vehicle'
import { View } from 'react-native-animatable'
import font from '../../theme/fonts'
import Header from '../../components/Header'
import { NavigationScreenProps } from 'react-navigation'
const fontStyle = font.style

export default class VehicleDetails extends PureComponent<NavigationScreenProps> {
  getVehicleAttributes(vehicle: Vehicle) {
    return (
      <View animation="fadeInRight" duration={1200} delay={300}>
        <Card style={styles.vehicleCard}>
          <CardItem style={{ alignSelf: 'center' }} header bordered>
            <Text style={fontStyle.h2}> {vehicle.name} </Text>
          </CardItem>

          <CardItem bordered>
            <Text style={fontStyle.h3}>Length: {vehicle.length}</Text>
          </CardItem>
          <CardItem bordered>
            <Text style={fontStyle.h3}>Speed: {vehicle.maxAtmospheringSpeed}</Text>
          </CardItem>
          <CardItem bordered>
            <Text style={fontStyle.h3}>Crew: {vehicle.crew}</Text>
          </CardItem>
          <CardItem bordered>
            <Text style={fontStyle.h3}>Passengers: {vehicle.passengers}</Text>
          </CardItem>
          <CardItem bordered>
            <Text style={fontStyle.h3}>Vehicle class: {vehicle.class}</Text>
          </CardItem>
        </Card>
      </View>
    )
  }

  render() {
    var { vehicle } = this.props.navigation.state.params
    return (
      <View style={{ flex: 1 }}>
        <Header navigation={this.props.navigation} title={vehicle ? vehicle.name : null} />
        <ScrollView>
          <Card style={styles.vehicleAttributes}>
            {vehicle && this.getVehicleAttributes(vehicle)}
          </Card>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  vehicleAttributes: { height: '85%', width: '100%', borderRadius: 12 },
  vehicleCard: { borderRadius: 12, width: '95%', alignSelf: 'center', marginBottom: 12 },
})
