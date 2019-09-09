import Planet from './Planet'
import Film from './Film'

export default interface Person {
  gender: string
  birthYear: string
  name: string
  height: number
  skinColor: string
  id: string
  homeworld: Array<Planet>
  films: Array<Film>
}
