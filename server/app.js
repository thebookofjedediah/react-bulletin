// const express = require('express')
// // const { ApolloServer, gql } = require("apollo-server-express");
// const {
//   introspectSchema,
//   makeRemoteExecutableSchema
// } = require('graphql-tools')
// const fetch = require('node-fetch')
// const cors = require('cors') // Cors origin policy
//
// const fetcher = async ({ query, variables, operationName, context }) => {
//   const fetchResult = await fetch('http://bulletinlocaltest.local/graphql', {
//     method: 'POST',
//     headers: {
//       // 'Content-Type': 'application/json'
//       /* MAKE AUTHORIZATION SOMEHOW for the wordpress */
//       /* GO WITH JWT OR OAUTH 2.0. OAUTH 2.0 Recommended */
//       //  'Authentication': `Bearer ${context.authKey}`,
//     },
//     body: JSON.stringify({ query, variables, operationName })
//   })
//   return fetchResult.json()
// }
//
// const PORT = process.env.PORT || 8080
//
// const app = express()
//
// /*
// FOR AUTHENTICATION I WILL GO FOR THIS APPROACHs
// app.use('*', ssoAuthenticationMiddleware)
// */
//
// const whitelist = [
//   // Allow domains here
//   // Remember to add your react site at last
//   // Cors will also protect the api
//   'http://localhost:3000'
// ]
// const corsOptions = {
//   origin (origin, callback) {
//     const originIsWhitelisted = whitelist.indexOf(origin) !== -1
//     callback(null, originIsWhitelisted)
//   },
//   credentials: true
// }
// app.use(cors(corsOptions))
//
// // Graphiql GUI for API Testing...
// // app.use(
// //   "/graphiql",
// //   graphiqlExpress({
// //     endpointURL: "/graphql"
// //   })
// // );
//
// // Making WP API Available by using remote gql server strategy
// introspectSchema(fetcher)
//   .then(schema => {
//     // const gqlschema = makeRemoteExecutableSchema({
//     //   schema,
//     //   fetcher
//     // });
//     // app.use(
//     //   "/graphql",
//     //   bodyParser.json(),
//     //   graphqlExpress({ schema: gqlschema })
//     // );
//     app.listen(PORT, () => console.log(`Server Started on PORT -> ${PORT}`))
//   })
//   .catch(err => {
//     console.log(`Connection Error -> ${err}`)
//   })
