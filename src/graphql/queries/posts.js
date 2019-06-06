import gql from 'graphql-tag'
import { postFragment } from '../fragments'

export const getAllPosts = gql`
  query getAllPosts {
    posts {
      ...PostData
    }
  }
  ${postFragment}
`
export const getPostsByCat = gql`
  query getPostsByCat($slug: String!) {
    posts(where: { categoryName: $slug }) {
      ...PostData
    }
  }
  ${postFragment}
`

export const SinglePostDetail = gql`
  query SinglePostDetail($id: ID!) {
    post(id: $id) {
      id
      title
      date
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
`
