'use strict'

/**
 * adonis-graphql
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

const { join } = require('path')

module.exports = async function (cli) {
  await cli.makeConfig('graphql.js', join(__dirname, './config/graphql.js'))
    .catch((e) => {})
  cli.command.completed('create', 'config/graphql.js')
}
