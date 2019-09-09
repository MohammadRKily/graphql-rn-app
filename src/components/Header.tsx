import React, { Component, PureComponent } from 'react'
import { StyleSheet } from 'react-native'
import { Container, Header, View, Left, Body, Right, Button, Icon, Title } from 'native-base'

interface HeaderInteface {
  title: string
  navigation: any
}

export default class HeaderExample extends PureComponent<HeaderInteface> {
  render() {
    var { title } = this.props
    return (
      <Container>
        <Header>
          {title ? (
            <View style={styles.header}>
              <Left>
                <Button
                  transparent
                  onPress={() => {
                    this.props.navigation.goBack()
                  }}
                >
                  <Icon style={styles.white} name="arrow-back" />
                </Button>
              </Left>
              <Body style={styles.headerTitle}>
                <Title style={styles.white}>{title}</Title>
              </Body>
              <Right>
                <Button transparent></Button>
              </Right>
            </View>
          ) : null}
        </Header>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  white: {
    color: 'white',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
  },
  headerTitle: { flex: 3, width: '100%' },
})
