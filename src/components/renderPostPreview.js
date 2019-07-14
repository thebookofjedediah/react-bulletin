import React from 'react'
import PostPreview from '../components/PostPreview'

const PostRenderer = ({ posts }) => {
  return (
    <>
      {posts.edges.map(post => (
        <PostPreview
          key={post.node.id}
          id={post.node.id}
          date={post.node.date}
          imageURL={
            post.node.featuredImage && post.node.featuredImage.sourceUrl
          }
          title={post.node.title}
        />
      ))}
    </>
  )
}

export default PostRenderer
