import React from 'react'
import { getAllPosts } from '../graphql/queries/posts'
import dayjs from 'dayjs'
import Layout from '../components/Layout/index'
import GridRenderer from '../components/GridTypes/GridRenderer'
import { Helmet } from 'react-helmet'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

const week = dayjs().startOf('week')

const Bulletin = ({ data, viewtype, searchposts }) => {
  return (
    <Layout>
      <RenderHome data={data} viewtype={viewtype} searchposts={searchposts} />
      <span />
    </Layout>
  )
}

const RenderHome = props => {
  return (
    <div>
      <Helmet>
        <title>Home | Bulletin - Franciscan University of Steubenville</title>
      </Helmet>
      <GridRenderer
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
        {...props}
      />
      <Link to={`/all`} className='view-all-posts'>
        <Button variant='contained' className='view-all-button'>
          View All Posts
        </Button>
      </Link>
    </div>
  )
}

export default Bulletin
