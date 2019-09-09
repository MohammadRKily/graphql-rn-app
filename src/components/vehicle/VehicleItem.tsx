import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import Vehicle from '../../model/entities/Vehicle'
import font from '../../theme/fonts'
const fontStyle = font.style
import { CardItem, Card, Body } from 'native-base'

interface VehicleItemProps {
  vehicle: Vehicle
  navigation: any
}

export default class VehicleItem extends Component<VehicleItemProps> {
  constructor(props: VehicleItemProps) {
    super(props)
  }

  render() {
    const { vehicle } = this.props
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('VehiclesDetails', { vehicle: vehicle })
        }}
      >
        <Card style={styles.itemCard}>
          <CardItem style={{ alignSelf: 'center' }} header bordered>
            <Text style={fontStyle.h2}>{vehicle.name}</Text>
          </CardItem>
          <View style={styles.model}>
            <CardItem style={{ justifyContent: 'center' }} bordered>
              <Text style={[fontStyle.h3, { textAlign: 'center' }]}>
                Speed: {vehicle.maxAtmospheringSpeed}
              </Text>
            </CardItem>

            <CardItem style={styles.manufacturer} bordered>
              <Text style={[fontStyle.h3, { textAlign: 'center' }]}>
                Manufacturer: {vehicle.manufacturer}
              </Text>
            </CardItem>
          </View>
        </Card>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  itemCard: { borderRadius: 12, width: '95%', alignSelf: 'center' },
  model: { flexDirection: 'column', flex: 1, justifyContent: 'center', width: '95%' },
  manufacturer: { justifyContent: 'center', width: '80%', alignSelf: 'center' },
})
