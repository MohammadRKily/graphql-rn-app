import { createAppContainer, createStackNavigator } from 'react-navigation'

import PeopleScreen from '../screens/PeopleScreen'
import PersonDetails from '../components/person/PersonDetails'

import StarshipsScreen from '../screens/StarshipsScreen'
import StarshipsDetails from '../components/starship/StarshipDetails'

import VehiclesScreen from '../screens/VehiclesScreen'
import VehiclesDetails from '../components/vehicle/VehicleDetails'

const StackNavigator = createStackNavigator(
  {
    PeopleScreen: PeopleScreen,
    PersonDetails: PersonDetails,

    VehiclesScreen: VehiclesScreen,
    VehiclesDetails: VehiclesDetails,

    StarshipsScreen: StarshipsScreen,
    StarshipsDetails: StarshipsDetails,
  },
  {
    initialRouteName: 'PeopleScreen',
    headerMode: 'none',
  }
)

export default createAppContainer(StackNavigator)
