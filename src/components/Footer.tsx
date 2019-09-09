import React, { PureComponent } from 'react'
import { StyleSheet } from 'react-native'
import { Header, Content, Footer, FooterTab, Button, Text, Icon, View } from 'native-base'
import { VEHICLES, STARSHIPS, PEOPLE } from '../service/constants'

interface FooterInterface {
  activeScreen: string
  navigation: any
}

export default class FooterNav extends PureComponent<FooterInterface> {
  render() {
    return (
      <View style={styles.footer}>
        <Footer>
          <FooterTab>
            <Button
              onPress={() => {
                this.props.navigation.navigate('PeopleScreen')
              }}
              active={this.props.activeScreen === PEOPLE}
            >
              <Icon name="ios-people" />
              <Text>People</Text>
            </Button>
            <Button
              onPress={() => {
                this.props.navigation.navigate('VehiclesScreen')
              }}
              active={this.props.activeScreen === VEHICLES}
            >
              <Icon name="robot-vacuum-variant" type="MaterialCommunityIcons" />
              <Text>Vehicles</Text>
            </Button>
            <Button
              onPress={() => {
                this.props.navigation.navigate('StarshipsScreen')
              }}
              active={this.props.activeScreen === STARSHIPS}
            >
              <Icon name="space-shuttle" type="FontAwesome" />
              <Text>Starships</Text>
            </Button>
          </FooterTab>
        </Footer>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    flex: 1,
    height: 200,
    width: '100%',
  },
  header: {
    fontSize: 40,
  },
  footer: { justifyContent: 'flex-end' },
})
