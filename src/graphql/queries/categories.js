import gql from 'graphql-tag'
import { postFragment, categoriesFragment } from '../fragments'

export const getAllCategoriesandPosts = gql`
  query getAllPosts {
    categories {
      ...CategoryData
      edges {
        node {
          posts {
            ...PostData
          }
        }
      }
    }
  }
  ${postFragment}
  ${categoriesFragment}
`

export const getAllCategories = gql`
  query getAllCategories {
    categories {
      ...CategoryData
    }
  }
  ${categoriesFragment}
`
