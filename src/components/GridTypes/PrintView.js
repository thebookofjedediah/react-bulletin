import React from 'react'
import Grid from '@material-ui/core/Grid'
import PostPreview from '../PostPreview'

const ListView = ({ posts }) => (
  <Grid container justify='center'>
    <Grid item xs={12}>
      <h1>This Week{"'"}s Bulletin</h1>
      {posts &&
        posts.edges.map(post => (
          <PostPreview
            view='print'
            key={post.node.id}
            title={post.node.title}
            content={post.node.content}
          />
        ))}
    </Grid>
  </Grid>
)

export default ListView
