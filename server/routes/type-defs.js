const apollo = require("apollo-server-express");
const typeDefs = apollo.gql`
  type Car {
    car_id: Float!
    name: String!
    brand: String!
    year_release: Float!
  }
  type Query {
    cars: [Car!]!,
    car(id: ID!): Car!
  }

  input CarEdit {
    car_id: Float
    name: String!
    brand: String!
    year_release: Float!
  }

  type Mutation {
    addCar(carEdit: CarEdit!): Boolean
    modifyCar(carEdit: CarEdit!): Boolean

  }
`;

module.exports = typeDefs;
