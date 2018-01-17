'use strict'

/**
 * adonis-graphql
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

const { ServiceProvider } = require('@adonisjs/fold')

class GraphQLProvider extends ServiceProvider {
  /**
   * Registers providers for all the GraphQL related
   * commands.
   *
   * @return {void}
   */
  $registerCommands () {
    this.app.bind('GraphQL/Commands/Make:Schema', () => require('../commands/MakeSchema'))
    this.app.bind('GraphQL/Commands/Make:Resolvers', () => require('../commands/MakeResolvers'))

  }

  /**
   * Register all the required providers.
   *
   * @return {void}
   */
  register () {
    this.$registerCommands()
  }

  /**
   * On boot add commands with ace.
   *
   * @return {void}
   */
  boot () {
    const ace = require('@adonisjs/ace')
    ace.addCommand('GraphQL/Commands/Make:Schema')
    ace.addCommand('GraphQL/Commands/Make:Resolvers')
  }
}

module.exports = GraphQLProvider
