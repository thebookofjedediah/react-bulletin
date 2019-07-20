import React from 'react'
import { getAllPosts } from '../graphql/queries/posts'
import Layout from '../components/Layout/index'
import GridRenderer from '../components/GridTypes/GridRenderer'
import { Helmet } from 'react-helmet'

const Home = ({ data, viewtype, searchposts }) => {
  return (
    <Layout>
      <RenderHome data={data} viewtype={viewtype} searchposts={searchposts} />
      <span />
    </Layout>
  )
}

const RenderHome = ({ ...props }) => {
  return (
    <>
      <Helmet>
        <title>Home | Bulletin - Franciscan University of Steubenville</title>
      </Helmet>
      <GridRenderer
        variables={{
          first: 15
        }}
        query={getAllPosts}
        {...props}
      />
    </>
  )
}

export default Home
