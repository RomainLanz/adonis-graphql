'use strict'

/**
 * adonis-graphql
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

const { ServiceProvider } = require('@adonisjs/fold')
const GraphQLError = require('../src/Errors')
const GraphQLServer = require('../src/Server')

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
   * Registers providers for all the GraphQL related
   * classes.
   *
   * @return {void}
   */
  $registerAlias () {
    this.app.singleton('Adonis/Addons/GraphQLServer', () => {
      const Config = use('Config')

      return new GraphQLServer(Config)
    })

    this.app.singleton('Adonis/Addons/GraphQLError', () => GraphQLError)

    this.app.alias('Adonis/Addons/GraphQLServer', 'GraphQLServer')
    this.app.alias('Adonis/Addons/GraphQLError', 'GraphQLError')
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

    this.$registerAlias()
  }
}

module.exports = GraphQLProvider
