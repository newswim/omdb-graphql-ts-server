// https://github.com/prisma-labs/nexus/blob/develop/examples/star-wars/src/index.ts

import { ApolloServer } from 'apollo-server'
import { schema } from './schema'

const server = new ApolloServer({
  schema
})

const port = process.env.PORT || 4000

server.listen({ port }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  )
)
