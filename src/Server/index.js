'use strict'

/**
 * adonis-graphql
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

const { graphqlAdonis, graphiqlAdonis } = require('apollo-server-adonis')
const { makeExecutableSchema } = require('graphql-tools')
const { fileLoader, mergeTypes, mergeResolvers } = require('merge-graphql-schemas')

class GraphQLServer {
  constructor (config) {
    const typeDefs = mergeTypes(fileLoader(config.get('graphql.schema'), { recursive: true }))
    const resolvers = mergeResolvers(fileLoader(config.get('graphql.resolvers')))

    this.$schema = makeExecutableSchema({ typeDefs, resolvers })

    this.$options = config.get('graphql.options')
  }

  $handleError (error) {
    return {
      message: error.message,
      state: error.originalError && error.originalError.state,
      locations: error.locations,
      path: error.path,
    }
  }

  handle (context, options = {}) {
    Object.assign(this.$options, options)

    return graphqlAdonis({
      context,
      schema: this.$schema,
      formatError: this.$handleError,
      ...this.$options,
    })(context)
  }

  handleUI (context, options = {}) {
    Object.assign(this.$options, options)

    return graphiqlAdonis({
      ...this.$options,
    })(context)
  }
}

module.exports = GraphQLServer
