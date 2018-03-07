'use strict'

/**
 * adonis-graphql
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

const Config = use('Config')
const GraphError = require('./Errors')
const { graphqlAdonis, graphiqlAdonis } = require('apollo-server-adonis')
const { makeExecutableSchema } = require('graphql-tools')
const { fileLoader, mergeTypes, mergeResolvers } = require('merge-graphql-schemas')

const typeDefs = mergeTypes(
  fileLoader(Config.get('graphql.schema'))
)

const resolvers = mergeResolvers(
  fileLoader(Config.get('graphql.resolvers'))
)

const schema = makeExecutableSchema({ typeDefs, resolvers })

function handleError (error) {
  return {
    message: error.message,
    state: error.originalError && error.originalError.state,
    locations: error.locations,
    path: error.path,
  }
}

module.exports = {
  GraphError,
  graphql: (context, options = {}) => graphqlAdonis({ schema, context, formatError: handleError, ...options})(context)
}
