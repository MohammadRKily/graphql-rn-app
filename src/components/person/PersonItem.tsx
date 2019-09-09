import React, { Component, PureComponent } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import Person from '../../model/entities/Person'
import { CardItem, Card, Body } from 'native-base'
import font from '../../theme/fonts'
const fontStyle = font.style

interface PersonItemProps {
  person: Person
  navigation: any
}

export default class PersonItem extends PureComponent<PersonItemProps> {
  constructor(props: PersonItemProps) {
    super(props)
  }

  render() {
    const { person } = this.props
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('PersonDetails', { person: person })
        }}
      >
        <Card style={styles.profile}>
          <CardItem style={{ alignSelf: 'center' }} header bordered>
            <Text style={fontStyle.h2}>{person.name}</Text>
          </CardItem>

          <View style={styles.stats}>
            <CardItem bordered>
              <Text style={fontStyle.h3}>Height: {person.height + ' CM'}</Text>
            </CardItem>
            <CardItem bordered>
              <Text style={fontStyle.h3}>Skin Colour: {person.skinColor}</Text>
            </CardItem>
          </View>
        </Card>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  person: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  profile: { borderRadius: 12, width: '95%', alignSelf: 'center' },
  stats: { flexDirection: 'row', flex: 1, justifyContent: 'center', width: '95%' },
})
