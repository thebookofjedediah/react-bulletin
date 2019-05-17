import gql from 'graphql-tag'

export const getAllPosts = gql`
  query getAllCategories {
    categories {
      edges {
        node {
          id
          slug
          title
        }
      }
    }
  }
`
