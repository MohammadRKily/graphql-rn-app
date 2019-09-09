import React, { Component, PureComponent } from 'react'
import { Button, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { CardItem, Card, Body } from 'native-base'
import Starship from '../../model/entities/Starship'
import { View } from 'react-native-animatable'
import font from '../../theme/fonts'
import Header from '../../components/Header'
import { NavigationScreenProps } from 'react-navigation'
const fontStyle = font.style

export default class StarshipDetails extends PureComponent<NavigationScreenProps> {
  getStarshipAttributes(starship: Starship) {
    return (
      <View animation="fadeInRight" duration={1200} delay={500}>
        <Card style={styles.starship}>
          <CardItem style={{ alignSelf: 'center' }} header bordered>
            <Text style={fontStyle.h3}>{starship.name}</Text>
          </CardItem>
          <CardItem bordered>
            <Text style={fontStyle.h3}>Manufacturer: {starship.manufacturer}</Text>
          </CardItem>
          <CardItem bordered>
            <Text style={fontStyle.h3}>Crew: {starship.crew}</Text>
          </CardItem>
          <CardItem bordered>
            <Text style={fontStyle.h3}>Cargo_capacity: {starship.cargoCapacity}</Text>
          </CardItem>
        </Card>
      </View>
    )
  }

  render() {
    const { starship } = this.props.navigation.state.params
    return (
      <View style={{ flex: 1 }}>
        <Header navigation={this.props.navigation} title={starship ? starship.name : null} />
        <ScrollView>
          <Card style={styles.container}>{starship && this.getStarshipAttributes(starship)}</Card>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  starship: { borderRadius: 12, width: '95%', alignSelf: 'center', marginBottom: 12 },
  container: { flex: 1, height: '100%', width: '100%', borderRadius: 12 },
})
