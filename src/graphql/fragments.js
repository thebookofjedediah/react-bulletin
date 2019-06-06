import gql from 'graphql-tag'

export const postFragment = gql`
  fragment PostData on RootQueryToPostConnection {
    edges {
      node {
        id
        title
        date
        slug
        content
        categories {
          edges {
            node {
              id
              name
            }
          }
        }
        featuredImage {
          sourceUrl
        }
      }
    }
  }
`

export const categoriesFragment = gql`
  fragment CategoryData on RootQueryToCategoryConnection {
    edges {
      node {
        id
        name
        slug
      }
    }
  }
`
