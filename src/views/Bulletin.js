import React from 'react'
import { getAllPosts } from '../graphql/queries/posts'
import dayjs from 'dayjs'
import Layout from '../components/Layout/index'
import GridRenderer from '../components/GridTypes/GridRenderer'
import { Helmet } from 'react-helmet'

const week = dayjs().startOf('week')

const Bulletin = ({ data, viewtype, searchposts }) => {
  return (
    <Layout>
      <RenderHome data={data} viewtype={viewtype} searchposts={searchposts} />
      <span />
    </Layout>
  )
}

const RenderHome = ({ data, viewtype, searchposts }) => {
  return (
    <>
      <Helmet>
        <title>Home | Bulletin - Franciscan University of Steubenville</title>
      </Helmet>
      <GridRenderer
        viewtype={viewtype}
        query={getAllPosts}
        variables={{
          where: {
            dateQuery: {
              after: {
                day: week.date(),
                month: week.month() + 1,
                year: week.year()
              }
            }
          }
        }}
      />
    </>
  )
}

export default Bulletin
