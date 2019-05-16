// Get posts from WordPress
export const fetchPosts = () =>
  fetch('http://bulletinlocaltest.local/wp-json/wp/v2/posts').then(data =>
    data.json()
  )
