# Adonis GraphQL :rocket:

Adonis GraphQL is a wrapper around [apollo-server-adonis](https://github.com/apollographql/apollo-server/tree/master/packages/apollo-server-adonis) to provide a better experience writing Schema and Resolvers.

## Setup

The package must be installed by using `adonis` command.

```bash
> adonis install adonis-graphql
```

You can use directly `npm` or `yarn` but the instructions (`instructions.js` and `instructions.md`) will not be displayed and ran.

> :warning: This package requires `@adonisjs/bodyparser` to be installed.

## Bind GraphQL Endpoint

You can bind the GraphQL endpoint directly from your `routes.js` file.

In this example, we are using the `/` route to handle all graphql query.

```js
const Route = use('Route')
const GraphQLServer = use('GraphQLServer')

Route.post('/', (context) => {
  return GraphQLServer.handle(context)
})

Route.get('/graphiql', (context) => {
  return GraphQLServer.handleUI(context)
})

// or add options (example)
Route.get("/graphiql", (context) => {
  return GraphQLServer.handleUI(context, {
    passHeader: `'Authorization': '${context.request.header("Authorization")}'`
  })
})

// or change options in file `config/graphql.js`

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

GraphQL handles errors by a different way.
To provide a GraphQL Compliant error we recommend you to use the `GraphQLError` class.

```js
// app/Resolvers/Hello.js

const GraphQLError = use('GraphQLError')

module.exports = {
  Query: {
    hello: function () {
      throw new GraphQLError('Error Message', [...])
    }
  }
}
```

If you are using the Adonis Validation Provider your code must look like the example bellow.

```js
const validation = await validateAll(data, rules)

if (validation.fails()) {
  throw new GraphQLError('Validation Failed', validation.messages())
}
```
