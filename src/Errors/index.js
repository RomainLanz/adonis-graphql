'use strict'

/**
 * adonis-graphql
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

const { GraphQLError } = require('graphql')

class GraphError extends GraphQLError {
  constructor (message, errors) {
    super(message)

    this.state = errors
  }
}

module.exports = GraphError
