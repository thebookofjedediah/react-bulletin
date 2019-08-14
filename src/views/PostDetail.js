import React from 'react'
import { graphql } from 'react-apollo'
import { SinglePostDetail } from '../graphql/queries/posts'
import Layout from '../components/Layout/index'
import Loader from '../components/Loader'
import { Helmet } from 'react-helmet'
import Typography from '@material-ui/core/Typography'
import { blue, grey } from '@material-ui/core/colors'
import { withStyles } from '@material-ui/core/styles'
import BackIcon from '@material-ui/icons/ArrowBackIos'
import Button from '@material-ui/core/Button'
import { withRouter } from 'react-router-dom'
// import '../styles/app.css'

const styles = {
  card: {
    marginBottom: 15
  },
  titleColor: {
    color: blue[800]
  },
  dateColor: {
    color: grey[500]
  },
  categoryColor: {
    color: '#ffb41f'
  },
  media: {
    height: 250
  },
  link: {
    color: 'inherit',
    textDecoration: 'none'
  }
}

const PostDetail = ({ data, classes, ...props }) => {
  const isLoading = data.loading
  return (
    <Layout>
      <Helmet>
        <title>Loading... </title>
      </Helmet>
      {isLoading && <Loader />}
      {!isLoading && <RenderPost data={data} classes={classes} {...props} />}
    </Layout>
  )
}

const RenderPost = ({ data, classes, ...props }) => {
  const post = data.postBy
  const date = new Date(post.date).toLocaleDateString()
  return (
    <div>
      <Helmet>
        <title>{post.title}</title>
      </Helmet>
      {post.featuredImage && (
        <img
          alt=''
          style={{ height: '600px', width: '800px', objectFit: 'cover' }}
          src={post.featuredImage.sourceUrl}
        />
      )}
      <Typography type='caption' variant='h6' className={classes.categoryColor}>
        {post.categories.edges[0].node.name.toUpperCase()}
      </Typography>
      <Typography type='h5' className={classes.titleColor} variant='h4'>
        {post.title}
      </Typography>
      <Typography type='subheading' variant='subtitle1'>
        {date}
      </Typography>

      <Typography
        type='body2'
        component='div'
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <Button onClick={props.history.goBack}>
        <BackIcon />
        Go Back
      </Button>
    </div>
  )
}

export default withRouter(
  withStyles(styles)(
    graphql(SinglePostDetail, {
      options: ({ match }) => ({ variables: { slug: match.params.slug } })
    })(PostDetail)
  )
)
