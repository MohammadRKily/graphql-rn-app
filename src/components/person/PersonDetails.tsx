import React, { Component, PureComponent } from 'react'
import { Text, StyleSheet, ScrollView } from 'react-native'
import { CardItem, Card, Body } from 'native-base'
import Person from '../../model/entities/Person'
import Film from '../../model/entities/Film'
import { View } from 'react-native-animatable'
import font from '../../theme/fonts'
import { NavigationScreenProps } from 'react-navigation'
import Planet from '../../model/entities/Planet'
import Header from '../../components/Header'
const fontStyle = font.style

export default class PersonDetails extends PureComponent<NavigationScreenProps> {
  getPersonalAttributes(person: Person) {
    return (
      <View animation="flipInX" duration={2000} delay={200}>
        <Card style={styles.personalAttributes}>
          <CardItem style={{ alignSelf: 'center' }} header bordered>
            <Text style={fontStyle.h2}>{person.name}</Text>
          </CardItem>
          <CardItem bordered>
            <Text style={fontStyle.h3}>Birth Year: {person.birthYear}</Text>
          </CardItem>
          <CardItem bordered>
            <Text style={fontStyle.h3}>Gender: {person.gender}</Text>
          </CardItem>
          <CardItem bordered>
            <Text style={fontStyle.h3}>Height: {person.height}</Text>
          </CardItem>
          <CardItem bordered>
            <Text style={fontStyle.h3}>Skin Colour: {person.skinColor}</Text>
          </CardItem>
        </Card>
      </View>
    )
  }

  getAddress(planet: Planet) {
    return (
      <View animation="fadeInLeft" duration={1200} delay={600}>
        <Card style={{ borderRadius: 12, width: '95%', alignSelf: 'center', marginBottom: 12 }}>
          <CardItem style={{ alignSelf: 'center' }} header bordered>
            <Text style={fontStyle.h2}>Homeworld</Text>
          </CardItem>
          <CardItem bordered>
            <Text style={fontStyle.h3}>Planet: {planet.name}</Text>
          </CardItem>
          <CardItem bordered>
            <Text style={fontStyle.h3}>Climate: {planet.climate}</Text>
          </CardItem>
          <CardItem bordered>
            <Text style={fontStyle.h3}>Terrain: {planet.terrain}</Text>
          </CardItem>
          <CardItem bordered>
            <Text style={fontStyle.h3}>Population: {planet.population}</Text>
          </CardItem>
        </Card>
      </View>
    )
  }

  getFilms(films: Array<Film>) {
    return (
      <View animation="fadeInRight" duration={1200} delay={900}>
        <Card style={styles.films}>
          <CardItem style={{ alignSelf: 'center' }} header bordered>
            <Text style={fontStyle.h2}>Feautured in:</Text>
          </CardItem>
          {films &&
            films.map((film: Film, i: number) => {
              return (
                <CardItem bordered>
                  <Text style={fontStyle.h3}>Episode: {film.episodeId + ' ' + film.title}</Text>
                </CardItem>
              )
            })}
        </Card>
      </View>
    )
  }

  render() {
    return <View style={{ flex: 1 }}>{this.renderDetails()}</View>
  }
  renderDetails(): React.ReactNode {
    const { person } = this.props.navigation.state.params
    return (
      <View style={styles.detailsContainer}>
        <Header navigation={this.props.navigation} title={person ? person.name : null} />
        <ScrollView style={{ height: '85%', width: '100%', borderRadius: 12 }}>
          <Card>
            {person && this.getPersonalAttributes(person)}
            {person && person.homeworld && this.getAddress(person.homeworld)}
            {person && person.films && this.getFilms(person.films)}
          </Card>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  detailsContainer: { height: '100%', width: '100%' },
  person: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  personalAttributes: { borderRadius: 12, width: '95%', alignSelf: 'center', marginBottom: 12 },
  films: { borderRadius: 12, width: '95%', alignSelf: 'center', marginBottom: 12 },
})
