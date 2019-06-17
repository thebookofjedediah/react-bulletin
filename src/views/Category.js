import React from 'react'
import { graphql } from 'react-apollo'
import { getPostsByCat, getAllPosts } from '../graphql/queries/posts'
import Loader from '../components/Loader'
import Layout from '../components/Layout/index'
import { Helmet } from 'react-helmet'

import GridRenderer from '../components/GridTypes/GridRenderer'
import Error from '../components/Error'

const Category = ({ data, viewtype, searchposts }) =>
  RenderLayout(data, searchposts, viewtype)
const AllPosts = ({ data, viewtype, searchposts }) =>
  RenderLayout(data, searchposts, viewtype)

const RenderLayout = (data, viewtype) => {
  const isLoading = !data.posts
  return (
    <Layout>
      {!data.error && isLoading && <Loader />}
      {data.error && <Error error={data.error.message} />}
      {!isLoading && data.posts.edges.length === 0 && <CategoryError />}
      {!isLoading && data.posts.edges.length > 0 && (
        <RenderCategories data={data} viewtype={viewtype} />
      )}
    </Layout>
  )
}

const CategoryError = () => {
  return (
    <div>
      <Helmet>
        <title>
          Category Doesn{"'"}t Exist | Bulletin - Franciscan University of
          Steubenville
        </title>
      </Helmet>
      <div>The category you are searching for does not exist</div>
    </div>
  )
}

const RenderCategories = ({ data, searchposts, viewtype }) => {
  const posts = searchposts || data.posts
  return (
    <div>
      <Helmet>
        <title>
          Posts By Categories | Bulletin - Franciscan University of Steubenville
        </title>
      </Helmet>
      <GridRenderer posts={posts} viewtype={viewtype} />
    </div>
  )
}

export default graphql(getPostsByCat, {
  options: ({ match }) => ({ variables: { slug: match.params.slug } })
})(Category)

export const allPosts = graphql(getAllPosts)(AllPosts)
