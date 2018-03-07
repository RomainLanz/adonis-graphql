# Adonis GraphQL :rocket:

Adonis GraphQL is a wrapper around [apollo-server-adonis](https://github.com/apollographql/apollo-server/tree/master/packages/apollo-server-adonis) to provide a better experience writing Schema and Resolvers.

## Setup

The package must be installed from npm using `adonis` command.

```bash
> adonis install adonis-graphql
```

> :warning: This package requires `@adonisjs/bodyparser`.

## Bind GraphQL Endpoint

You can bind the GraphQL endpoint directly from your `routes.js` file.

```js
const Route = use('Route')
const GraphQLServer = use('Adonis/Addons/GraphQLServer')

Route.post('/', function (context) {
  return GraphQLServer.handle(context)
})
```

## Create Schema

All schema are defined by default in the `app/Schema` directory. You can change this by editing the configuration `config/graphql.js`.
To define a schema, you must use the `graphql` extension and syntax.

```graphql
# app/Schema/Hello.graphql
type Query {
  hello: String
}
```

## Create Resolver

All schema are defined by default in the `app/Resolvers` directory. You can change this by editing the configuration `config/graphql.js`.
To define a resolver, you must return a JS Object.

```js
// app/Resolvers/Hello.js
module.exports = {
  Query: {
    hello: () => 'World'
  }
}
```

## Throw an error

GraphQL handles differently errors. To provide a GraphQL Compliant error we recommend you to use the `GraphQLError` class.

```js
// app/Resolvers/Hello.js

const GraphQLError = use('Adonis/Addons/GraphQLError')

module.exports = {
  Query: {
    hello: function () {
      throw new GraphQLError('message', [...])
    }
  }
}
```

If you are using the Adonis Validation Provider your code must look like the example bellow.

```js
const validation = await validateAll(data, rules)

if (validation.fails()) {
  throw new GraphError('Validation Failed', validation.messages())
}
```
