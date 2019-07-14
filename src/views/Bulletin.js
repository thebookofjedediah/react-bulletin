import React from 'react'
import { graphql } from 'react-apollo'
import { getAllPosts } from '../graphql/queries/posts'
import dayjs from 'dayjs'
import Layout from '../components/Layout/index'
import Loader from '../components/Loader'
import GridRenderer from '../components/GridTypes/GridRenderer'
import { Helmet } from 'react-helmet'
import Error from '../components/Error'

const Home = ({ data, viewtype, searchposts }) => {
  return (
    <Layout>
      <RenderHome data={data} viewtype={viewtype} searchposts={searchposts} />
      <span />
    </Layout>
  )
}

const RenderHome = ({ data, viewtype, searchposts }) => {
  const posts = searchposts || data.posts
  return (
    <>
      <Helmet>
        <title>Home | Bulletin - Franciscan University of Steubenville</title>
      </Helmet>
      {!data.error && !posts && <Loader />}
      {data.error && <Error error={data.error.message} />}
      {posts && (
        <GridRenderer posts={posts} viewtype={viewtype} query={getAllPosts} />
      )}
    </>
  )
}

const week = dayjs().startOf('week').day

export default graphql(getAllPosts, {
  options: {
    variables: {
      where: {
        dateQuery: {
          after: {
            day: week.day,
            month: week.month,
            year: week.year
          }
        }
      }
    }
  }
})(Home)
