import gql from 'graphql-tag'

export const postFragment = gql`
  fragment PostData on RootQueryToPostConnection {
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

export const postToCategory = gql`
  fragment PostData on CategoryToPostConnection {
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
