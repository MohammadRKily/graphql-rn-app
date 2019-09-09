import React, { Component, PureComponent } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { CardItem, Card, Body } from 'native-base'
import font from '../../theme/fonts'
import Starship from '../../model/entities/Starship'
const fontStyle = font.style

interface StarshipItemProps {
  starship: Starship
  navigation: any
}

export default class StarshipItem extends Component<StarshipItemProps> {
  render() {
    const { starship } = this.props
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('StarshipsDetails', { starship: starship })
        }}
      >
        <Card style={styles.item}>
          <CardItem style={{ alignSelf: 'center' }} header bordered>
            <Text style={fontStyle.h2}>{starship.name}</Text>
          </CardItem>
          <View style={styles.details}>
            <CardItem style={{ justifyContent: 'center' }} bordered>
              <Text style={[fontStyle.h3, { textAlign: 'center' }]}>Crew: {starship.crew}</Text>
            </CardItem>

            <CardItem style={styles.manufacturer} bordered>
              <Text style={[fontStyle.h3, { textAlign: 'center' }]}>
                Manufacturer: {starship.manufacturer}
              </Text>
            </CardItem>
          </View>
        </Card>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  item: { borderRadius: 12, width: '95%', alignSelf: 'center' },
  details: { flexDirection: 'column', flex: 1, justifyContent: 'center', width: '95%' },
  manufacturer: { justifyContent: 'center', width: '80%', alignSelf: 'center' },
})
