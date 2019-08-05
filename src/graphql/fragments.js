import gql from 'graphql-tag'

export const postFragment = gql`
  fragment PostData on RootQueryToPostConnection {
    pageInfo {
      startCursor
      endCursor
      hasNextPage
      hasPreviousPage
    }
    edges {
      node {
        id
        title
        date
        slug
        excerpt
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
    pageInfo {
      startCursor
      endCursor
      hasNextPage
      hasPreviousPage
    }
    edges {
      node {
        id
        name
        slug
      }
    }
  }
`
