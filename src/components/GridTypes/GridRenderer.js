import React from 'react'
import GridView from './GridView'
import ListView from './ListView'
import PrintView from './PrintView'
import Query from 'react-apollo/Query'

const GridRenderer = ({ viewtype, query, posts, variables }) => {
  const grid = viewtype === 'grid'

  return posts == null ? (
    <Query notifyOnNetworkStatusChange query={query} variables={variables}>
      {({ data, loading, error, fetchMore }) => {
        if (error) return <p>{error.message}</p>
        const posts = data.posts

        return (
          <>
            {viewtype === 'print' && (
              <PrintView
                loading={loading}
                posts={data.posts}
                loadDone={false}
                onLoadMore={() =>
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
              />
            )}
            {grid && (
              <GridView
                loading={loading}
                posts={data.posts}
                loadDone={false}
                onLoadMore={() =>
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
                          },
                          loadFinished: true
                        }
                        : prevResult
                    }
                  })
                }
              />
            )}
            {!grid && viewtype !== 'print' && (
              <ListView
                loading={loading}
                posts={data.posts}
                loadDone={false}
                onLoadMore={() =>
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
                          },
                          loadFinished: true
                        }
                        : prevResult
                    }
                  })
                }
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
