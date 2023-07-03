const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    id: Int!
}

type Auth {
    token: ID
    user: User
}

type Query {
    users: [Users]
    user: User
    profiles( user: ID, name: String): [Profile]
}

type Mutation {

}
`;

module.exports = typeDefs