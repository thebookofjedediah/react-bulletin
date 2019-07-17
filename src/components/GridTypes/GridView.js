import React from 'react'
import Masonry from 'react-masonry-component'
import Loader from '../Loader'
import '../../styles/grid.css'
import PostPreview from '../PostPreview'

class GridView extends React.Component {
  componentDidMount () {
    window.addEventListener('scroll', this.handleOnScroll)
    if (this.props.loadDone) this.setState({ loadingFinished: true })
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleOnScroll)
  }

  handleOnScroll = () => {
    // http://stackoverflow.com/questions/9439725/javascript-how-to-detect-if-browser-window-is-scrolled-to-bottom
    var scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop
    var scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight
    var clientHeight =
      document.documentElement.clientHeight || window.innerHeight
    var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight
    if (scrolledToBottom) {
      if (this.props.posts.pageInfo.hasNextPage) this.props.onLoadMore()
    }
  }

  render () {
    if (!this.props.posts && this.props.loading) return <Loader />
    return (
      <div className='row'>
        <div className='container-fluid'>
          <Masonry>
            {this.props.posts.edges.map(post => (
              <div className='col s12 m12 l6 xl4' key={post.node.slug}>
                <PostPreview
                  view='card'
                  date={post.node.date}
                  imageURL={
                    post.node.featuredImage && post.node.featuredImage.sourceUrl
                  }
                  slug={post.node.slug}
                  title={post.node.title}
                  category={post.node.categories.edges[0].node.name}
                  content={post.node.excerpt}
                  trim
                />
              </div>
            ))}
          </Masonry>
        </div>
        {this.props.loading && <Loader />}
      </div>
    )
  }
}

export default GridView
