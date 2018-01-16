'use strict'

const { join } = require('path')

module.exports = {

  schema: join(__dirname, '../app/Schema'),

  resolvers: join(__dirname, '../app/Resolvers')
}
