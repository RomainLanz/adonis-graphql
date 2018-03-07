'use strict'

const { GraphQLError } = require('graphql')

class GraphError extends GraphQLError {
  constructor (message, errors) {
    super(message)

    this.state = errors
  }
}

module.exports = GraphError
