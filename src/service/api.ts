import gql from 'graphql-tag'

export const ALL_PERSONS_QUERY = gql`
  query People($count: Int!, $lastID: String) {
    allPersons(first: $count, after: $lastID) {
      id
      name
      skinColor
      gender
      height
      birthYear
      homeworld {
        population
        terrain
        climate
        name
      }
      films {
        title
        episodeId
      }
    }
  }
`

export const ALL_STARSHIPS_QUERY = gql`
  query Starships($count: Int!, $lastID: String) {
    allStarships(first: $count, after: $lastID) {
      name
      manufacturer
      name
      crew
      cargoCapacity
      id
    }
  }
`
export const ALL_VEHICES_QUERY = gql`
  query Vehicles($count: Int!, $lastID: String) {
    allVehicles(first: $count, after: $lastID) {
      manufacturer
      name
      length
      maxAtmospheringSpeed
      crew
      passengers
      class
      id
    }
  }
`

const PERSON_BY_ID_QUERY = gql`
  query Person($id: ID!) {
    Person(id: $id) {
      id
      name
      birthYear
      films {
        id
        title
      }
    }
  }
`

const VEHICLE_BY_ID_QUERY = gql`
  query Vehicle($id: ID!) {
    Vehicle(id: $id) {
      manufacturer
      name
      length
      maxAtmospheringSpeed
      crew
      passengers
      class
      id
    }
  }
`

const STARSHIP_BY_ID_QUERY = gql`
  query Starship($id: ID!) {
    Starship(id: $id) {
      manufacturer
      name
      length
      maxAtmospheringSpeed
      crew
      passengers
      class
      id
    }
  }
`
