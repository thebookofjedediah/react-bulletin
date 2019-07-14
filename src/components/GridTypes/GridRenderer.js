import React from 'react'
import GridView from './GridView'
import ListView from './ListView'
import PrintView from './PrintView'
import Query from 'react-apollo/Query'

const GridRenderer = ({ viewtype, posts, query, where }) => {
  const grid = viewtype === 'grid'

  return (
    <Query
      notifyOnNetworkStatusChange
      query={query}
      variables={{
        slug: where
      }}
    >
      {({ data, loading, error, fetchMore }) => {
        if (error) return <p>{error.message}</p>
        const posts = data.posts
        const loadFinished = false
        return (
          <>
            {viewtype === 'print' && (
              <PrintView
                loading={loading}
                posts={data.posts}
                loadDone={loadFinished}
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
                loadDone={loadFinished}
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
                loadDone={loadFinished}
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
  )
}

export default GridRenderer
