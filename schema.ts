import * as path from 'path'
import * as † from './graphql'
import { makeSchema, nullabilityGuardPlugin } from 'nexus'

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
export const schema = makeSchema({
  types: †,
  outputs: {
    schema: path.join(__dirname, '../omdb-schema.graphql'),
    typegen: path.join(
      __dirname.replace(/\/dist$/, '/src'),
      './omdb-typegen.ts'
    )
  },
  plugins: [
    nullabilityGuardPlugin({
      shouldGuard: true,
      fallbackValues: {
        String: () => '',
        ID: () => 'MISSING_ID',
        Boolean: () => true
      }
    })
  ],
  typegenAutoConfig: {
    sources: [
      {
        source: path.join(
          __dirname.replace(/\/dist$/, '/src'),
          './types/backingTypes.ts'
        ),
        alias: 'omdb'
      }
    ],
    contextType: 'omdb.ContextType'
  },
  prettierConfig: path.join(__dirname, '../../../.prettierrc')
})
