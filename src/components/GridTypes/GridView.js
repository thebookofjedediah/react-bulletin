import React from 'react'
import Masonry from 'react-masonry-component'
import '../../styles/grid.css'
import PostPreview from '../PostPreview'

const GridView = ({ posts }) => (
  <div className='row'>
    <div className='container-fluid'>
      <Masonry>
        {posts.edges.map(post => (
          <div className='col s12 m12 l6 xl4' key={post.node.slug}>
            <PostPreview
              date={post.node.date}
              imageURL={
                post.node.featuredImage && post.node.featuredImage.sourceUrl
              }
              slug={post.node.slug}
              title={post.node.title}
              category={post.node.categories.edges[0].node.name}
              content={post.node.content}
              trim
            />
          </div>
        ))}
      </Masonry>
    </div>
  </div>
)

export default GridView
