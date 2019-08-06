import React from 'react'
import GridRenderer from '../components/GridTypes/GridRenderer'

const CategoryView = ({ id, name, posts }) => {
  return (
    <div>
      <h2 className='viewTitle'>Posts in {name} Category</h2>
      <br />
      <GridRenderer posts={posts} />
      <br />
      <hr />
      <br />
    </div>
  )
}

export default CategoryView
