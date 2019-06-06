import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { SinglePostDetail } from '../graphql/queries/posts'
import Layout from '../components/Layout/index'
import Loader from '../components/Loader'
import { Helmet } from 'react-helmet'
import Typography from '@material-ui/core/Typography'

// import { Link } from 'react-router-dom'
// import '../styles/app.css'

class PostDetail extends Component {
  render () {
    const isLoading = this.props.data.loading
    return (
      <Layout>
        <Helmet>
          <title>Loading... - Franciscan University of Steubenville</title>
        </Helmet>
        {isLoading && <Loader />}
        {!isLoading && this.renderPost()}
      </Layout>
    )
  }
  renderPost = () => {
    const post = this.props.data.post
    const date = new Date(post.date).toLocaleDateString()
    return (
      <div>
        <Helmet>
          <title>{post.title} - Franciscan University of Steubenville</title>
        </Helmet>

        <Typography type='headline' variant='h4'>
          {post.title}
        </Typography>

        <Typography type='subheading' variant='h6'>
          {post.category}
        </Typography>

        <Typography type='subheading' variant='h6'>
          {date}
        </Typography>

        <img
          alt=''
          style={{ height: '600px', width: '800px' }}
          src={post.featuredImage && post.featuredImage.sourceUrl}
        />
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    )
  }
}

export default graphql(SinglePostDetail, {
  options: ({ match }) => ({ variables: { id: match.params.post_id } })
})(PostDetail)
