import React from 'react'
import Typography from '@material-ui/core/Typography'
import { getPostsByCat } from '../graphql/queries/posts'
import Layout from '../components/Layout/index'
import capitalize from 'lodash.capitalize'
import lowercase from 'lodash.lowercase'
import GridRenderer from '../components/GridTypes/GridRenderer'
import { Helmet } from 'react-helmet'

const Home = ({ data, viewtype, searchposts, ...props }) => {
  return (
    <Layout>
      <RenderHome
        data={data}
        viewtype={viewtype}
        searchposts={searchposts}
        {...props}
      />
      <span />
    </Layout>
  )
}

const RenderHome = ({ ...props }) => {
  return (
    <>
      <Helmet>
        <title>
          Posts By Categories | Bulletin - Franciscan University of Steubenville
        </title>
      </Helmet>
      <Typography variant='h6' gutterBottom>
        {capitalize(lowercase(props.match.params.slug))}
      </Typography>
      <GridRenderer
        variables={{
          slug: props.match.params.slug
        }}
        query={getPostsByCat}
        {...props}
      />
    </>
  )
}

export default Home
