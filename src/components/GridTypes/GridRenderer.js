import React from 'react'
import GridView from './GridView'
import ListView from './ListView'
import PrintView from './PrintView'
import Query from 'react-apollo/Query'

const GridRenderer = ({ viewtype, query, posts, variables, searchposts }) => {
  const grid = viewtype === 'grid'

  return posts == null ? (
    <Query notifyOnNetworkStatusChange query={query} variables={variables}>
      {({ data, loading, error, fetchMore }) => {
        if (error) return <p>{error.message}</p>
        const posts = searchposts || data.posts

        const loadMore = () => {
          if (searchposts) return
          fetchMore({
            variables: {
              after: posts.pageInfo.endCursor
            },
            updateQuery: (prevResult, { fetchMoreResult }) => {
              const newEdges = fetchMoreResult.posts.edges
              const pageInfo = fetchMoreResult.posts.pageInfo

              return newEdges.length
                ? {
                  posts: {
                    __typename: prevResult.posts.__typename,
                    edges: [...prevResult.posts.edges, ...newEdges],
                    pageInfo
                  }
                }
                : prevResult
            }
          })
        }

        return (
          <>
            {viewtype === 'print' && (
              <PrintView
                loading={loading}
                posts={posts}
                loadDone={false}
                onLoadMore={loadMore}
              />
            )}
            {grid && (
              <GridView
                loading={loading}
                posts={posts}
                loadDone={false}
                onLoadMore={loadMore}
              />
            )}
            {!grid && viewtype !== 'print' && (
              <ListView
                loading={loading}
                posts={posts}
                loadDone={false}
                onLoadMore={loadMore}
              />
            )}
          </>
        )
      }}
    </Query>
  ) : (
    <div>
      {viewtype === 'print' && <PrintView posts={posts} loadDone />}
      {grid && <GridView posts={posts} loadDone />}
      {!grid && viewtype !== 'print' && <ListView posts={posts} loadDone />}
    </div>
  )
}

export default GridRenderer
