import gql from 'graphql-tag'

export const postFragment = gql`
  fragment PostData on postsConnection {
    edges {
      node {
        id
        title
        date
        featuredImage {
          sourceUrl
        }
      }
    }
  }
`
